// ** Initial State
const initialState = {
  allData: [],
  dataExport: [],
  total: 1,
  selectedDepartment: null,
  staffs: [],
  training_programs: [],
};

const department = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_DEPARTMENT":
      return {
        ...state,
        allData: action.data.data,
        total: action.data.total,
        status: null,
        err: null,
      };

    case "GET_DETAIL_DEPARTMENT":
      return { ...state, selectedDepartment: action.data };

    case "UPDATE_DEPARTMENT":
      return {
        ...state,
        status: action?.data,
        type: action.type,
        err: action.err,
      };

    case "ADD_DEPARTMENT":
      return {
        ...state,
        status: action?.data,
        type: action.type,
        err: action.err,
      };

    //list chương trinh dao tao
    case "GET_DATA_TRAINING_PROGRAM":
      return {
        ...state,
        training_programs: action.data,
        totals: action.totalPages,
        params: action.params,
        status: null,
      };

    default:
      return { ...state };
  }
};
export default department;
