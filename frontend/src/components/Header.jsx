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
import { TbLogout } from "react-icons/tb";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

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
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

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
            <div className="relative">
              <PiShoppingCartSimpleBold size={24} />
              {cartItems.length > 0 && (
                <p className="absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-red-700 text-white aspect-square rounded-full text-[8px] font-semibold">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </p>
              )}
            </div>
            <Link to="/cart">Cart</Link>
          </li>
          <li className="flex items-center gap-1">
            {userInfo ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-2 text-gray-600 rounded-md focus:outline-none flex items-center justify-center gap-2 hover:text-gray-800"
                  >
                    {userInfo.name}
                    <span>
                      <AiOutlineCaretDown />
                    </span>
                  </button>
                </div>

                {isOpen && (
                  <div className="absolute right-10 top-12 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                    <Link
                      to="/profile"
                      className="flex px-4 py-2 text-gray-700 hover:bg-blue-100 items-center gap-2 transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>
                        <PiUserBold size={19} />
                      </span>
                      View Profile
                    </Link>

                    {/* ADMIN USER - Code starts here */}
                    {userInfo && userInfo.isAdmin && (
                      <>
                        <hr />
                        <Link
                          to="/admin/productlist"
                          onClick={() => {
                            setIsOpen(false);
                          }}
                          className="flex w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 items-center gap-2 transition-colors duration-300"
                        >
                          <span>
                            <AiOutlineProduct size={19} />
                          </span>
                          Products
                        </Link>

                        <Link
                          to="/admin/orderlist"
                          onClick={() => {
                            setIsOpen(false);
                          }}
                          className="flex w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 items-center gap-2 transition-colors duration-300"
                        >
                          <span>
                            <BsBoxSeam size={19} />
                          </span>
                          Orders
                        </Link>

                        <Link
                          to="/admin/userlist"
                          onClick={() => {
                            setIsOpen(false);
                          }}
                          className="flex w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 items-center gap-2 transition-colors duration-300"
                        >
                          <span>
                            <PiUsersBold size={19} />
                          </span>
                          Users
                        </Link>
                        <hr />
                      </>
                    )}
                    {/* ADMIN USER - Code ends here */}

                    <Link
                      onClick={() => {
                        logoutHandler();
                        setIsOpen(false);
                      }}
                      className="flex w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 items-center gap-2 transition-colors duration-300"
                    >
                      <span>
                        <TbLogout size={19} />
                      </span>
                      Logout
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <PiUserBold size={24} />
                <Link to="/login">Sign In</Link>
              </>
            )}
          </li>

          {/* <li></li> */}
        </ul>

        <div className="relative">
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
          />
          {cartItems.length > 0 && (
            <p className="absolute right-[-6px] top-[-6px] w-3 text-center leading-4 bg-red-700 text-white aspect-square rounded-full sm:hidden"></p>
          )}
        </div>
      </div>

      {/* sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center justify-start gap-1 p-3"
            onClick={() => setVisible(false)}
          >
            <IoChevronBack size={18} />
            <p className="cursor-pointer">Back</p>
          </div>

          <Link
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border flex items-center gap-3"
            to="/cart"
          >
            CART
            {cartItems.length > 0 && (
              <p className="w-4 text-center leading-4 bg-red-700 text-white aspect-square rounded-full text-[8px] font-semibold">
                {cartItems.reduce((a, c) => a + c.quantity, 0)}
              </p>
            )}
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
