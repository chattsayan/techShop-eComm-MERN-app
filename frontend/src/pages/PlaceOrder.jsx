import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((store) => store.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res?.order?._id}`);
      console.log("placed order", res);
    } catch (err) {
      toast.error(err?.data?.error || "Failed to Place Order");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold p-5 text-center">Place Order</h1>
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Section (Shipping, Payment, Order Items) */}
        <div className="md:w-2/3 p-6 rounded-lg shadow">
          {/* Shipping */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">Shipping</h2>
            <p className="mt-2 text-gray-700">
              <strong>Address:</strong> {cart.shippingAddress.address},
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">Payment Method</h2>
            <p className="mt-2 text-gray-700">
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div>
            <h2 className="text-xl font-semibold">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ul className="mt-4 space-y-4">
                {cart.cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-16 rounded-md"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/products/${item.product}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-gray-700">
                      {item.quantity} x ₹{item.price} =
                      <strong className="ml-1">
                        ₹{(item.quantity * (item.price * 100)) / 100}
                      </strong>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Section (Order Summary) */}
        <div className="md:w-1/3 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Items</span>
              <span>₹{cart.itemsPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{cart.shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{cart.taxPrice}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>₹{cart.totalPrice}</span>
            </div>
          </div>

          <div>
            {error && (
              <Message variant="danger">
                {error?.data?.error || "An error occurred"}
              </Message>
            )}
          </div>

          {/* Place Order Button */}
          <button
            className={`w-full mt-4 py-2 px-4 rounded-lg text-white ${
              cart.cartItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {/* Loader */}
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
