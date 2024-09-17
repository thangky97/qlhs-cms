
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedProduct: null
}

const sliders = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_SLIDER":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
        , status: null,
        err:null

      }
    case 'ADD_SLIDER':
      return {
        ...state,
        type: action.type,
        status: action.response?.statusCode,err:action.err
      }
      
      case 'GET_SLIDER':
        
        return { ...state, selected: action.selected }
    case 'UPDATE_SLIDER':
      return { ...state, status: action.response?.statusCode, type: action.type,err:action.err }
    case 'DELETE_SLIDER':
      return { ...state, status: action.response?.statusCode, type: action.type }
    default:
      return { ...state };
  }
};
export default sliders;
