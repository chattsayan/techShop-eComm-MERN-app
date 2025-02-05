import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { PiShoppingCartSimpleBold, PiUserBold } from "react-icons/pi";
import { IoChevronBack } from "react-icons/io5";
import { useState } from "react";

const Header = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between py-5 px-5 font-medium bg-slate-200 shadow-md">
      <Link to="/">
        <img
          src={assets.textLogo}
          alt="techshop"
          className="w-30 h-8 sm:w-60 sm:h-10"
        />
      </Link>

      <div className="flex items-center gap-6">
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <li className="flex items-center gap-1">
            <PiShoppingCartSimpleBold size={24} />
            <Link to="/cart">Cart</Link>
          </li>
          <li className="flex items-center gap-1">
            <PiUserBold size={24} />
            <Link to="/login">Sign In</Link>
          </li>
        </ul>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 "
          >
            <IoChevronBack size={18} />
            <p className="cursor-pointer">Back</p>
          </div>
          <Link
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            CART
          </Link>
          <Link
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/login"
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
