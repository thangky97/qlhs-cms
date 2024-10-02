import api from "../../../../../../constants/api";
import Service from "../../../../../../services/request";

export const getData = (params) => {
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

export const getById = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_TERM.method,
      path: api.GET_TERM.path,
      query: data,
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

export const add = (staff) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.CREATE_PRODUCT_TERM.method,
      path: api.CREATE_PRODUCT_TERM.path,
      data: staff,
    })
      .then((response) => {
        dispatch({
          type: "ADD_TERM_PRODUCT",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "ADD_TERM_PRODUCT",
          err,
        })
      );
  };
};
export const update = (staff) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_PRODUCT_TERM.method,
      path: api.UPDATE_PRODUCT_TERM.path,
      data: staff,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_TERM_PRODUCT",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "UPDATE_TERM_PRODUCT",
          err,
        })
      );
  };
};
export const remove = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.DELETE_PRODUCT_TERM.method,
      path: api.DELETE_PRODUCT_TERM.path,
      query: id,
    })
      .then((response) => {
        dispatch({
          type: "DELETE_TERM_PRODUCT",
          response,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const getDetail = (data) => {
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

//Instractors
export const getInstractors = (params) => {
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

//subject
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
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};
export const getDetailCourse = (courseId) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_COURSE_DETAIL.method,
      path: api.GET_COURSE_DETAIL.path,
      query: { id: courseId },
    })
      .then((response) => {
        dispatch({
          type: "GET_DETAIL_COURSE",
          selected: response?.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

//học sinh
export const getUser = (params) => {
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
