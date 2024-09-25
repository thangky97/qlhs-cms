import api from "../../../../../constants/api";
import Service from "../../../../../services/request";

export const getDataTimetable = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_TIMETABLE.method,
      path: api.LIST_TIMETABLE.path,
      data: params,
      method: "POST",
    }).then((response) => {
      dispatch({
        type: "GET_DATA_TIMETABLE",
        data: response?.data,
        params,
      });
    });
  };
};

export const addTimetable = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.CREATE_TIMETABLE.method,
      path: api.CREATE_TIMETABLE.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "ADD_TIMETABLE",
        data: response,
      });
    });
  };
};
export const getByTimetableId = (id) => {
  return async (dispatch) => {
    await Service.send({
      method: api.GET_TIMETABLE_DETAIL.method,
      path: api.GET_TIMETABLE_DETAIL.path,
      query: { id },
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "GET_DETAIL_TIMETABLE",
          data: response?.data,
        });
      }
    });
  };
};
export const updateTimetable = (data) => {
  return async (dispatch) => {
    await Service.send({
      method: api.UPDATE_TIMETABLE.method,
      path: api.UPDATE_TIMETABLE.path,
      data: data,
    }).then((response) => {
      if (response?.statusCode === 200) {
        dispatch({
          type: "UPDATE_TIMETABLE",
          data: response?.statusCode,
        });
      }
    });
  };
};

//môn hoc
export const getDataCourse = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_COURSE.method,
      path: api.LIST_COURSE.path,
      data: params,
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

//giảng viên
export const getDataStaff = (params) => {
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

//Lớp học
export const getDataClassroom = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_CLASSROOM.method,
      path: api.LIST_CLASSROOM.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_CLASSROOM",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

//kì hoc
export const getDataSemester = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_SEMESTER.method,
      path: api.LIST_SEMESTER.path,
      data: params,
    }).then((response) => {
      dispatch({
        type: "GET_DATA_SEMESTER",
        data: response?.data?.data,
        totalPages: response?.data?.total,
        params,
      });
    });
  };
};

//lớp hoc
export const getDataTerm = (params) => {
  return async (dispatch) => {
    await Service.send({
      method: api.LIST_PRODUCT_TERM.method,
      path: api.LIST_PRODUCT_TERM.path,
      data: params,
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
