import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  // console.log(orders);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center py-3">Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-sm my-2">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                USER
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
              <th className="border border-gray-300 px-4 py-2 text-left"></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {order._id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.user && order.user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ₹ {order.totalPrice}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
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
      )}
    </div>
  );
};

export default OrderListPage;
