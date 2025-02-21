import { Link, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { id: orderId } = useParams();
  // console.log(orderId);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((store) => store.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successful");
      } catch (err) {
        toast.error(err?.data?.error || err.error);
      }
    });
  };

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment Successful");
  };

  const onError = (err) => {
    toast.error(err.error);
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered!");
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1 className="text-3xl font-semibold p-5">OrderID: {order._id}</h1>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Section */}
        <div className="md:w-2/3 p-6 rounded-lg shadow">
          {/* Shipping */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
            <p className="mt-2 text-gray-700">
              <strong>Name: </strong>
              {order?.user?.name}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>email: </strong>
              {order.user.email}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant="success">
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </div>

          {/* Payment Method */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
            <p className="mt-2 text-gray-700">
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>

            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </div>

          {/* Order Items */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Items</h2>

            <ul className="mt-4 space-y-4">
              {order.orderItems.map((item, index) => (
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
                      to={`/product/${item.product}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-gray-700">
                    {item.quantity} x ₹{item.price} =
                    <strong className="ml-1">
                      ₹{item.quantity * item.price}
                    </strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section (Order Summary) */}
        <div className="md:w-1/3 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Items</span>
              <span>₹{order.itemsPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{order.shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{order.taxPrice}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>₹{order.totalPrice}</span>
            </div>
          </div>

          {!order.isPaid && (
            <div>
              {loadingPay && <Loader />}

              {isPending ? (
                <Loader />
              ) : (
                <div>
                  {/* <button
                    onClick={onApproveTest}
                    className="mb-[10px] border py-2 px-4 rounded-md bg-blue-400"
                  >
                    Test Pay Order
                  </button> */}
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                </div>
              )}
            </div>
          )}

          {loadingDeliver && <Loader />}

          {userInfo &&
            userInfo.isAdmin &&
            order.isPaid &&
            !order.isDelivered && (
              <button
                onClick={deliverOrderHandler}
                className="w-full mt-[10px] mb-[10px] border py-2 px-4 rounded-md bg-blue-400"
              >
                Mark as Delivered
              </button>
            )}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
