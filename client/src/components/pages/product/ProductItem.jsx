import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { Context } from "../../../Context";


const ProductItem = ({product,isAdmin}) => {
  const state = useContext(Context);
  const addCart = state.UserApi.addCart
  return (
    <div
              key={product._id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              {
                isAdmin && <input type="checkbox" className="h-4 w-4 rounded absolute border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={product.checked}/>
              }
              {isAdmin ? <NavLink to={`edit_product/${product._id}`}> 
              <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                <img
                  src={product.image.url}
                  alt={product.title}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              </NavLink>:
              <NavLink to={`detail/${product._id}`}> 
              <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                <img
                  src={product.image.url}
                  alt={product.title}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              </NavLink>}
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <p>
                    {product.title}
                  </p>
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex flex-1 flex-row justify-between">
                {isAdmin ? <NavLink to ="#!">
                <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-8 py-2 text-base font-medium leading-4 text-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Delete
                  </button>
                  </NavLink>:
                  <NavLink to ="#!">
                  <button
                        type="button" onClick={()=>addCart(product)}
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-8 py-2 text-base font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Buy
                    </button>
                    </NavLink>}
                  <p className="text-base font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            </div>
  )
}

export default ProductItem