const product = require('../models/product')
const Product = require('../models/product')

class apiFeatures{
    constructor(query,queryString){
        this.query = query
        this.queryString = queryString
    }
    filtering(){
        const queryObj = {...this.queryString}
        const excludeFields = ["page","sort", "limit"]
        excludeFields.forEach(el => delete(queryObj[el]))
        let queryStr = JSON.stringify(queryObj)
        queryStr= queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match => '$' + match)
        console.log({queryObj,queryStr}) 
        this.query.find(JSON.parse(queryStr))
        return this
    }
    sorting(){
        if (this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}
const productControl = {
    getProduct : async (req,res)=>{
        try {
            const feature = new apiFeatures(Product.find(),req.query).filtering().sorting().paginating()
            const products = await feature.query
            res.json({
                status : 'success',
                result : products.length,
                products : products
            })
        } catch (err) {
            return res.status(500).json({msg : err.message})            
        }
    },
    createProduct : async (req,res)=>{
        try {
            const {product_id,title,price,description,content,image,category} = req.body
            if (!image) return res.status(400).json({msg: "no image uploaded."})
            const product = await Product.findOne({product_id})
            if (product) return res.status(400).json({msg: "Product already exists !"})
            const newProduct = new Product({
                product_id,title: title.toLowerCase(),price,description,content,image,category
            })
            await newProduct.save()
            res.json({msg : "Product Created Successfully"})
        } catch (err) {
            return res.status(500).json({msg : err.message})            
        }
    },
    updateProduct : async (req,res)=>{
        try {
            const {title,price,description,content,image,category} = req.body
            if (!image) return res.status(400).json({msg: "no image uploaded."})
            await Product.findByIdAndUpdate({_id : req.params.id},{
                title: title.toLowerCase(),price,description,content,image,category})
                res.json({msg : "product updated successfully !"})
        } catch (err) {
            return res.status(500).json({msg : err.message})            
        }
    },
    deleteProduct : async (req,res)=>{
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.json({msg : "Product deleted successfully !"})
        } catch (err) {
            return res.status(500).json({msg : err.message})            
        }
    }
}


module.exports = productControl