const initialState = {
  allData: [],
  data: [],
  dataExport: [],
  total: 1,
  params: {},
  selected: null,
  dataUserProduct: null,
};

const kind = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_TRANSCRIPT":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
        dataUserProduct: null,
      };

    case "GET_DATA_USER_PRODUCT":
      return {
        ...state,
        dataUserProduct: action.data,
      };
    case "RESET_DATA_USER_PRODUCT":
      return {
        ...state,
        dataUserProduct: null,
      };
    case "GET_DATA_EXPORT_TRANSCRIPT":
      return {
        ...state,
        dataExport: action.data,
      };
    case "GET_TRANSCRIPT":
      return { ...state, selected: action.selected };
    case "ADD_TRANSCRIPT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "UPDATE_TRANSCRIPT":
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
export default kind;
