import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getData = (params, type) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_USER.method,
      path: api.LIST_USER.path,
      data: {
        ...params,
      },
    }).then((response) => {
      if (type === 1 || type === 0) {
        let dataUser = [];
        const data = response?.data?.data;
        if (data?.length > 0) {
          if (type === 0) {
            for (let i = 0; i < data.length; i++) {
              if (
                data[i]?.user_products &&
                data[i]?.user_products?.length > 0
              ) {
                dataUser.push(data[i]);
              }
            }
          } else if (type === 1) {
            for (let i = 0; i < data.length; i++) {
              if (
                data[i]?.user_products &&
                data[i]?.user_products?.length <= 0
              ) {
                dataUser.push(data[i]);
              }
            }
          }
        }

        dispatch({
          type: "GET_DATA_USER",
          data: dataUser,
          totalPages: response?.data?.total,
          params,
        });
      } else {
        dispatch({
          type: "GET_DATA_USER",
          data: response?.data?.data,
          totalPages: response?.data?.total,
          params,
        });
      }
    });
  };
};

export const getDataType = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_USER.method,
      path: api.LIST_USER.path,
      data: params,
    }).then((response) => {
      let dataUser = [];
      const data = response?.data?.data;
      if (data?.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i]?.user_products && data[i]?.user_products?.length > 0) {
            dataUser.push(data[i]);
          }
        }
      }

      dispatch({
        type: "GET_DATA_USER",
        data: dataUser,
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
      method: api.GET_USER.method,
      path: api.GET_USER.path,
      query: { id },
    })
      .then((response) => {
        dispatch({
          type: "GET_USER",
          selected: response?.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const addUser = (User) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.CREATE_USER.method,
      path: api.CREATE_USER.path,
      data: User,
    })
      .then((response) => {
        dispatch({
          type: "ADD_USER",
          response,
        });
      })
      .catch((err) =>
        dispatch({
          type: "ADD_USER",
          err,
        })
      );
  };
};
export const updateUser = (User) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_USER.method,
      path: api.UPDATE_USER.path,
      data: User,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_USER",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "UPDATE_USER",
          err,
        })
      );
  };
};

export const updatePasswordUser = (User) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_PASSWORD_USER.method,
      path: api.UPDATE_PASSWORD_USER.path,
      data: User,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_PASSWORD_USER",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "UPDATE_PASSWORD_USER",
          err,
        })
      );
  };
};

export const getDataByProductId = (params, productId, lang) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_USER.method,
      path: api.LIST_USER.path,
      data: params,
    }).then((response) => {
      if (response?.data?.data?.length > 0) {
        const dataUserByProductId = [];
        const promiseData = response?.data?.data?.map(async (res) => {
          await Service.send({
            method: api.LIST_USER_PRODUCT.method,
            path: api.LIST_USER_PRODUCT.path,
            query: { id: res?.id },
            data: { lang: lang },
          }).then((resUserProduct) => {
            if (
              resUserProduct?.statusCode === 200 &&
              resUserProduct?.data.length > 0
            ) {
              for (let i = 0; i < resUserProduct?.data.length; i++) {
                if (
                  resUserProduct?.data[i]?.product_id === productId &&
                  resUserProduct?.data[i]?.product_type === 0
                ) {
                  dataUserByProductId.push({
                    ...res,
                    productTransaction: resUserProduct?.data?.find(
                      (item) =>
                        item?.product_id === productId &&
                        item?.product_type === 0
                    ),
                  });
                  break;
                }
              }
            }
          });
        });
        Promise.all(promiseData)
          .then(() => {
            dispatch({
              type: "GET_DATA_USER_BY_PRODUCTID",
              data: dataUserByProductId,
              totalPages: dataUserByProductId?.length || 0,
            });
          })
          .catch(() => {});
      }
    });
  };
};
