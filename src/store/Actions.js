const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
  ADD_MODAL: "ADD_MODAL",
  ADD_ORDERS: "ADD_ORDERS",
  ADD_USERS: "ADD_USERS",
  ADD_CATEGORIES: "ADD_CATEGORIES",
};

const addToCart = (product, cart) => {
  if (product.inStock === 0) {
    return {
      type: "NOTIFY",
      payload: { error: "This product is not in stock." },
    };
  }

  const check = cart.every((item) => {
    return item._id !== product._id;
  });

  if (!check)
    return {
      type: "NOTIFY",
      payload: { error: "This product is already present in the cart." },
    };

  return {
    type: "ADD_CART",
    payload: [...cart, { ...product, quantity: 1 }],
  };
};

const decrease = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1;
  });

  return { type: "ADD_CART", payload: newData };
};

const increase = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });

  return { type: "ADD_CART", payload: newData };
};

const deleteFromCart = (data, id, type) => {
  const newData = data.filter((item) => item._id !== id);
  return { type, payload: newData };
};

const updateItem = (data, id, post, type) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return { type, payload: newData };
};

export { addToCart, decrease, increase, deleteFromCart, updateItem };
export default ACTIONS;
