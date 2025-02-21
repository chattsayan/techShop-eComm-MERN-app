import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "../index.css";

const Rating = ({ value = 0, text = "" }) => {
  return (
    <div className="rating flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {value >= star ? (
            <FaStar />
          ) : value >= star - 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
      {text && <span className="ml-2 rating-text">{text}</span>}
    </div>
  );
};

export default Rating;
