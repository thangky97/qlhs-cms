import api from "../../../../../constants/api";
import Service from "../../../../../services/request";
export const getData = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_INSTRUCTORS.method,
      path: api.LIST_INSTRUCTORS.path,
      data: params,
      method: "POSt",
    }).then((response) => {
      dispatch({
        type: "GET_DATA_INSTRUCTORS",
        data: response?.data,
        params,
      });
    });
  };
};

export const getDataExport = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_INSTRUCTORS.method,
      path: api.LIST_INSTRUCTORS.path,
      data: params,
      method: "POSt",
    }).then((response) => {
      dispatch({
        type: "GET_DATA_EXPORT_INSTRUCTORS",
        data: response?.data,
        params,
      });
    });
  };
};

export const getDataUser = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_USER.method,
      path: api.LIST_USER.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_USER",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

export const add = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.CREATE_INSTRUCTORS.method,
      path: api.CREATE_INSTRUCTORS.path,
      data: params,
    }).then((response) => {
      console.log(response);
      dispatch({
        type: "ADD_INSTRUCTORS",
        data: response,
      });
    });
  };
};
export const getById = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_INSTRUCTORS_DETAIL.method,
      path: api.GET_INSTRUCTORS_DETAIL.path,
      query: { id },
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "GET_DETTAL_INSTRUCTORS",
          data: response?.data,
        });
      }
    });
  };
};
export const update = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.UPDATE_INSTRUCTORS.method,
      path: api.UPDATE_INSTRUCTORS.path,
      data: data,
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "UPDATE_INSTRUCTORS",
          data: response?.statusCode,
        });
      }
    });
  };
};
