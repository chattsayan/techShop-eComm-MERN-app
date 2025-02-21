import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="">
      <Link to={`/product/${product._id}`}>
        <img
          className="object-cover w-full h-full"
          src={product.image}
          alt=""
        />
      </Link>

      <div className="py-5">
        <Link
          to={`/product/${product._id}`}
          className="block font-semibold text-lg text-gray-800 hover:text-gray-600"
        >
          {product.name}
        </Link>
      </div>

      <div>
        <Rating
          value={product?.rating}
          text={`${product?.numReviews} reviews`}
        />
      </div>

      <h3 className="mt-3 font-bold text-xl text-green-600">
        ₹ {product.price}
      </h3>
    </div>
  );
};

export default Product;
