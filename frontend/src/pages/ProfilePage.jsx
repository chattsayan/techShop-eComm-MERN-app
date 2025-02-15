import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((store) => store.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.error || err.error);
      }
    }
  };

  const resetUserProfile = () => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/4 p-4">
        <h2 className="text-2xl font-semibold">User Profile</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="my-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <button className="border py-[5px] px-[13px] rounded-md bg-blue-500 font-semibold text-white">
              Submit
            </button>

            <button
              onClick={resetUserProfile}
              className="border py-[5px] px-[13px] rounded-md bg-blue-500 font-semibold text-white"
            >
              Reset
            </button>
          </div>

          {loadingUpdateProfile && <Loader />}
        </form>
      </div>

      <div className="w-full md:w-3/4 p-4">
        <h2 className="text-2xl font-semibold">My Orders</h2>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.error || error.error}
          </Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-sm my-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    DATE
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    TOTAL
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    PAID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    DELIVERED
                  </th>
                  <th className="border border-gray-300 px-4 py-2"></th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
                  >
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                      {order._id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                      ₹ {order.totalPrice}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                      <Link
                        to={`/order/${order._id}`}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-xs hover:bg-gray-300 transition"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
