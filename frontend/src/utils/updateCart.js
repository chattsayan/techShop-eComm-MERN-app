const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // console.log(state.cartItems);
  // ----- Calculate items price -----
  const itemsPrice = state.cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  state.itemsPrice = addDecimal(itemsPrice);

  // ----- Calculate shipping price (if order over 1000 then free, else 100 delivery) -----
  const shippingPrice = itemsPrice > 1000 ? 0 : 100;
  state.shippingPrice = addDecimal(shippingPrice);

  // ----- Calculate tax price (15% tax) -----
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimal(taxPrice);

  // ----- Calculate total price -----
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  state.totalPrice = addDecimal(totalPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
