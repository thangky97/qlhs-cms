import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getData = (params) => {
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

export const getById = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_PRODUCT.method,
      path: api.GET_PRODUCT.path,
      query: data,
    })
      .then((response) => {
        dispatch({
          type: "GET_PRODUCT",
          selected: response?.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const add = (staff) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.CREATE_PRODUCT.method,
      path: api.CREATE_PRODUCT.path,
      data: staff,
    })
      .then((response) => {
        dispatch({
          type: "ADD_PRODUCT",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "ADD_PRODUCT",
          err,
        })
      );
  };
};
export const update = (data) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_PRODUCT.method,
      path: api.UPDATE_PRODUCT.path,
      data,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_PRODUCT",
          response,
        });
      })
      .catch((err) =>
        dispatch({
          type: "UPDATE_PRODUCT",
          err,
        })
      );
  };
};
export const remove = (data) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.DELETE_PRODUCT.method,
      path: api.DELETE_PRODUCT.path,
      data,
    })
      .then((response) => {
        dispatch({
          type: "DELETE_PRODUCT",
          response,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getInstractors = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_INSTRACTORS.method,
      path: api.LIST_INSTRACTORS.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_INSTRACTORS",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

export const getTerm = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_PRODUCT_TERM.method,
      path: api.LIST_PRODUCT_TERM.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_TERM_PRODUCT",
        data: response?.data,
        params,
      });
    });
  };
};
export const getTermId = (termId) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_TERM.method,
      path: api.GET_TERM.path,
      query: { id: termId },
    })
      .then((response) => {
        dispatch({
          type: "GET_TERM_PRODUCT",
          selected: response?.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
