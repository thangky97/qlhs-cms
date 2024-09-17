import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

// export const getData = (params) => {
//   return async (dispatch) => {
//     await Service.send({
//       method: api.LIST_NOTIFICATION.method,
//       path: api.LIST_NOTIFICATION.path,
//       data: params,
//     }).then((response) => {
//       const dataUser = [];
//       if (response?.data?.data?.length > 0) {
//         const promiseUser = response?.data?.data.map(async (item, index) => {
//           if (item?.selecteduerids) {
//             await Service.send({
//               method: api.LIST_USER.method,
//               path: api.LIST_USER.path,
//               query: { id: item?.selecteduerids },
//             }).then((resUser) => {
//               dataUser[index] = {
//                 ...item,
//                 user: resUser?.data,
//               };
//             });
//           } else {
//             dataUser[index] = {
//               ...item,
//               user: {},
//             };
//           }
//         });
//         Promise.all(promiseUser).then(() => {
//           dispatch({
//             type: "GET_DATA_NOTIFICATION",
//             data: dataUser,
//             totalPages: response?.data?.total,
//             params,
//           });
//         });
//       }
//       dispatch({
//         type: "GET_DATA_NOTIFICATION",
//         data: response?.data?.data,
//         totalPages: response?.data?.total,
//         params,
//       });
//     });
//   };
// };

export const getData = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_NOTIFICATION.method,
      path: api.LIST_NOTIFICATION.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_NOTIFICATION",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

export const remove = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.DELETE_NOTIFICATION.method,
      path: api.DELETE_NOTIFICATION.path,
      query: id,
    })
      .then((response) => {
        dispatch({
          type: "DELETE_NOTIFICATION",
          response,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getDataExport = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_NOTIFICATION.method,
      path: api.LIST_NOTIFICATION.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_EXPORT_NOTIFICATION",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

export const getDataUser = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_USER_PRODUCTS.method,
      path: api.LIST_USER_PRODUCTS.path,
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

export const getNotification = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_NOTIFICATION.method,
      path: api.GET_NOTIFICATION.path,
      query: { id },
    })
      .then((response) => {
        dispatch({
          type: "GET_NOTIFICATION",
          selected: response?.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getUserId = (id) => {
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

export const addNotification = (user, Notification) => {
  return async (dispatch, getState) => {
    if (user?.length > 0) {
      const promiseNotification = user.map(async (element) => {
        await Service.send({
          method: api.CREATE_NOTIFICATION.method,
          path: api.CREATE_NOTIFICATION.path,
          data: {
            ...Notification,
            usersId: element,
          },
        });
      });
      Promise.all(promiseNotification)
        .then((response) => {
          dispatch({
            type: "ADD_NOTIFICATION",
            response: {
              statusCode: 200,
            },
          });
        })
        .catch((err) =>
          dispatch({
            type: "ADD_NOTIFICATION",
            response: {
              statusCode: 400,
            },
            err,
          })
        );
    }
  };
};

export const updateNotification = (Notification) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_NOTIFICATION.method,
      path: api.UPDATE_NOTIFICATION.path,
      data: Notification,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_NOTIFICATION",
          response,
        });
      })

      .catch((err) =>
        dispatch({
          type: "UPDATE_NOTIFICATION",
          err,
        })
      );
  };
};
