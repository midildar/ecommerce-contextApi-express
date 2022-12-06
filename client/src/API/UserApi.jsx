import axios from 'axios'
import {useState,useEffect} from 'react'


const UserApi = (token) => {
    const [isLogged, setisLogged] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)
    const [cart,setCart] = useState([])
    useEffect(() => {
      if(token){
        const getUser = async ()=>{
            try {
                const res = await axios.get("http://localhost:5000/user/infor",{
                    headers : {Authorization: token}}
                )
                setisLogged(true)
                res.data.role === 1 ? setisAdmin(true) : setisAdmin(false)
            console.log(res)
            } catch (err) {
                alert(err.response.data.msg)
            }
        }
        getUser()
      }
      
    }, [token])

    const addCart = async (product) => {
        if (!isLogged) return alert("Please Login To Continue Buying !")

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if(check){
            setCart([...cart,{...product,quantity :1}])

            await axios.patch("http://localhost:5000/user/addcart",{cart:[...cart,{...product,quantity :1}]},{
                headers : {Authorization: token}
            })
        }else{
            alert("Product has already added to the cart")
        }
 
    }

    return {
        isLogged :  [isLogged, setisLogged],
        isAdmin: [isAdmin, setisAdmin],
        cart: [cart,setCart],
        addCart:addCart
    }
}

export default UserApi