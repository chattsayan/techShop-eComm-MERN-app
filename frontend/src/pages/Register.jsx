import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((store) => store.auth);

  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      }
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };

  return (
    <div className="relative py-3 sm:max-w-xs sm:mx-auto">
      <div className="min-h-96 px-8 py-6 mt-4 text-left rounded-xl border bg-slate-200 shadow-lg">
        <div className="flex flex-col justify-center items-center h-full select-none">
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <p className="m-0 text-[24px] md:text-[26px] font-semibold text-black">
              Sign Up
            </p>
          </div>

          <form onSubmit={submitHandler} className="w-full flex flex-col gap-2">
            {/* Name Field */}
            <label
              htmlFor="name"
              className="font-semibold text-xs text-gray-500"
            >
              Name
            </label>
            <input
              type="name"
              placeholder="Enter Name"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email Field */}
            <label
              htmlFor="email"
              className="font-semibold text-xs text-gray-500"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Field with Eye Icon */}
            <label
              htmlFor="password"
              className="font-semibold text-xs text-gray-500"
            >
              Password
            </label>
            <div className="relative w-full">
              <input
                placeholder="••••••••"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-[8.7px] cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>

            {/* Confirm Password */}
            <label
              htmlFor="password"
              className="font-semibold text-xs text-gray-500"
            >
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                placeholder="Confirm Password"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
            >
              Register
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="py-3">
            <p className="text-sm font-semibold text-gray-500">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
