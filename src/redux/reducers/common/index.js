const common = (state = {}, action) => {
  switch (action.type) {
    case "GET_LANGUAGE":
      return { ...state, language: action.data };

    default:
      return state;
  }
};

export default common;
