import axios from "axios";
import { useHistory } from "react-router-dom";
import api from "../../../../../constants/api";
import Service from "../../../../../services/request";
// ** Get all Data
export const getAllData = () => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_STAFF.method,
      path: api.LIST_STAFF.path,
      data: {
        order: {
          key: "createdAt",
          value: "desc",
        },
      },
    }).then((response) => {
      dispatch({
        type: "GET_ALL_DATA",
        data: response.data,
      });
    });
  };
};

// ** Get data on page or row change
export const getData = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_STAFF.method,
      path: api.LIST_STAFF.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

// ** Get User
export const getStaff = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_STAFF.method,
      path: api.GET_STAFF.path,
      data: { id },
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

// ** Add new user
export const addStaff = (staff) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.CREATE_STAFF.method,
      path: api.CREATE_STAFF.path,
      data: staff,
    })
      .then((response) => {
        dispatch({
          type: "ADD_STAFF",
          response,
        });
      })

      .catch((err) => console.log(err));
  };
};
export const updateStaff = (staff) => {
  return async (dispatch, getState) => {
    await Service.send({
      method: api.UPDATE_STAFF.method,
      path: api.UPDATE_STAFF.path,
      data: staff,
    })
      .then((response) => {
        dispatch({
          type: "UPDATE_STAFF",
          response,
        });
      })

      .catch((err) => console.log(err));
  };
};
// export const changePassword = staff => {
//   return async (dispatch, getState) => {
//      await Service.send({
//       method: api.CHANGE_PASSWORD_STAFF.method, path: api.CHANGE_PASSWORD_STAFF.path, data:staff
//     }).then(response => {
//         dispatch({
//           type: 'CHANGE_PASSWORD',
//           response
//         })
//       })

//       .catch(err => console.log(err))
//   }
// }

// ** Delete user
// export const deleteStaff = id => {
//   return (dispatch, getState) => {
//     await Service.send({
//       method: api.CREATE_STAFF.method, path: api.CREATE_STAFF.path, data:staff
//     }).then(response => {
//         dispatch({
//           type: 'DELETE_STAFF'
//         })
//       })
//   }
// }
