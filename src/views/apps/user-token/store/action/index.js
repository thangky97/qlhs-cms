import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getData = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_USER_TOKENS.method,
      path: api.LIST_USER_TOKENS.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_USER_TOKEN",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

export const getDataExport = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_USER.method,
      path: api.LIST_USER.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_EXPORT_USER",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_TOKEN_DETAIL.method,
      path: api.GET_TOKEN_DETAIL.path,
      query: { id },
    })
      .then((response) => {
        dispatch({
          type: "GET_USER_TOKEN_DETAIL",
          selected: response?.data,
        });
      })
      .catch((err) => console.log(err));
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
export const updateUser = (User) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_USER_TOKEN.method,
      path: api.UPDATE_USER_TOKEN.path,
      data: User,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_USER_TOKEN",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "UPDATE_USER_TOKEN",
          err,
        })
      );
  };
};

export const getProduct = (params) => {
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

export const getListUser = (params) => {
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

export const deleteUserToken = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.DELETE_USER_TOKENS.method,
      path: api.DELETE_USER_TOKENS.path,
      query: id,
    }).then((response) => {
      dispatch({
        type: "DELETE_USER_TOKEN",
        response,
      });
    });
  };
};
