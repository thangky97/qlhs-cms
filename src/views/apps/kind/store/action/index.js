import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getData = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_KIND.method,
      path: api.LIST_KIND.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_KIND",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

export const getKind = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_KIND.method,
      path: api.GET_KIND.path,
      query: { id },
    })
      .then((response) => {
        dispatch({
          type: "GET_KIND",
          selected: response?.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const addKind = (Kind) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.CREATE_KIND.method,
      path: api.CREATE_KIND.path,
      data: Kind,
    })
      .then((response) => {
        dispatch({
          type: "ADD_KIND",
          response,
        });
      })
      .catch((err) =>
        dispatch({
          type: "ADD_KIND",
          err,
        })
      );
  };
};
export const updateKind = (Kind) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_KIND.method,
      path: api.UPDATE_KIND.path,
      data: Kind,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_KIND",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "UPDATE_KIND",
          err,
        })
      );
  };
};


