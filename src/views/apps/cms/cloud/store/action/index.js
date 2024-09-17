import api from "../../../../../../constants/api";
import Service from "../../../../../../services/request";
export const getData = (params) => {
  return async (dispatch) => {
    return await Service.send({
      method: api.CMS_SETTING.method,
      path: api.CMS_SETTING.path,
    }).then((response) => {
      return dispatch({
        type: "GET_SETTING",
        data: response?.data,
      });
    });
  };
};
export const getById = (params) => {
  return async (dispatch) => {
    return await Service.send({
      method: api.CMS_SETTING.method,
      path: api.CMS_SETTING.path,
    }).then((response) => {
      return dispatch({
        type: "GET_SETTING_BY_ID",
        data: response?.data,
      });
    });
  };
};
export const addStaff = (staff) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.CMS_SETTING_ADD.method,
      path: api.CMS_SETTING_ADD.path,
      data: staff,
    })
      .then((response) => {
        dispatch({
          type: "ADD_SETTING",
          response,
        });
      })

      .catch((err) => console.log(err));
  };
};

export const update = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.CMS_SETTING_ADD.method,
      path: api.CMS_SETTING_ADD.path,
      data,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_SETTING",
          response,
        });
      })
      .catch((err) => console.log(err));
  };
};
