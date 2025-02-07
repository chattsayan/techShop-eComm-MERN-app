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
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <div className="md:w-2/3">
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty.
              <Link to="/" className="text-blue-500 ml-2 font-bold">
                Go Back
              </Link>
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
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-lg font-semibold"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600">₹ {item.price}</p>
                  </div>
                  <select
                    className="border p-1 rounded"
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
                    className="ml-4 text-gray-800 bg-slate-200 hover:bg-slate-300 p-2 rounded-md"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:w-1/3 p-4 border rounded-lg">
          <h2 className="text-xl font-bold">
            Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            items
          </h2>
          <p className="text-lg font-semibold">
            ₹
            {cartItems
              .reduce((acc, item) => acc + item.quantity * item.price, 0)
              .toFixed(2)}
          </p>
          <button
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
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
