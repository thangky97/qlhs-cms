import { useHistory } from "react-router-dom";

// ** Initial State
const initialState = {
  allData: [],
  data: [],
  dataExport: [],
  total: 1,
  params: {},
  selectedTransactionToken: null,
};

const transactionsToken = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_TRANSACTION_TOKEN":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
        selectedTransactionToken: null,
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

    case "GET_TRANSACTION_TOKEN":
      return { ...state, selectedTransactionToken: action.data };

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
export default transactionsToken;
