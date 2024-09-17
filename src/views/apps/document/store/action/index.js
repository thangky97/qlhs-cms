import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getData = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_DOCUMENT.method,
      path: api.LIST_DOCUMENT.path,
      data,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_DOCUMENT",
        data: response?.data?.data,
        totalPages: response?.data?.total,
      });
    });
  };
};

export const getById = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_DOCUMENT.method,
      path: api.GET_DOCUMENT.path,
      data,
    })
      .then((response) => {
        dispatch({
          type: "GET_DOCUMENT",
          selected: response?.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const add = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.CREATE_DOCUMENT.method,
      path: api.CREATE_DOCUMENT.path,
      data,
    })
      .then((response) => {
        dispatch({
          type: "ADD_DOCUMENT",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "ADD_DOCUMENT",
          err,
        })
      );
  };
};
export const update = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.UPDATE_DOCUMENT.method,
      path: api.UPDATE_DOCUMENT.path,
      data,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_DOCUMENT",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "UPDATE_DOCUMENT",
          err,
        })
      );
  };
};
