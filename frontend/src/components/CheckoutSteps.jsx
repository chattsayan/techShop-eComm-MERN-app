import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="pt-2 pb-1">
      <div className="flex items-center justify-center space-x-4 mb-6">
        {/* Step 1: Sign In */}
        <div>
          {step1 ? (
            <Link to="/login" className="text-blue-600 font-semibold">
              Sign In
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">Sign In</span>
          )}
        </div>

        <FaChevronRight size={13} />

        {/* Step 2: Shipping */}
        <div>
          {step2 ? (
            <Link to="/shipping" className="text-blue-600 font-semibold">
              Shipping
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">Shipping</span>
          )}
        </div>

        <FaChevronRight size={13} />

        {/* Step 3: Payment */}
        <div>
          {step3 ? (
            <Link to="/payment" className="text-blue-600 font-semibold">
              Payment
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">Payment</span>
          )}
        </div>

        <FaChevronRight size={13} />

        {/* Step 4: Place Order */}
        <div>
          {step4 ? (
            <Link to="/placeorder" className="text-blue-600 font-semibold">
              Place Order
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">
              Place Order
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
