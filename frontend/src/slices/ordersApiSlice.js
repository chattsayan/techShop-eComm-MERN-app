import { ORDERS_URL, PAYPAL_URL } from "../utils/constant";
import { apiSlice } from "./apiSlice";

// defining ordersApiSlice
const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;

// injectEndpoints - This extends (injectEndpoints) the existing apiSlice by adding new endpoints for handling orders.
// builder.mutation: Defines a mutation for creating a new order.
// query: Specifies the request details
// builder.query: Defines a query for fetching order details.
// keepUnusedDataFor: 5: Keeps fetched order data in the cache for 5 seconds before it gets removed.
// useCreateOrderMutation: A hook for triggering createOrder mutation.
// useGetOrderDetailsQuery: A hook for fetching order details.

// Usage in a React component:
// const [createOrder] = useCreateOrderMutation();
// const { data: order, isLoading } = useGetOrderDetailsQuery(orderId);
// createOrder(orderData): Calls the API to create an order.
// useGetOrderDetailsQuery(orderId): Fetches the order details.
