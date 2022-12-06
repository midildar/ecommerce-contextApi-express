const cloudinary = require('cloudinary')
const { json } = require('express')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

uploadControl = {
    uploadImage: async (req, res) => {
        try {
            //console.log(req.files)
            if (!req.files || Object.keys(req.files) === 0) return res.status(400).json({ msg: "file not found,not uploaded" })
            const file = req.files.file
            if (file.size > 1024 * 1024) {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "file too large ,not uploaded" })
            }
            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "file format not Supported" })
            }

            await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "E-commerce" }, async (err, result) => {
                if (err) throw err;
                removeTmp(file.tempFilePath)
                res.json({ public_id: result.public_id, url: result.secure_url })
                //res.json('testing upload')
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteImage: async (req,res) => {
        try {
            const {public_id} = req.body
            if (!public_id) return res.status(400).json({msg : "No Image Selected"})
            await cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                if (err) throw err;
                res.json({ msg : "Image deleted" })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}

module.exports = uploadControl