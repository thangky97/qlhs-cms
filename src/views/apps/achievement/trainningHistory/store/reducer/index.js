const initialState = {
  allData: [],
  data: [],
  dataExport: [],
  total: 1,
  params: {},
  selected: null,
  dataUserProduct: null,
};

const trainninghistory = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_TRAINNING_HISTORY":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params,
        status: null,
        dataUserProduct: null,
      };

    case "GET_DATA_USER_PRODUCT":
      return {
        ...state,
        dataUserProduct: action.data,
      };
    case "RESET_DATA_USER_PRODUCT":
      return {
        ...state,
        dataUserProduct: null,
      };
    case "GET_DATA_EXPORT_TRAINNING_HISTORY":
      return {
        ...state,
        dataExport: action.data,
      };
    default:
      return { ...state };
  }
};
export default trainninghistory;
