const initialState = {
  loading: false,
  cartitems: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addToCart":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "updateCart":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};
