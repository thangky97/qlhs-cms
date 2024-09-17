import api from "@constants/api";
import Service from "@services/request";

export const getData = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.TRAINNING_HISTORY.method,
      path: api.TRAINNING_HISTORY.path,
      data: params,
    }).then((response) => {
      if (response?.data?.data?.length > 0) {
        dispatch({
          type: "GET_DATA_TRAINNING_HISTORY",
          data: response?.data?.data || [],
          totalPages: response?.data?.total,
          params,
        });
      } else {
        dispatch({
          type: "GET_DATA_TRAINNING_HISTORY",
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
      method: api.GET_DETAIL_TRAINNING_HISTORY.method,
      path: api.GET_DETAIL_TRAINNING_HISTORY.path,
      query: {
        userId: params?.userId,
        productId: params?.productId,
        // lang: params?.lang,
      },
    }).then((response) => {
      if (response?.statusCode === 200) {
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
      method: api.TRAINNING_HISTORY.method,
      path: api.TRAINNING_HISTORY.path,
      data: params,
    }).then((response) => {
      if (response) {
        dispatch({
          type: "GET_DATA_EXPORT_TRAINNING_HISTORY",
          data: response?.data?.data || [],
          totalPages: response?.data?.total,
          params,
        });
      } else {
        dispatch({
          type: "GET_DATA_EXPORT_TRAINNING_HISTORY",
          data: response?.data || [],
          totalPages: response?.data?.total,
          params,
        });
      }
    });
  };
};


