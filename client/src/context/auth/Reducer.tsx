export const reducer = (state: any, action: any) => {
  const { Auth } = action.payload;
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...Auth };
    case "LOGOUT":
      return { ...state, ...Auth };
    default:
      return state;
  }
};
