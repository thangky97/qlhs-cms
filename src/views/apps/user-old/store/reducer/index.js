const initialState = {
  allData: [],
  data: [],
  dataExport: [],
  total: 1,
  params: {},
  selected: null,
};

const abouts = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_USER":
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
    case "GET_USER":
      return { ...state, selected: action.selected };
    case "ADD_USER":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "UPDATE_USER":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };

    case "GET_DATA_USER_BY_PRODUCTID":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        // params: action.params,
        status: null,
      };

    default:
      return { ...state };
  }
};
export default abouts;
