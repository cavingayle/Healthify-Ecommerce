import axios from "axios";

const initialState = {
  cart: [],
  query: "",
  customerId: "",
  products: [],
};

// Action Strings -- WILL NEED PROMISE MIDDLEWARE IN STORE

//Cart
const GET_CART = "GET_CART";
const DEL_FROM_CART = "DEL_FROM_CART";
const INC_CART_QTY = "INC_CART_QTY";
const DEC_CART_QTY = "DEC_CART_QTY";
const ADD_TO_CART = "ADD_TO_CART";
const CLEAR_CART = "CLEAR_CART";

//Auth
const UPDATE_USER = "UPDATE_USER";
const LOGOUT = "LOGOUT";

//Product
const GET_PRODUCTS = "GET_PRODUCTS";

// Action Builders
export const getCart = () => {
  const data = axios.get("/cart").then((res) => res.data);

  return {
    type: GET_CART,
    payload: data,
  };
};

export const deleteFromCart = (id) => {
  const data = axios.delete(`/cart/${id}`).then((res) => res.data);

  return {
    type: DEL_FROM_CART,
    payload: data,
  };
};

export const increaseCartQuantity = (id) => {
  const data = axios.put("/incqty", {id}).then((res) => res.data);

  return {
    type: INC_CART_QTY,
    payload: data,
  };
};

export const decreaseCartQuantity = (id) => {
  const data = axios.put("/decqty", {id}).then((res) => res.data);

  return {
    type: DEC_CART_QTY,
    payload: data,
  };
};

export const addToCart = (id) => {
  const data = axios.post("/cart/",{id}).then((res) => res.data);

  return {
    type: ADD_TO_CART,
    payload: data,
  };
};

export const clearCart = () => {
  const data = axios.delete("/clearcart").then((res) => res.data);

  return {
    type: CLEAR_CART,
    payload: data,
  };
};

//Auth Action Builder

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

// Product

export function getProducts() {
  let data = axios.get("/api/products").then((res) => res.data);

  return {
    type: GET_PRODUCTS,
    payload: data,
  }
}



//  Reducer

export default function reducer(state = initialState, action) {
  console.log('this is the action payload',action.payload);

  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS + "_FULFILLED":
      return { ...state, products: payload };
    case CLEAR_CART + "_FULFILLED":
      return {...state, cart: payload}
    case GET_CART + "_FULFILLED":
      return { ...state, cart: payload };
    case DEL_FROM_CART + "_FULFILLED":
      return { ...state, cart: payload };
    case INC_CART_QTY + "_FULFILLED":
      return { ...state, cart: payload };
    case DEC_CART_QTY + "_FULFILLED":
      return { ...state, cart: payload };
    case ADD_TO_CART + "_FULFILLED":
      return { ...state, cart: payload };
    case UPDATE_USER:
      return { ...state, customerId: payload };
    case LOGOUT:
      return state;

    default:
      return state;
  }
}
