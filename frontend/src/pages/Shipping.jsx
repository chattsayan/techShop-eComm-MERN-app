import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {
  const cart = useSelector((store) => store.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    // e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  const resetProfile = () => {
    setAddress("");
    setCity("");
    setPostalCode("");
    setCountry("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold p-5 text-center">Shipping Address</h1>

      <CheckoutSteps step1 step2 />

      <div className="flex justify-center items-center h-full select-none">
        <div className="border p-5 rounded-xl w-full max-w-lg bg-slate-200 shadow-lg">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full flex flex-col gap-4"
          >
            {/* Address */}
            <label
              htmlFor="address"
              className="font-semibold text-xs text-gray-500"
            >
              Address
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {/* City */}
            <label
              htmlFor="city"
              className="font-semibold text-xs text-gray-500"
            >
              City
            </label>
            <input
              type="text"
              placeholder="Enter City"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            {/* Postal Code */}
            <label
              htmlFor="postalCode"
              className="font-semibold text-xs text-gray-500"
            >
              Postal Code
            </label>
            <input
              type="number"
              placeholder="Enter Postal Code"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />

            {/* Country */}
            <label
              htmlFor="country"
              className="font-semibold text-xs text-gray-500"
            >
              Country
            </label>
            <input
              type="text"
              placeholder="Enter Country Name"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={submitHandler}
                type="button"
                className="py-2 px-6 bg-blue-500 hover:bg-blue-800 text-white w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none rounded-lg"
              >
                Submit
              </button>

              <button
                onClick={resetProfile}
                type="button"
                className="py-2 px-6 bg-gray-500 hover:bg-gray-700 text-white w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none rounded-lg"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
