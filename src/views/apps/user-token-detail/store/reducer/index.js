const initialState = {
  allData: [],
  data: [],
  total: 1,
  selected: null,
};

const userTokenDetail = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_USER_TOKEN_DETAIL":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        status: null,
      };

    case "ADD_USER_TOKEN":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };

    case "GET_USER_TOKEN_DETAIL_BY_ID":
      return { ...state, selected: action?.selected?.data };

    case "UPDATE_USER_TOKEN_DETAIL":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };

    case "DELETE_USER_TOKEN_DETAIL":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
      };

    default:
      return { ...state };
  }
};
export default userTokenDetail;
