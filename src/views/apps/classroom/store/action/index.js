import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getDataClassroom = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_CLASSROOM.method,
      path: api.LIST_CLASSROOM.path,
      data: params,
      method: "POST",
    }).then((response) => {
      dispatch({
        type: "GET_DATA_CLASSROOM",
        data: response?.data,
        params,
      });
    });
  };
};

export const addClassroom = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.CREATE_CLASSROOM.method,
      path: api.CREATE_CLASSROOM.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "ADD_CLASSROOM",
        data: response,
      });
    });
  };
};
export const getByClassroomId = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_CLASSROOM_DETAIL.method,
      path: api.GET_CLASSROOM_DETAIL.path,
      query: { id },
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "GET_DETAIL_CLASSROOM",
          data: response?.data,
        });
      }
    });
  };
};
export const updateClassroom = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.UPDATE_CLASSROOM.method,
      path: api.UPDATE_CLASSROOM.path,
      data: data,
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "UPDATE_CLASSROOM",
          data: response?.statusCode,
        });
      }
    });
  };
};
