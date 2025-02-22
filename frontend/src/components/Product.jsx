import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  const { _id, image, name, rating, numReviews, price } = product;

  return (
    <div className="">
      <Link to={`/product/${_id}`}>
        <img className="object-cover w-full h-full" src={image} alt="" />
      </Link>

      <div className="py-5">
        <Link
          to={`/product/${_id}`}
          className="block font-semibold text-lg text-gray-800 hover:text-gray-600"
        >
          {name}
        </Link>
      </div>

      <div>
        <Rating value={rating} text={`${numReviews} reviews`} />
      </div>

      <h3 className="mt-3 font-bold text-xl text-green-600">₹ {price}</h3>
    </div>
  );
};

export default Product;
