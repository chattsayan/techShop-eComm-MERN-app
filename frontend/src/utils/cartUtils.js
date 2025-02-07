export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // ----- Calculate items price -----
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  // ----- Calculate shipping price (if order over 1000 then free, else 100 delivery) -----
  state.shippingPrice = addDecimal(state.itemsPrice > 1000 ? 0 : 100);

  // ----- Calculate tax price (15% tax) -----
  state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));

  // ----- Calculate total price -----
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
