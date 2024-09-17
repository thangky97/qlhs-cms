// ** Initial State
const initialState = {
  allData: [],
  dataExport: [],
  total: 1,
  selectedCourse: null,
};

const courses = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_COURSE":
      return {
        ...state,
        allData: action.data.data,
        total: action.data.total,
        status: null,
        err: null,
      };

    case "GET_DETAIL_COURSE":
      return { ...state, selectedCourse: action.data };

    case "UPDATE_COURSE":
      return {
        ...state,
        status: action?.data,
        type: action.type,
        err: action.err,
      };

    case "ADD_COURSE":
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
export default courses;
