import api from "../../../../../../constants/api";
import Service from "../../../../../../services/request";

export const getData = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_VERSION.method,
      path: api.LIST_VERSION.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_VERSION_PRODUCT",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

export const getById= (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_VERSION.method,
      path: api.GET_VERSION.path,
      query: data,
    })
      .then((response) => {
        dispatch({
          type: "GET_VERSION_PRODUCT",
          selected: response?.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const add = (data) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.CREATE_VERSION_PRODUCT.method,
      path: api.CREATE_VERSION_PRODUCT.path,
      data
    })
      .then((response) => {
        dispatch({
          type: "ADD_VERSION_PRODUCT",
          response,
        });
      })

      .catch(err =>  dispatch({
        type: 'ADD_VERSION_PRODUCT',
        err
      }))
  };
};
export const update = (data) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_VERSION.method,
      path: api.UPDATE_VERSION.path,
      data,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_VERSION_PRODUCT",
          response,
        });
      })

      .catch(err =>  dispatch({
        type: 'UPDATE_VERSION_PRODUCT',
        err
      }))
  };
};
export const remove= (staff) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.DELETE_VERSION.method,
      path: api.DELETE_VERSION.path,
      data: staff,
    })
      .then((response) => {
        dispatch({
          type: "DELETE_VERSION_PRODUCT",
          response,
        });
      })
      .catch((err) => console.log(err));
  };
};
