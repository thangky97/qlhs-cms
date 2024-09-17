import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getData = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_USER_TOKEN_DETAIL.method,
      path: api.GET_USER_TOKEN_DETAIL.path,
      query: { id },
    }).then((response) => {
      dispatch({
        type: "GET_DATA_USER_TOKEN_DETAIL",
        data: response?.data?.data,
        totalPages: response?.data?.total,
      });
    });
  };
};

export const addUser = (User) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.CREATE_USER_TOKEN.method,
      path: api.CREATE_USER_TOKEN.path,
      data: User,
    })
      .then((response) => {
        dispatch({
          type: "ADD_USER_TOKEN",
          response,
        });
      })
      .catch((err) =>
        dispatch({
          type: "ADD_USER_TOKEN",
          err,
        })
      );
  };
};
export const updateUserTokenDetail = (User) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_USER_TOKEN_DETAIL.method,
      path: api.UPDATE_USER_TOKEN_DETAIL.path,
      data: User,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_USER_TOKEN_DETAIL",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "UPDATE_USER_TOKEN_DETAIL",
          err,
        })
      );
  };
};

export const deleteUserTokenDetail = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.DELETE_USER_TOKEN_DETAIL.method,
      path: api.DELETE_USER_TOKEN_DETAIL.path,
      query: id,
    }).then((response) => {
      dispatch({
        type: "DELETE_USER_TOKEN_DETAIL",
        response,
      });
    });
  };
};

export const getUserTokenDetailById = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_USER_TOKEN_DETAIL_BY_ID.method,
      path: api.GET_USER_TOKEN_DETAIL_BY_ID.path,
      query: { id },
    })
      .then((response) => {
        dispatch({
          type: "GET_USER_TOKEN_DETAIL_BY_ID",
          selected: response?.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
