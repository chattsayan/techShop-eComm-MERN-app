import { Link, useNavigate, useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import Rating from "../components/Rating";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
// import Meta from "../components/Meta";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((store) => store.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };

  return (
    <div className="pt-4">
      <Link to="/">
        <button className="flex items-center gap-1 border border-slate-100 pr-2 py-2 rounded bg-slate-100 hover:bg-slate-200">
          <IoChevronBackOutline size={20} /> <span>Back</span>
        </button>
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* <Meta title={product.name} /> */}
          <div className="grid md:grid-cols-3 gap-6 pt-5">
            {/* Product Image */}
            <div className="md:col-span-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto shadow-md rounded-lg"
                loading="lazy"
              />
            </div>

            {/* Product Info */}
            <div className="md:col-span-1 bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
              <hr />
              <div className="text-lg my-4">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>
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

              <div className="flex items-center justify-between gap-5">
                {/* Quantity */}
                {product.countInStock > 0 && (
                  <div className="w-1/3 px-2 mt-3 border rounded-lg">
                    <div className="flex items-center justify-evenly">
                      <span className="font-medium">Qty</span>
                      <select
                        className="p-2"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Add To Cart Button */}
                <button
                  onClick={addToCartHandler}
                  className={`py-2 mt-3 text-white font-semibold rounded-md ${
                    product.countInStock > 0
                      ? "w-2/3 bg-blue-600 hover:bg-blue-700"
                      : "w-full bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <div>
                <h2 className="text-2xl font-semibold mb-4 border py-1 px-2 border-indigo-400 bg-indigo-200 rounded-md text-slate-800">
                  Reviews
                </h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}

                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border p-4 rounded-md shadow-sm"
                    >
                      <strong className="block text-lg">{review.name}</strong>
                      <Rating value={review.rating} />
                      <p className="text-sm text-gray-500">
                        {review.createdAt.substring(0, 10)}
                      </p>
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                  {/* <hr /> */}

                  <div className="border p-4 rounded-md shadow-sm">
                    <h2 className="text-xl font-semibold mb-2  border py-1 px-2 border-indigo-400 bg-indigo-200 rounded-md text-slate-800">
                      Write a Customer Review
                    </h2>

                    {loadingProductReview && <Loader />}

                    {userInfo ? (
                      <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Rating
                          </label>
                          <select
                            required
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Comment
                          </label>
                          <textarea
                            required
                            rows="3"
                            value={comment}
                            placeholder="Write about..."
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          disabled={loadingProductReview}
                          className={`px-4 py-2 rounded-md text-white font-semibold ${
                            loadingProductReview
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                        >
                          Submit
                        </button>
                      </form>
                    ) : (
                      <Message>
                        Please{" "}
                        <Link to="/login" className="text-blue-500 underline">
                          Sign In
                        </Link>{" "}
                        to write a review.
                      </Message>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
