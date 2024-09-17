const initialState = {
  allData: [],
  data: [],
  dataExport: [],
  total: 1,
  params: {},
  selected: null,
  userToken: [],
  product: [],
};

const userToken = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_USER_TOKEN":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
      };

    case "GET_DATA_EXPORT_USER":
      return {
        ...state,
        dataExport: action.data,
      };

    case "GET_USER_TOKEN_DETAIL":
      return { ...state, selected: action.selected };

    case "ADD_USER_TOKEN":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };

    case "UPDATE_USER_TOKEN":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };

    case "GET_DATA_USER":
      return {
        ...state,
        userToken: action.data,
        status: null,
        err: null,
      };

    case "GET_DATA_PRODUCT":
      return {
        ...state,
        product: action.data,
        status: null,
        err: null,
      };
    case "DELETE_USER_TOKEN":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
      };

    default:
      return { ...state };
  }
};
export default userToken;
