import { Link, useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import Rating from "../components/Rating";
// import axios from "axios";
// import { BASE_URL } from "../utils/constant";
// import { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

const ProductScreen = () => {
  // const [product, setProduct] = useState({});
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  // const product = products.find((item) => item._id === productId);
  // console.log(product);

  // const fetchProduct = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/api/products/${productId}`);
  //     setProduct(res?.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchProduct();
  // }, [productId]);

  return (
    <>
      <Link to="/">
        <button className="flex items-center gap-1 border border-slate-100 pr-2 py-2 rounded bg-slate-100 hover:bg-slate-200">
          <IoChevronBackOutline size={20} /> <span>Back</span>
        </button>
      </Link>

      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 pt-5">
          {/* Product Image */}
          <div className="md:col-span-1">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto shadow-md rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="md:col-span-1 bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
            <hr />
            <p className="text-lg my-4">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </p>
            <hr />
            <p className="text-xl font-bold text-gray-800 my-4">
              Price: ₹{product.price}
            </p>
            <hr />
            <p className="text-gray-500 mt-4">
              Description: {product.description}
            </p>
          </div>

          {/* Purchase Box */}
          <div className="md:col-span-1 bg-white p-4 shadow-md rounded-lg">
            <div className="border-b pb-2 mb-2 flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="text-lg font-semibold">₹{product.price}</span>
            </div>
            <div className="border-b pb-2 mb-2 flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span
                className={`font-semibold ${
                  product.countInStock > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
              </span>
            </div>
            <button
              className={`w-full py-2 mt-3 text-white font-semibold rounded-md ${
                product.countInStock > 0
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={product.countInStock === 0}
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
