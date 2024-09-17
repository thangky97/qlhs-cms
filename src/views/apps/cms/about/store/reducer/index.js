const initialState = {
  data: [],
};

const abouts = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_ABOUT":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null, err:null
      };
    case "ADD_ABOUT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type, err:action.err
      };
      case "GET_ABOUT":
    return { ...state, selected: action.selected };
 
  case "UPDATE_ABOUT":
    return {
      ...state,
      status: action.response?.statusCode,
      type: action.type,err:action.err
    };
    default:
      return { ...state };
  }
  
};
export default abouts;
