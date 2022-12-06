import React, { useContext } from "react";
import { Context } from "../../../Context";
import ProductItem from "./ProductItem";
const Product = () => {
  const state = useContext(Context);
  const [products] = state.ProductApi.product;
  const [isAdmin] = state.UserApi.isAdmin
  console.log(products);
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {products.map((product) => {
              return <ProductItem key={product._id} product={product} isAdmin={isAdmin}/>;
            })}
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Product;
