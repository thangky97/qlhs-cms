import api from "../../../../../constants/api";
import Service from "../../../../../services/request";
export const getData = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_TRANSACTION_TOKEN_OF_USER.method,
      path: api.LIST_TRANSACTION_TOKEN_OF_USER.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_TRANSACTION_TOKEN",
        data: response?.data,
        params,
      });
    });
  };
};

export const getDataExport = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_TRANSACTION_OF_USER.method,
      path: api.LIST_TRANSACTION_OF_USER.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_EXPORT_USER",
        data: response?.data,
        params,
      });
    });
  };
};

export const getListTransaction = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_TRANSACTION_OF_USER.method,
      path: api.LIST_TRANSACTION_OF_USER.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_LIST_TRANSACTION",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};
export const getById = (id, params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_TRANSACTION_CLOUD_DETAIL.method,
      path: api.GET_TRANSACTION_CLOUD_DETAIL.path,
      query: { id },
      data: params,
    }).then((response) => {
      // const dataPayment = response?.data || [];

      dispatch({
        type: "GET_TRANSACTION_TOKEN",
        data: response?.data,
        params,
      });

      // if (response?.data?.length > 0) {
      //   dataPayment.forEach((item, index) => {
      //     Service.send({
      //       method: api.GET_PRODUCT.method,
      //       path: api.GET_PRODUCT.path,
      //       query: {
      //         id: item?.product_id,
      //         lang: item?.lang,
      //       },
      //     }).then((responseProduct) => {
      //       dataPayment[index] = {
      //         ...item,
      //         img_product: responseProduct?.data?.image || "",
      //         product_name: responseProduct?.data?.product_names[0]?.name || "",
      //         price:
      //           responseProduct?.data?.product_prices.find(
      //             (item) => item?.lang === item?.lang
      //           )?.price || 0,
      //         discount:
      //           responseProduct?.data?.product_price_discounts[0]?.discount ||
      //           0,
      //         vat: responseProduct?.data?.vat || 0,
      //       };

      //       if (dataPayment?.length === index + 1) {
      //         dispatch({
      //           type: "GET_TRANSACTION",
      //           data: dataPayment,
      //           params,
      //         });
      //       }
      //     });
      //   });
      // }
      // else {
      //   dispatch({
      //     type: "GET_TRANSACTION",
      //     data: dataPayment,
      //     params,
      //   });
      // }
    });
  };
};

export const updateStaff = (staff) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_TRANSACTION_OF_USER.method,
      path: api.UPDATE_TRANSACTION_OF_USER.path,
      data: staff,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_TRANSACTION",
          response,
        });
      })
      .catch((err) => console.log(err));
  };
};
