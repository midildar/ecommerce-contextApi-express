const jwt = require('jsonwebtoken')

const auth = (req, res, next) =>{
    try {
        const token = req.header('Authorization')
        if (!token) return res.status(400).json({msg : "Kindly Login or try again !"})
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, (err,token) =>{
            if (err) return res.status(400).json({msg : "Invalid authentication"})
            //console.log(token)
            req.token = token
            next()
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = auth