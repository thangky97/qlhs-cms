import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getDataTrainingProgram = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_TRAINING_PROGRAM.method,
      path: api.LIST_TRAINING_PROGRAM.path,
      data: params,
      method: "POST",
    }).then((response) => {
      dispatch({
        type: "GET_DATA_TRAINING_PROGRAM",
        data: response?.data,
        params,
      });
    });
  };
};

export const addTrainingProgram = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.CREATE_TRAINING_PROGRAM.method,
      path: api.CREATE_TRAINING_PROGRAM.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "ADD_TRAINING_PROGRAM",
        data: response,
      });
    });
  };
};
export const getByTrainingProgramId = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_TRAINING_PROGRAM_DETAIL.method,
      path: api.GET_TRAINING_PROGRAM_DETAIL.path,
      query: { id },
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "GET_DETAIL_TRAINING_PROGRAM",
          data: response?.data,
        });
      }
    });
  };
};
export const updateTrainingProgram = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.UPDATE_TRAINING_PROGRAM.method,
      path: api.UPDATE_TRAINING_PROGRAM.path,
      data: data,
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "UPDATE_TRAINING_PROGRAM",
          data: response?.statusCode,
        });
      }
    });
  };
};
