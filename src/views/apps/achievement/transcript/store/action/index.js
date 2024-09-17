import api from "@constants/api";
import Service from "@services/request";

export const getData = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.TRANSCRIPT_LIST.method,
      path: api.TRANSCRIPT_LIST.path,
      data: params,
    }).then((response) => {
      if (response?.data?.data?.length > 0) {
        dispatch({
          type: "GET_DATA_TRANSCRIPT",
          data: response?.data?.data || [],
          totalPages: response?.data?.total,
          params,
        });
      } else {
        dispatch({
          type: "GET_DATA_TRANSCRIPT",
          data: response?.data || [],
          totalPages: response?.data?.total,
          params,
        });
      }
    });
  };
};

export const getDataUserProduct = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_SCORES.method,
      path: api.GET_SCORES.path,
      query: {
        id: params?.productId,
        lang: params?.lang,
        usersId: params?.usersId,
      },
    }).then((response) => {
      if (response?.statusCode === 200) {
        console.log(response?.data);
        dispatch({
          type: "GET_DATA_USER_PRODUCT",
          data: response?.data || [],
          params,
        });
      }
    });
  };
};

export const resetDataUserProduct = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_DATA_USER_PRODUCT",
    });
  };
};

export const getDataExport = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.TRANSCRIPT_LIST.method,
      path: api.TRANSCRIPT_LIST.path,
      data: params,
    }).then((response) => {
      if (response) {
        dispatch({
          type: "GET_DATA_EXPORT_TRANSCRIPT",
          data: response?.data?.data || [],
          totalPages: response?.data?.total,
          params,
        });
      } else {
      }
    });
  };
};

export const getKind = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_TRANSCRIPT.method,
      path: api.GET_TRANSCRIPT.path,
      query: { id },
    })
      .then((response) => {
        dispatch({
          type: "GET_TRANSCRIPT",
          selected: response?.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const addKind = (Kind) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.CREATE_KIND.method,
      path: api.CREATE_KIND.path,
      data: Kind,
    })
      .then((response) => {
        dispatch({
          type: "ADD_TRANSCRIPT",
          response,
        });
      })
      .catch((err) =>
        dispatch({
          type: "ADD_TRANSCRIPT",
          err,
        })
      );
  };
};
export const updateKind = (Kind) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_TRANSCRIPT.method,
      path: api.UPDATE_TRANSCRIPT.path,
      data: Kind,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_TRANSCRIPT",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "UPDATE_TRANSCRIPT",
          err,
        })
      );
  };
};
