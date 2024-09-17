import { useHistory } from "react-router-dom";

// ** Initial State
const initialState = {
  allData: [],
  dataExport: [],
  total: 1,
  selectedInstructors: null,
  statusCode: 0,
};

const instructors = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_INSTRUCTORS":
      return {
        ...state,
        allData: action.data.data,
        total: action.data.total,
        selectedInstructors: null,
        status: 0,
      };

    case "GET_DATA_EXPORT_INSTRUCTORS":
      return {
        ...state,
        dataExport: action.data.data,
      };

    case "GET_DETTAL_INSTRUCTORS":
      return { ...state, selectedInstructors: action.data };

    case "UPDATE_INSTRUCTORS":
      return {
        ...state,
        status: action?.data,
        type: action.type,
        err: action.err,
      };

    case "ADD_INSTRUCTORS":
      return {
        ...state,
        status: action?.data,
        type: action.type,
        err: action.err,
      };

    default:
      return { ...state };
  }
};
export default instructors;
