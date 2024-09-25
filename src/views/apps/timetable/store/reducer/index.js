// ** Initial State
const initialState = {
  allData: [],
  dataExport: [],
  total: 1,
  selectedTimetable: null,
  staffs: [],
  courses: [],
  classrooms: [],
  semesters: [],
  terms: [],
};

const timetable = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_TIMETABLE":
      return {
        ...state,
        allData: action.data.data,
        total: action.data.total,
        status: null,
        err: null,
      };

    case "GET_DETAIL_TIMETABLE":
      return { ...state, selectedTimetable: action.data };

    case "UPDATE_TIMETABLE":
      return {
        ...state,
        status: action?.data,
        type: action.type,
        err: action.err,
      };

    case "ADD_TIMETABLE":
      return {
        ...state,
        status: action?.data,
        type: action.type,
        err: action.err,
      };

    //list môn hoc
    case "GET_DATA_COURSE":
      return {
        ...state,
        courses: action.data,
        totals: action.totalPages,
        params: action.params,
        status: null,
      };

    //list giảng viên
    case "GET_DATA_STAFF":
      return {
        ...state,
        staffs: action.data,
        totals: action.totalPages,
        params: action.params,
        status: null,
      };

    //list lớp học
    case "GET_DATA_CLASSROOM":
      return {
        ...state,
        classrooms: action.data,
        totals: action.totalPages,
        params: action.params,
        status: null,
      };

    //list kì học
    case "GET_DATA_SEMESTER":
      return {
        ...state,
        semesters: action.data,
        totals: action.totalPages,
        params: action.params,
        status: null,
      };

    //list lớp học
    case "GET_DATA_TERM_PRODUCT":
      return {
        ...state,
        terms: action.data,
        totals: action.totalPages,
        params: action.params,
        status: null,
      };

    default:
      return { ...state };
  }
};
export default timetable;
