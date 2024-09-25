// ** Initial State
const initialState = {
  allData: [],
  dataExport: [],
  total: 1,
  selectedTrainingProgram: null,
};

const training_programs = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_TRAINING_PROGRAM":
      return {
        ...state,
        allData: action.data.data,
        total: action.data.total,
        status: null,
        err: null,
      };

    case "GET_DETAIL_TRAINING_PROGRAM":
      return { ...state, selectedTrainingProgram: action.data };

    case "UPDATE_TRAINING_PROGRAM":
      return {
        ...state,
        status: action?.data,
        type: action.type,
        err: action.err,
      };

    case "ADD_TRAINING_PROGRAM":
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
export default training_programs;
