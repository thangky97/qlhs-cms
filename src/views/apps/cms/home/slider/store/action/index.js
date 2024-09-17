import api from '../../../../../../../constants/api'
import Service from "../../../../../../../services/request"
export const getData = params => {
  return async dispatch => {
    await Service.send({
      method: api.LIST_SLIDER.method, path: api.LIST_SLIDER.path, query: params
    }).then(response => {
      dispatch({
        type: 'GET_DATA_SLIDER',
        data: response?.data,
        totalPages: response?.data?.total,
        params
      })
    })
  }
}
// ** Get User
export const  getById = data => {
  return async dispatch => {
    await Service.send({
      method: api.GET_SLIDER.method, path: api.GET_SLIDER.path, query:  data 
    })
      .then(response => {
        dispatch({
          type: 'GET_SLIDER',
          selected: response?.data
        })
      })
      .catch(err => console.log(err))
  }
}

// ** Add new user
export const add = data => {
  return async (dispatch) => {
     await Service.send({
      method: api.CREATE_SLIDER.method, path: api.CREATE_SLIDER.path, data:data
    }).then(response => {
        dispatch({
          type: 'ADD_SLIDER',
          response
        })
      })
      .catch(err =>  dispatch({
        type: 'ADD_SLIDER',
        err
      }))
  }
}
export const update = data => {
  return async (dispatch) => {
     await Service.send({
      method: api.UPDATE_SLIDER.method, path: api.UPDATE_SLIDER.path, data:data
    }).then(response => {
        dispatch({
          type: 'UPDATE_SLIDER',
          response
        })
      })
      
      .catch(err =>  dispatch({
        type: 'UPDATE_SLIDER',
        err
      }))
  }
}
export const remove = data => {
  return async (dispatch, getState) => {
     await Service.send({
      method: api.DELETE_SLIDER.method, path: api.DELETE_SLIDER.path, query:data
    }).then(response => {
        dispatch({
          type: 'DELETE_SLIDER',
          response
        })
      })
      .catch(err => console.log(err))
  }
}