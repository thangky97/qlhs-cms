import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getDataSemester = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_SEMESTER.method,
      path: api.LIST_SEMESTER.path,
      data: params,
      method: "POST",
    }).then((response) => {
      dispatch({
        type: "GET_DATA_SEMESTER",
        data: response?.data,
        params,
      });
    });
  };
};

export const addSemester = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.CREATE_SEMESTER.method,
      path: api.CREATE_SEMESTER.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "ADD_SEMESTER",
        data: response,
      });
    });
  };
};
export const getBySemesterId = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_SEMESTER_DETAIL.method,
      path: api.GET_SEMESTER_DETAIL.path,
      query: { id },
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "GET_DETAIL_SEMESTER",
          data: response?.data,
        });
      }
    });
  };
};
export const updateSemester = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.UPDATE_SEMESTER.method,
      path: api.UPDATE_SEMESTER.path,
      data: data,
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "UPDATE_SEMESTER",
          data: response?.statusCode,
        });
      }
    });
  };
};

//nam hoc
export const getDataCourse = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_PRODUCT.method,
      path: api.LIST_PRODUCT.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_PRODUCT",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};
