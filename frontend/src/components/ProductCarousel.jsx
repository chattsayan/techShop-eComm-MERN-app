import { Link } from "react-router-dom";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import { useEffect, useState } from "react";

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 4000); // Auto-slide every 4 seconds
    return () => clearInterval(interval);
  }, [products]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="md:mx-auto lg:w-[75%] overflow-hidden relative drop-shadow-lg py-11">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-blue-200 rounded-lg flex flex-col md:flex-row w-full flex-shrink-0 items-center"
          >
            <Link to={`/product/${product._id}`}>
              {/* Left - Fixed Image */}
              <div className="md:flex md:items-center w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  //   className="rounded-l-lg"
                  className="h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                />

                {/* Right - Description */}
                <div className="mx-6">
                  <h2 className="text-3xl lg:text-5xl lg:mb-5 font-bold mb-2 text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-lg lg:text-2xl text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
