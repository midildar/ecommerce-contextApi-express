import React from "react";
import { useState,useEffect,useContext } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { NavLink, useParams } from "react-router-dom";
import { Context } from "../../../Context";
import RelatedItems from "./RelatedItems";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
const ViewProduct = () => {
    const params = useParams()
    const state = useContext(Context)
    const [products]= state.ProductApi.product
    const [productDetail, setproductDetail] = useState([])

    useEffect(() => {
      if (params.id) {
        products.forEach(element => {
            if (element._id === params.id) setproductDetail(element)
        });
      }
    }, [params.id,products])
    
    if (productDetail.length === 0) return null

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {productDetail.title}
            </h1>
            <p>{productDetail.id}</p>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                {productDetail.price}
              </p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{productDetail.description}</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
            <img
              src={productDetail.image.url}
              alt={productDetail.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            
              <div className="sm:flex sm:justify-between">
                SOLD : {productDetail.sold}
              </div>
              
              <div className="mt-10">
                <NavLink to="/cart">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Add to bag
                </button>
                </NavLink>
              </div>
              <div className="mt-6 text-center">
                <a href="/" className="group inline-flex text-base font-medium">
                  <ShieldCheckIcon
                    className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 hover:text-gray-700">
                    Lifetime Guarantee
                  </span>
                </a>
              </div>
            
          </section>
        </div>
      </div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Related Products</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {
            products.map((product)=>{
                return product.category === productDetail.category 
                    ? <RelatedItems key = {product._id} product={product}/> : null
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
