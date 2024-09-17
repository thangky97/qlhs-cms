import { useHistory } from "react-router-dom";
// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selected: null,
};

const documents = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_DOCUMENT":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
        err: null,
      };
    case "GET_DOCUMENT":
      return { ...state, selected: action.selected.data };
    case "ADD_DOCUMENT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "UPDATE_DOCUMENT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "DELETE_DOCUMENT":
      return { ...state };
    default:
      return { ...state };
  }
};
export default documents;
