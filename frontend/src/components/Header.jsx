import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  PiShoppingCartSimpleBold,
  PiUserBold,
  PiUsersBold,
} from "react-icons/pi";
import { IoChevronBack } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCaretDown, AiOutlineProduct } from "react-icons/ai";
import { TbLogin2, TbLogout } from "react-icons/tb";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import SearchBar from "./SearchBar";
import { resetCart } from "../slices/cartSlice";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useSelector((store) => store.cart);
  const { userInfo } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
    } catch (err) {
      console.error(err?.data?.error);
    }
  };

  return (
    <div className="fixed top-0 w-full z-50 flex items-center justify-between py-4 px-5 font-medium bg-white shadow-md">
      <Link to="/">
        <img
          src={assets.textLogo}
          alt="techshop"
          className="w-30 h-8 sm:w-60 sm:h-10"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-6">
        <SearchBar />
        <div className="relative">
          <Link to="/cart" className="flex items-center gap-1">
            {/* <PiShoppingCartSimpleBold size={22} /> */}
            <img
              src="https://www.svgrepo.com/show/525740/cart-large.svg"
              height={30}
              width={30}
            />
            {cartItems.length > 0 && (
              <p className="absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-red-700 text-white aspect-square rounded-full text-[10px] font-semibold">
                {cartItems.reduce((a, c) => a + c.quantity, 0)}
              </p>
            )}
          </Link>
        </div>

        {/* User Menu */}
        {userInfo ? (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 rounded-md focus:outline-none hover:text-gray-800"
            >
              {userInfo.name}
              <AiOutlineCaretDown />
            </button>

            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                <Link
                  to="/profile"
                  className="flex px-4 py-2 text-gray-700 hover:bg-blue-100 items-center gap-2 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <PiUserBold size={19} />
                  View Profile
                </Link>

                {/* Admin Section */}
                {userInfo.isAdmin && (
                  <>
                    <hr />
                    <Link
                      to="/admin/productlist"
                      onClick={() => setIsOpen(false)}
                      className="flex px-4 py-2 text-gray-700 hover:bg-blue-100 items-center gap-2 transition-colors duration-300"
                    >
                      <AiOutlineProduct size={19} />
                      Products
                    </Link>
                    <Link
                      to="/admin/orderlist"
                      onClick={() => setIsOpen(false)}
                      className="flex px-4 py-2 text-gray-700 hover:bg-blue-100 items-center gap-2 transition-colors duration-300"
                    >
                      <BsBoxSeam size={19} />
                      Orders
                    </Link>
                    <Link
                      to="/admin/userlist"
                      onClick={() => setIsOpen(false)}
                      className="flex px-4 py-2 text-gray-700 hover:bg-blue-100 items-center gap-2 transition-colors duration-300"
                    >
                      <PiUsersBold size={19} />
                      Users
                    </Link>
                    <hr />
                  </>
                )}

                {/* Logout */}
                <button
                  onClick={() => {
                    logoutHandler();
                    setIsOpen(false);
                  }}
                  className="flex w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 items-center gap-2 transition-colors duration-300"
                >
                  <TbLogout size={19} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="flex items-center gap-1">
            <img
              src="https://www.svgrepo.com/show/527952/user-hand-up.svg"
              height={26}
              width={26}
            />
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="sm:hidden relative">
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer"
        />
        {cartItems.length > 0 && (
          <p className="absolute right-[-6px] top-[-6px] w-3 text-center leading-4 bg-red-700 text-white aspect-square rounded-full sm:hidden"></p>
        )}
      </div>

      {/* Sidebar Menu (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-md transition-transform ${
          visible ? "w-[250px]" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-1 p-3 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <IoChevronBack size={18} />
            <p>Back</p>
          </div>

          <Link
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border flex items-center gap-3"
            to="/cart"
          >
            <PiShoppingCartSimpleBold size={19} />
            Cart
            {cartItems.length > 0 && (
              <p className="w-4 text-center leading-4 bg-red-700 text-white aspect-square rounded-full text-[8px] font-semibold">
                {cartItems.reduce((a, c) => a + c.quantity, 0)}
              </p>
            )}
          </Link>

          {/* User Authentication Links */}
          {userInfo ? (
            <>
              <Link
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border flex items-center gap-3"
                to="/profile"
              >
                <PiUserBold size={19} /> View Profile
              </Link>

              {/* Admin Links (if user is admin) */}
              {userInfo.isAdmin && (
                <>
                  <Link
                    to="/admin/productlist"
                    onClick={() => setVisible(false)}
                    className="py-2 pl-6 border flex items-center gap-3"
                  >
                    <AiOutlineProduct size={19} />
                    Products
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    onClick={() => setVisible(false)}
                    className="py-2 pl-6 border flex items-center gap-3"
                  >
                    <BsBoxSeam size={19} />
                    Orders
                  </Link>
                  <Link
                    to="/admin/userlist"
                    onClick={() => setVisible(false)}
                    className="py-2 pl-6 border flex items-center gap-3"
                  >
                    <PiUsersBold size={19} />
                    Users
                  </Link>
                </>
              )}

              <Link
                onClick={() => {
                  logoutHandler();
                  setVisible(false);
                }}
                className="py-2 pl-6 border flex items-center gap-3"
                to="/login"
              >
                <TbLogout size={19} />
                Logout
              </Link>
            </>
          ) : (
            <Link
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border flex items-center gap-3"
              to="/login"
            >
              <TbLogin2 size={19} />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
