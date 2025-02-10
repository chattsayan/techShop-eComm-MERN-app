import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { savePaymentMethod } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((store) => store.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold p-5 text-center">Payment Method</h1>
      <CheckoutSteps step1 step2 step3 />

      <div className="flex justify-center items-center h-full">
        <form onSubmit={submitHandler}>
          <fieldset>
            <legend className="text-lg font-medium text-gray-700">
              Select Method
            </legend>

            <div className="flex items-center space-x-2 mt-2">
              <input
                type="radio"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="PayPal" className="text-gray-700">
                PayPal or Credit Card
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-[100px] bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-3"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
