// ** Initial State
const initialState = {
  allData: [],
  dataExport: [],
  total: 1,
  selectedClassroom: null,
};

const classroom = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_CLASSROOM":
      return {
        ...state,
        allData: action.data.data,
        total: action.data.total,
        status: null,
        err: null,
      };

    case "GET_DETAIL_CLASSROOM":
      return { ...state, selectedClassroom: action.data };

    case "UPDATE_CLASSROOM":
      return {
        ...state,
        status: action?.data,
        type: action.type,
        err: action.err,
      };

    case "ADD_CLASSROOM":
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
export default classroom;
