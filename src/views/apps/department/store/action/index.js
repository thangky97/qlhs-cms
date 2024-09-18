import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getDataDepartment = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_DEPARTMENT.method,
      path: api.LIST_DEPARTMENT.path,
      data: params,
      method: "POST",
    }).then((response) => {
      dispatch({
        type: "GET_DATA_DEPARTMENT",
        data: response?.data,
        params,
      });
    });
  };
};

export const addDepartment = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.CREATE_DEPARTMENT.method,
      path: api.CREATE_DEPARTMENT.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "ADD_DEPARTMENT",
        data: response,
      });
    });
  };
};
export const getByDepartmentId = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_DEPARTMENT_DETAIL.method,
      path: api.GET_DEPARTMENT_DETAIL.path,
      query: { id },
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "GET_DETAIL_DEPARTMENT",
          data: response?.data,
        });
      }
    });
  };
};
export const updateDepartment = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.UPDATE_DEPARTMENT.method,
      path: api.UPDATE_DEPARTMENT.path,
      data: data,
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "UPDATE_DEPARTMENT",
          data: response?.statusCode,
        });
      }
    });
  };
};

export const getDataUser = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_STAFF.method,
      path: api.LIST_STAFF.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_STAFF",
        data: response?.data,
        totalPages: response?.total,
        params,
      });
    });
  };
};
