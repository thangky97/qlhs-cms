import { useHistory } from "react-router-dom"

// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selected: null
}

const staffs = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA':

      return { ...state, allData: action.data.data }
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
        , status: null
      }
    case 'GET_STAFF':
      return { ...state, selected: action.selected }
    case 'ADD_STAFF':
      return { ...state, status: action.response?.statusCode, type: action.type }
    case 'UPDATE_STAFF':
      
      return { ...state, status: action.response?.statusCode, type: action.type }
    case 'DELETE_STAFF':
      return { ...state }
    default:
      return { ...state }
  }
}
export default staffs
