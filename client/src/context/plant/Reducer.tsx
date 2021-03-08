export const reducer = (state: any, action: any) => {
  const { Plant } = action.payload;
  switch (action.type) {
    case "GET_PLANT":
      return { ...state, ...Plant };
    default:
      return state;
  }
};
