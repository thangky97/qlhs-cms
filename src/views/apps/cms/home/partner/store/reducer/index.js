// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selected: null,
};

const partners = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_PARTNER":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
        err: null,
      };

    case "GET_PARTNER":
      return { ...state, selected: action.selected };
    case "ADD_PARTNER":
      return {
        ...state,
        type: action.type,
        status: action.response?.statusCode,
        err: action.err,
      };
    case "UPDATE_PARTNER":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "DELETE_PARTNER":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
      };
    default:
      return { ...state };
  }
};
export default partners;
