import {useState,useEffect} from 'react'
import axios from 'axios'
const ProductApi = () => {
  const [products, setProducts] = useState([])
  
  const getProduct = async() =>{
    const res = await axios.get("http://localhost:5000/api/product") 
    setProducts((event)=>event=res.data.products)
  }

  useEffect(()=>{
    getProduct()
  },[])
    return {
        product:[products,setProducts]
    }
}

export default ProductApi