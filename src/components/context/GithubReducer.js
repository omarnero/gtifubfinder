const githubReducer = (state, action) => {
  switch (action.type) {
    case "Git_user":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "Set_loading":
      return {
        ...state,
        loading: true,
      };
    case "Clear_user":
      return {
        ...state,
        users: [],
      };
    case "Set_user":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
export default githubReducer;
