import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getDataCourse = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_COURSE.method,
      path: api.LIST_COURSE.path,
      data: params,
      method: "POST",
    }).then((response) => {
      dispatch({
        type: "GET_DATA_COURSE",
        data: response?.data,
        params,
      });
    });
  };
};

export const addCourse = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.CREATE_COURSE.method,
      path: api.CREATE_COURSE.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "ADD_COURSE",
        data: response,
      });
    });
  };
};
export const getByCourseId = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_COURSE_DETAIL.method,
      path: api.GET_COURSE_DETAIL.path,
      query: { id },
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "GET_DETAIL_COURSE",
          data: response?.data,
        });
      }
    });
  };
};
export const updateCourse = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.UPDATE_COURSE.method,
      path: api.UPDATE_COURSE.path,
      data: data,
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "UPDATE_COURSE",
          data: response?.statusCode,
        });
      }
    });
  };
};
