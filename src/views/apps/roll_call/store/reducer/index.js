const initialState = {
  allData: [],
  data: [],
  dataExport: [],
  total: 1,
  params: {},
  selected: null,
};

const roll_calls = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_ROLL_CALL":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        err: null,
        status: null,
      };
    case "GET_DATA_EXPORT_ROLL_CALL":
      return {
        ...state,
        dataExport: action.data,
      };
    case "GET_ROLL_CALL":
      return { ...state, selected: action.selected };
    case "ADD_ROLL_CALL":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "UPDATE_ROLL_CALL":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "IMPORT":
      return {
        ...state,
        data: action.data,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };

    default:
      return { ...state };
  }
};
export default roll_calls;
