import React from 'react'
import { NavLink } from 'react-router-dom'

const RelatedItems = ({product}) => {
  return (
    <div key={product.id}>
              <div className="relative">
              <NavLink to={`/detail/${product._id}`}>
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                
                  <img
                    src={product.image.url}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                  
                </div>
                
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                </div>
                </NavLink>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">{product.price}</p>
                </div>
              </div>
              <NavLink to="/cart">
              <div className="mt-6">
                <p
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Add to bag<span className="sr-only">, {product.title}</span>
                </p>
              </div>
              </NavLink>
            </div>
  )
}

export default RelatedItems