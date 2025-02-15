import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { BsFillTrash3Fill } from "react-icons/bs";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold p-5 text-center">Shopping Cart</h1>
      <div className="flex flex-col md:flex-row gap-6 p-5">
        {/* Left Side - Cart Items */}
        <div className="md:w-2/3">
          {cartItems.length === 0 ? (
            <Message>
              {/* Your cart is empty.
              <Link to="/" className="text-blue-500 ml-2 font-bold">
                Go Back
              </Link> */}
              <div className="flex flex-col items-center">
                <img
                  src="/images/cart.png"
                  alt="Empty Cart"
                  className="w-40 h-40 opacity-70"
                />
                <p className="mt-2 text-lg text-gray-700">
                  Your cart is empty.
                </p>
                <Link
                  to="/"
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Continue Shopping
                </Link>
              </div>
            </Message>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center p-4 border rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-16 md:w-[112px] md:h-[90px] object-cover rounded"
                  />

                  <div className="flex-1 ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-base md:text-lg font-semibold"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 text-sm md:text-base font-medium">
                      ₹ {item.price}
                    </p>
                  </div>

                  <select
                    className="border p-1 rounded cursor-pointer"
                    value={item.quantity}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    className="ml-4 text-gray-800 bg-slate-200 hover:bg-red-600 hover:text-white p-2 rounded-md transition"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Summary */}
        <div className="md:w-1/3 p-4 border rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">
            Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            items
          </h2>
          <p className="text-2xl font-semibold text-green-600 mt-2">
            ₹
            {cartItems
              .reduce((acc, item) => acc + item.quantity * item.price, 0)
              .toFixed(2)}
          </p>
          <button
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
