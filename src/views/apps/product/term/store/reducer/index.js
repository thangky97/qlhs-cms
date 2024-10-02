const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  courseDetail: {},
  selected: null,
  courses: [],
  instractors: [],
  users: [],
};

const terms = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_TERM_PRODUCT":
      return {
        ...state,
        data: action.data?.data,
        total: action.totalPages,
        params: action.params,
        err: null,
        status: null,
      };
    case "GET_TERM_PRODUCT":
      return { ...state, selected: action.selected };
    case "GET_PRODUCT":
      return { ...state, productDetail: action.selected, status: null };
    case "ADD_TERM_PRODUCT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "UPDATE_TERM_PRODUCT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
        err: action.err,
      };
    case "DELETE_TERM_PRODUCT":
      return {
        ...state,
        status: action.response?.statusCode,
        type: action.type,
      };

    //list instractors
    case "GET_DATA_STAFF":
      return {
        ...state,
        instractors: action.data,
        totals: action.totalPages,
        params: action.params,
        status: null,
      };

    //năm học
    case "GET_DATA_COURSE":
      return {
        ...state,
        courses: action.data,
        totals: action.totalPages,
        params: action.params,
        status: null,
      };
    case "GET_DETAIL_COURSE":
      return { ...state, courseDetail: action.selected };

    //list học sinh
    case "GET_DATA_STAFF":
      return {
        ...state,
        users: action.data,
        totals: action.totalPages,
        params: action.params,
        status: null,
      };

    default:
      return { ...state };
  }
};
export default terms;
