export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET_HISTORY":
      return action.payload;
    case "DELETE_HISTORY":
      return state.filter((history: any) => {
        return history._id !== action.payload._id;
      });
    default:
      return state;
  }
};
