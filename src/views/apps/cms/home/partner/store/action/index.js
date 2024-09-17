import api from "../../../../../../../constants/api";
import Service from "../../../../../../../services/request";
export const getData = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_PARTNER.method,
      path: api.LIST_PARTNER.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_PARTNER",
        data: response?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};
export const getById = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_PARTNER.method,
      path: api.GET_PARTNER.path,
      query: params,
    })
      .then((response) => {
        dispatch({
          type: "GET_PARTNER",
          selected: response?.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const add = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.CREATE_PARTNER.method,
      path: api.CREATE_PARTNER.path,
      data,
    })
      .then((response) => {
        dispatch({
          type: "ADD_PARTNER",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "ADD_PARTNER",
          err,
        })
      );
  };
};
export const update = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.UPDATE_PARTNER.method,
      path: api.UPDATE_PARTNER.path,
      data,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_PARTNER",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "UPDATE_PARTNER",
          err,
        })
      );
  };
};
export const remove = (params) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.DELETE_PARTNER.method,
      path: api.DELETE_PARTNER.path,
      query: params,
    })
      .then((response) => {
        dispatch({
          type: "DELETE_PARTNER",
          response,
        });
      })
      .catch((err) => console.log(err));
  };
};
