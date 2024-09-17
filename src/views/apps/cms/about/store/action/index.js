import api from '../../../../../../constants/api'
import Service from "../../../../../../services/request"


export const getData = (params) => {
  return async (dispatch) => {
    return await Service.send({
      method: api.LIST_ABOUT.method, path: api.LIST_ABOUT.path, query: params
    }).then(response => {
      return dispatch({
        type: 'GET_DATA_ABOUT',
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params
      })
    })
  }
}
export const add = data => {
  return async (dispatch) => {
    await Service.send({
      method: api.CREATE_ABOUT.method, path: api.CREATE_ABOUT.path, data
    }).then(response => {
      dispatch({
        type: 'ADD_ABOUT',
        response
      })
    })

    .catch(err =>  dispatch({
      type: 'ADD_ABOUT',
      err
    }))
  }
}
export const getById = query => {
  return async dispatch => {
    await Service.send({
      method: api.GET_ABOUT.method, path: api.GET_ABOUT.path, query 
    })
      .then(response => {
        dispatch({
          type: 'GET_ABOUT',
          selected: response?.data
        })
      })
      .catch(err => console.log(err))
  }
}
export const update = (data) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_ABOUT.method,
      path: api.UPDATE_ABOUT.path,
      data
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_ABOUT",
          response,
        });
      })

      .catch(err =>  dispatch({
        type: 'UPDATE_ABOUT',
        err
      }))
  };
};