import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getDataRollCall = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_ROLL_CALL.method,
      path: api.LIST_ROLL_CALL.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_ROLL_CALL",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

export const getByIdRollCall = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_ROLL_CALL.method,
      path: api.GET_ROLL_CALL.path,
      query: data,
    })
      .then((response) => {
        dispatch({
          type: "GET_ROLL_CALL",
          selected: response?.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateRollCall = (staff) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_ROLL_CALL.method,
      path: api.UPDATE_ROLL_CALL.path,
      data: staff,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_ROLL_CALL",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "UPDATE_ROLL_CALL",
          err,
        })
      );
  };
};

export const getDataImport = (data = {}) => {
  return async (dispatch) => {
    await Service.send({
      method: api.IMPORT.method,
      path: api.IMPORT.path,
      data: data,
    })
      .then((response) => {
        dispatch({
          type: "IMPORT",
          response,
        });
      })
      .catch((err) =>
        dispatch({
          type: "IMPORT",
          err,
        })
      );
  };
};

export const getDataExport = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_ROLL_CALL.method,
      path: api.LIST_ROLL_CALL.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_EXPORT_ROLL_CALL",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};
