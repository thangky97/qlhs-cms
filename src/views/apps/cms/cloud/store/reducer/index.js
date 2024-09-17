const initialState = {
  data: [],
};
const settings = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SETTING":
      return {
        ...state,
        data: action.data,
        statusSetting: null,
      };
      case "GET_SETTING_BY_ID":
        return {
          ...state,
          data: action.data,
        };
      
    case "ADD_SETTING":
      return {
        ...state,
        statusSetting: action.response?.statusCode,
        type: action.type,
      };
    case "UPDATE_SETTING":
      return {
        ...state,
        statusSetting: action.response?.statusCode,
        type: action.type,
      };
    default:
      return { ...state };
  }
};
export default settings;
