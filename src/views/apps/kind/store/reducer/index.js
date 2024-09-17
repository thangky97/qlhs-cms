const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selected: null,
};

const kind = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_KIND":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
      };
    case "GET_KIND":
      return { ...state, selected: action.selected };
    case "ADD_KIND":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "UPDATE_KIND":
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
