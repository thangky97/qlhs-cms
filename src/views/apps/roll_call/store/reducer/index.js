const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selected: null,
  instractors: [],
  departments: [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_PRODUCT":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
        err: null,
        selected: null,
      };
    case "GET_PRODUCT":
      return { ...state, selected: action.selected };
    case "ADD_PRODUCT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
      };
    case "GET_DATA_INSTRACTORS":
      return {
        ...state,
        instractors: action.data,
        totals: action.totalPages,
        params: action.params,
        status: null,
      };

    //list nghanh
    case "GET_DATA_DEPARTMENT":
      return {
        ...state,
        departments: action.data,
        totals: action.totalPages,
        params: action.params,
        status: null,
      };

    default:
      return { ...state };
  }
};
export default products;
