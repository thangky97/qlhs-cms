import api from "../../../../../constants/api";
import Service from "../../../../../services/request";
export const getData = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_STAFF.method,
      path: api.LIST_STAFF.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_STAFF",
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
      method: api.LIST_STAFF.method,
      path: api.LIST_STAFF.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_EXPORT_STAFF",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

export const getById = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_STAFF.method,
      path: api.GET_STAFF.path,
      query: { id },
    })
      .then((response) => {
        dispatch({
          type: "GET_STAFF",
          selected: response?.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const add = (data) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.CREATE_STAFF.method,
      path: api.CREATE_STAFF.path,
      data,
    })
      .then((response) => {
        dispatch({
          type: "ADD_STAFF",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "ADD_STAFF",
          err,
        })
      );
  };
};
export const update = (data) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_STAFF.method,
      path: api.UPDATE_STAFF.path,
      data,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_STAFF",
          response,
        });
      })
      .catch((err) =>
        dispatch({
          type: "UPDATE_STAFF",
          err,
        })
      );
  };
};

//nghành
export const getDataDepartment = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_DEPARTMENT.method,
      path: api.LIST_DEPARTMENT.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_DEPARTMENT",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

//lớp học - term
export const getDataCurriulumSection = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_PRODUCT_TERM.method,
      path: api.LIST_PRODUCT_TERM.path,
      data: params,
      method: "POST",
    }).then((response) => {
      dispatch({
        type: "GET_DATA_TERM_PRODUCT",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};
