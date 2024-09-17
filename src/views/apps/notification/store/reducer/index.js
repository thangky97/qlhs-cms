const initialState = {
  allData: [],
  data: [],
  dataExport: [],
  total: 1,
  params: {},
  selected: null,
  user: [],
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_NOTIFICATION":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
        selected: null,
      };
    case "GET_DATA_EXPORT_NOTIFICATION":
      return {
        ...state,
        dataExport: action.data,
      };
    case "GET_DATA_USER":
      return {
        ...state,
        user: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
      };
    case "GET_USER":
      return { ...state, selected: action.selected };
    case "GET_NOTIFICATION":
      return { ...state, selected: action.selected };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        status: action?.response?.statusCode,
        type: action?.type,
        err: action?.err,
      };
    case "DELETE_NOTIFICATION":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
      };
    case "UPDATE_NOTIFICATION":
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
export default notification;
