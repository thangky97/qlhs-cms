// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selected: null,
};

const user_product = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_USER_PRODUCT":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
      };
    case "GET_USER_PRODUCT":
      return { ...state, selected: action.selected };

    case "UPDATE_USER_PRODUCT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };

    default:
      return { ...state };
  }
};
export default user_product;
