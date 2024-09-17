import { useHistory } from "react-router-dom";

// ** Initial State
const initialState = {
  allData: [],
  data: [],
  dataExport: [],
  total: 1,
  params: {},
  selectedTransaction: null,
};

const transactions = (state = initialState, action) => {
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
    case "GET_LIST_TRANSACTION":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
      };

    case "GET_TRANSACTION":
      return { ...state, selectedTransaction: action.data };

    case "UPDATE_TRANSACTION":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
      };

    default:
      return { ...state };
  }
};
export default transactions;
