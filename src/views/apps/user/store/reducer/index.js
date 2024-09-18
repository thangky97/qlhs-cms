const initialState = {
  allData: [],
  data: [],
  dataExport: [],
  total: 1,
  params: {},
  selected: null,
};

const staffs = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_STAFF":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
        err: null,
      };
    case "GET_DATA_EXPORT_STAFF":
      return {
        ...state,
        dataExport: action.data,
      };
    case "GET_STAFF":
      return { ...state, selected: action.selected };
    case "ADD_STAFF":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "UPDATE_STAFF":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "DELETE_STAFF":
      return { ...state };
    default:
      return { ...state };
  }
};
export default staffs;
