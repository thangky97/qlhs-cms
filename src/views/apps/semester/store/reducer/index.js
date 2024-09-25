// ** Initial State
const initialState = {
  allData: [],
  dataExport: [],
  total: 1,
  selectedSemester: null,
  staffs: [],
  courses: [],
};

const semesters = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_SEMESTER":
      return {
        ...state,
        allData: action.data.data,
        total: action.data.total,
        status: null,
        err: null,
      };

    case "GET_DETAIL_SEMESTER":
      return { ...state, selectedSemester: action.data };

    case "UPDATE_SEMESTER":
      return {
        ...state,
        status: action?.data,
        type: action.type,
        err: action.err,
      };

    case "ADD_SEMESTER":
      return {
        ...state,
        status: action?.data,
        type: action.type,
        err: action.err,
      };

    //list nam hoc
    case "GET_DATA_PRODUCT":
      return {
        ...state,
        courses: action.data,
        totals: action.totalPages,
        params: action.params,
        status: null,
      };

    default:
      return { ...state };
  }
};
export default semesters;
