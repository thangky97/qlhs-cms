const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selected: null,
};

const versions = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_VERSION_PRODUCT":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        err:null
        ,
        status: null,

      };
    case "GET_VERSION_PRODUCT":
      return { ...state, selected: action.selected };
    case "ADD_VERSION_PRODUCT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type, err:action.err
      };
    case "UPDATE_VERSION_PRODUCT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type, err:action.err
      };
    case "DELETE_VERSION_PRODUCT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
      };
    default:
      return { ...state };
  }
};
export default versions;
