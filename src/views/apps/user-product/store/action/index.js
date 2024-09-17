import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getData = (id, params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_USER_PRODUCT.method,
      path: api.LIST_USER_PRODUCT.path,
      query: { id },
      data: params,
    }).then((response) => {
      const dataProduct = response?.data || [];
      if (response?.data?.length > 0) {
        dataProduct?.forEach(async (item, index) => {
          await Service.send({
            method: api.GET_PRODUCT.method,
            path: api.GET_PRODUCT.path,
            query: {
              id: item?.product_id,
              lang: item?.lang,
            },
          }).then((responseProduct) => {
            dataProduct[index] = {
              ...item,
              img_product: responseProduct?.data?.image || "",
              product_name: responseProduct?.data?.product_names[0]?.name || "",
              price:
                responseProduct?.data?.product_prices.find(
                  (item) => item?.lang === item?.lang
                )?.price || 0,
              discount:
                responseProduct?.data?.product_price_discounts[0]?.discount ||
                0,
              vat: responseProduct?.data?.vat || 0,
            };
            if (dataProduct?.length === index + 1) {
              dispatch({
                type: "GET_DATA_USER_PRODUCT",
                data: dataProduct || [],
                totalPages: dataProduct?.length || 0,
                params,
              });
            }
          });
        });
      } else {
        dispatch({
          type: "GET_DATA_USER_PRODUCT",
          data: dataProduct || [],
          totalPages: dataProduct?.length || 0,
          params,
        });
      }
    });
  };
};
export const getUser = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_USER_PRODUCT.method,
      path: api.GET_USER_PRODUCT.path,
      data: { id },
    })
      .then((response) => {
        dispatch({
          type: "GET_USER_PRODUCT",
          selected: response?.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateUser = (User) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_USER_PRODUCT.method,
      path: api.UPDATE_USER_PRODUCT.path,
      data: User,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_USER_PRODUCT",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "UPDATE_USER_PRODUCT",
          err,
        })
      );
  };
};
