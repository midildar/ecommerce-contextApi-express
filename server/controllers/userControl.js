const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const userControl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const user = await User.findOne({ email })
            if (user) return res.status(400).json({ msg: 'Email already Exists.' })
            if (password.length < 6) return res.status(400).json({ msg: 'Password should be atleast 6 characters long' })
            const SALT = await bcrypt.genSalt(Number(process.env.SALT))
            const passwordHash = await bcrypt.hash(password, SALT)
            const newUser = new User({
                name, email, password: passwordHash
            })
            const accessToken = createAccessToken(newUser._id )
            const refreshToken = createRefreshToken(newUser._id )
            res.cookie('refreshtoken', refreshToken, {
                httponly: true,
                path: "/user/refresh_token"
            })
            console.log(accessToken)
            console.log(refreshToken)
            await newUser.save()
            res.json({ accessToken })
            //res.json({ msg: "Registration successfull" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            console.log(req.cookies)
            const rfToken = req.cookies.refreshtoken
            //const rfToken = req.cookies.XSRF-TOKEN
            console.log(rfToken)
            if (!rfToken) return res.status(400).json({ msg: "please Login or Register !" })
            jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "please Login or Register !" })
                console.log(user)
                const accessToken = createAccessToken(user.id)
                console.log(accessToken)
                res.json({ accessToken })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

        // console.log(rfToken)
        // res.json({rfToken})
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User not Found !" })
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Either Password or Email is Incorrect !" })

            const accessToken = createAccessToken(user._id )
            const refreshToken = createRefreshToken(user._id )
            console.log(refreshToken)
            res.cookie('refreshtoken', refreshToken, {
                httponly: true,
                path: "/user/refresh_token"
            })
            res.json({ accessToken })
            //res.json({msg: "Login Successfull"})

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: "/user/refresh_token" })
            return res.json({ msg: "loggedout successfully !" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser : async (req,res) =>{
        try {
            //if( !mongoose.Types.ObjectId.isValid(req.user.id._id) ) return console.log("lolli")
            //console.log(req.token,"getuseroutput")
            const user = await User.findById(req.token.id).select('-password')
            if (!user) return res.status(400).json({msg: "User doesnot Exist"})
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addCart : async (req,res) =>{
        try {
            const user = await User.findById(req.token.id)
            if (!user) return res.status(400).json({msg: "User doesnot Exist"})

            await User.findOneAndUpdate({_id: req.token.id},{cart: req.token.cart})
            
            return res.json({msg: "Added to cart Successfully"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const createAccessToken = (id) => {
    return jwt.sign( {id} , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
const createRefreshToken = (id) => {
    return jwt.sign( {id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userControl