export const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "GET_HISTORY":
        return action.payload;
      case "POST_HISTORY":
        return JSON.parse(JSON.stringify(action)).payload;
      default:
        return state;
    }
};
  