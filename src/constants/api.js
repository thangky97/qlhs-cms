const api = {
  LOGIN_STAFF: {
    path: "/staff/login",
    method: "POST",
  },
  LIST_STAFF: {
    path: "/staff/get-list",
    method: "POST",
  },
  GET_STAFF: {
    path: "/staff/get-detail",
    method: "GET",
  },
  UPDATE_STAFF: {
    path: "/staff/update",
    method: "POST",
  },

  CHANGE_PASSWORD_STAFF: {
    path: "/staff/change-password",
    method: "POST",
  },
  RESET_PASSWORD_STAFF: {
    path: "/staff/reset-password",
    method: "POST",
  },
  CREATE_STAFF: {
    path: "/staff/insert",
    method: "POST",
  },
  LIST_USER_PRODUCT: {
    path: "/user-product/find",
    method: "POST",
  },
  LIST_USER: {
    path: "/user/staff-get-list-user",
    method: "POST",
  },
  UPDATE_USER: {
    path: "/user/staff-update-user",
    method: "POST",
  },
  UPDATE_PASSWORD_USER: {
    path: "/user/user-update-password",
    method: "POST",
  },
  UPDATE_USER_PRODUCT: {
    path: "/user-product/updateById",
    method: "POST",
  },

  GET_USER: {
    path: "/user/staff-get-detail",
    method: "GET",
  },
  GET_USER_PRODUCT: {
    path: "/user-product/findById",
    method: "POST",
  },
  CREATE_USER: {
    path: "/user/staff-insert-user",
    method: "POST",
  },
  LIST_TRANSACTION_OF_USER: {
    path: "/product/transactions",
    method: "POST",
  },
  LIST_TRANSACTION_TOKEN_OF_USER: {
    path: "/product/transactions-token",
    method: "POST",
  },
  UPDATE_TRANSACTION_OF_USER: {
    path: "/product/transactions",
    method: "PUT",
  },
  GET_DETAIL_TRANSACTION: {
    path: "/product/transaction/detail",
    method: "POST",
  },
  LIST_DOCUMENT: {
    path: "/document/list",
    method: "POST",
  },
  GET_DOCUMENT: {
    path: "/document/detail",
    method: "POST",
  },
  CREATE_DOCUMENT: {
    path: "/document/create",
    method: "POST",
  },
  UPDATE_DOCUMENT: {
    path: "/document/update",
    method: "PUT",
  },
  LIST_ABOUT: {
    path: "/about/list",
    method: "GET",
  },
  GET_ABOUT: {
    path: "/about/detail",
    method: "GET",
  },
  CREATE_ABOUT: {
    path: "/about/add",
    method: "POST",
  },
  UPDATE_ABOUT: {
    path: "/about/update",
    method: "POST",
  },
  DELETE_ABOUT: {
    path: "/about/delete",
    method: "DELETE",
  },
  GET_section: {
    path: "/sections/get-detail",
    method: "GET",
  },
  LIST_PARTNER: {
    path: "/partner/find",
    method: "POST",
  },
  GET_PARTNER: {
    path: "/partner/get-detail",
    method: "GET",
  },
  CREATE_PARTNER: {
    path: "/partner/add",
    method: "POST",
  },
  UPDATE_PARTNER: {
    path: "/partner/update",
    method: "POST",
  },
  DELETE_PARTNER: {
    path: "/partner/delete",
    method: "DELETE",
  },
  SEND_NOTIFICATION: {
    path: "/send/notificate",
    method: "POST",
  },
  LIST_USER_TOKENS: {
    path: "/user/user-token-getlist",
    method: "POST",
  },
  DELETE_USER_TOKENS: {
    path: "/user/usertoken-delete",
    method: "POST",
  },
  LIST_INSTRACTORS: {
    path: "/instructors/get-list",
    method: "POST",
  },
  LIST_NOTIFICATION: {
    path: "/notification/get-list",
    method: "POST",
  },
  GET_NOTIFICATION: {
    path: "/notification/get-detail",
    method: "GET",
  },
  CREATE_NOTIFICATION: {
    path: "/notification/insert",
    method: "POST",
  },
  UPDATE_NOTIFICATION: {
    path: "/notification/update",
    method: "POST",
  },
  LIST_USER_PRODUCTS: {
    path: "/user-product/findAll",
    method: "POST",
  },
  GET_DOCUMENT_COURSE: {
    path: "/course/documents/get-detail",
    method: "GET",
  },
  GET_QUIZ: {
    path: "/quiz/get-detail",
    method: "GET",
  },
  CREATE_DOCUMENT_COURSE: {
    path: "/course/documents/insert",
    method: "POST",
  },
  CREATE_QUIZ: {
    path: "/quiz/insert",
    method: "POST",
  },
  TRANSCRIPT_LIST: {
    path: "/transcript/get-list",
    method: "POST",
  },
  TRAINNING_HISTORY: {
    path: "/user/training/history/get-list",
    method: "POST",
  },
  GET_DETAIL_TRAINNING_HISTORY: {
    path: "/user/training-history-detail",
    method: "GET",
  },
  GET_TRANSCRIPT: {
    path: "/transcript/get-detail",
    method: "GET",
  },
  UPDATE_TRANSCRIPT: {
    path: "/transcript/update",
    method: "POST",
  },
  LIST_KIND: {
    path: "/categories/get-list",
    method: "POST",
  },
  GET_KIND: {
    path: "/categories/get-detail",
    method: "GET",
  },
  CREATE_KIND: {
    path: "/categories/insert",
    method: "POST",
  },
  UPDATE_KIND: {
    path: "/categories/update",
    method: "POST",
  },
  LIST_PRODUCT: {
    path: "/product/find",
    method: "POST",
  },
  LIST_SECTION: {
    path: "/sections/get-list",
    method: "POST",
  },
  GET_PRODUCT: {
    path: "/product/get-detail",
    method: "GET",
  },
  GET_USER_PRODUCT: {
    path: "/product/get-detail-user",
    method: "GET",
  },
  GET_SCORES: {
    path: "/product/get-scores",
    method: "GET",
  },
  CREATE_PRODUCT: {
    path: "/product/insert",
    method: "POST",
  },
  CREATE_VERSION_PRODUCT: {
    path: "/product/create-version",
    method: "POST",
  },
  CREATE_VERSION_DISCOUNT: {
    path: "/product/create-discount",
    method: "POST",
  },

  UPDATE_VERSION_DISCOUNT: {
    path: "/product/update-discount",
    method: "POST",
  },
  DELETE_VERSION_DISCOUNT: {
    path: "/product/delete-discount",
    method: "POST",
  },
  GET_VERSION_DISCOUNT: {
    path: "/product/get-detail-discount",
    method: "GET",
  },

  LIST_VERSION_DISCOUNT: {
    path: "/product/get-list-discount",
    method: "GET",
  },

  LIST_PRODUCT_PRICE: {
    path: "/product/find-price",
    method: "POST",
  },
  GET_PRICE: {
    path: "/product/get-detail-price",
    method: "GET",
  },
  LIST_DOCUMENT_COURSE: {
    path: "/course/documents/get-list",
    method: "POST",
  },
  LIST_QUIZ: {
    path: "/quiz/get-list",
    method: "POST",
  },
  UPDATE_DOCUMENT_COURSE: {
    path: "/course/documents/update",
    method: "POST",
  },
  UPDATE_QUIZ: {
    path: "/quiz/update",
    method: "POST",
  },
  CREATE_PRODUCT_PRICE: {
    path: "/product/insert-price",
    method: "POST",
  },
  UPDATE_PRODUCT_PRICE: {
    path: "/product/update-price",
    method: "POST",
  },
  DELETE_PRODUCT_PRICE: {
    path: "/product/delete-price",
    method: "POST",
  },

  UPDATE_PRODUCT: {
    path: "/product/update",
    method: "POST",
  },
  DELETE_PRODUCT: {
    path: "/product/delete",
    method: "POST",
  },

  LIST_PRODUCT_TERM: {
    path: "/sections/get-list",
    method: "POST",
  },
  GET_TERM: {
    path: "/sections/get-detail",
    method: "GET",
  },
  CREATE_PRODUCT_TERM: {
    path: "/sections/insert",
    method: "POST",
  },

  UPDATE_PRODUCT_TERM: {
    path: "/sections/update",
    method: "POST",
  },
  DELETE_PRODUCT_TERM: {
    path: "/sections/deleteId",
    method: "DELETE",
  },
  DELETE_NOTIFICATION: {
    path: "/notification/delete",
    method: "DELETE",
  },
  DELETE_COURSE_DOCUMENT: {
    path: "/course/documents/delete",
    method: "DELETE",
  },
  LIST_VERSION: {
    path: "/product/find-version",
    method: "POST",
  },
  GET_VERSION: {
    path: "/product/get-detail-version",
    method: "GET",
  },
  CREATE_VERSION: {
    path: "/product/create-version",
    method: "POST",
  },

  UPDATE_VERSION: {
    path: "/product/update-version",
    method: "POST",
  },
  DELETE_VERSION: {
    path: "/product/delete-version",
    method: "POST",
  },
  LIST_SLIDER: {
    path: "/slider/list",
    method: "GET",
  },
  CREATE_SLIDER: {
    path: "/slider/add",
    method: "POST",
  },
  GET_SLIDER: {
    path: "/slider/get-detail",
    method: "GET",
  },
  UPLOAD_IMAGE: {
    path: "/upload/upload-media-file",
    method: "POST",
  },
  UPLOAD_VIDEO_CHUNK: {
    path: "/upload/upload-media-chunk",
    method: "POST",
  },
  UPDATE_SLIDER: {
    path: "/slider/update",
    method: "POST",
  },
  DELETE_SLIDER: {
    path: "/slider/delete",
    method: "DELETE",
  },
  CMS_SETTING: {
    path: "/setting/detail",
    method: "GET",
  },
  CMS_SETTING_ADD: {
    path: "/setting/add",
    method: "POST",
  },
  CMS_SETTING_UPDATE: {
    path: "/setting/update",
    method: "POST",
  },
  LIST_INSTRUCTORS: {
    path: "/instructors/get-list",
    method: "POST",
  },
  GET_INSTRUCTORS: {
    path: "/instructors/get-detail",
    method: "GET",
  },
  CREATE_INSTRUCTORS: {
    path: "/instructors/insert",
    method: "POST",
  },
  GET_INSTRUCTORS_DETAIL: {
    path: "/instructors/get-detail",
    method: "GET",
  },
  UPDATE_INSTRUCTORS: {
    path: "/instructors/update",
    method: "POST",
  },
  LIST_TIMETABLE: {
    path: "/schedule/get-list",
    method: "POST",
  },
  CREATE_TIMETABLE: {
    path: "/schedule/insert",
    method: "POST",
  },
  GET_TIMETABLE_DETAIL: {
    path: "/schedule/get-detail",
    method: "GET",
  },
  DELETE_TIMETABLE: {
    path: "/schedule/delete",
    method: "POST",
  },
  UPDATE_TIMETABLE: {
    path: "/schedule/update",
    method: "POST",
  },

  GET_TRANSACTION_CLOUD_DETAIL: {
    path: "/product/transactionCloud/detail",
    method: "POST",
  },

  LIST_USER_TOKEN: {
    path: "/user/get-usertoken",
    method: "POST",
  },
  GET_TOKEN_DETAIL: {
    path: "/user/get-detail",
    method: "GET",
  },
  CREATE_USER_TOKEN: {
    path: "/user/insert-usertoken",
    method: "POST",
  },
  UPDATE_USER_TOKEN: {
    path: "/user/update-usertoken",
    method: "POST",
  },
  GET_USER_TOKEN_DETAIL: {
    path: "/user/staff-get-detail",
    method: "GET",
  },
  GET_USER_TOKEN_DETAIL_BY_ID: {
    path: "/user/token-get-detail",
    method: "GET",
  },
  UPDATE_USER_TOKEN_DETAIL: {
    path: "/user/update-usertoken-detail",
    method: "POST",
  },
  DELETE_USER_TOKEN_DETAIL: {
    path: "/user/delete-usertoken-detail",
    method: "DELETE",
  },

  LIST_PRODUCT_DEMO: {
    path: "/democloudapplication/get-list",
    method: "POST",
  },
  GET_PRODUCT_DEMO: {
    path: "/democloudapplication/get-detail",
    method: "GET",
  },
  CREATE_PRODUCT_DEMO: {
    path: "/democloudapplication/insert",
    method: "POST",
  },
  UPDATE_PRODUCT_DEMO: {
    path: "/democloudapplication/update",
    method: "POST",
  },
  DELETE_PRODUCT_DEMO: {
    path: "/democloudapplication/delete",
    method: "POST",
  },

  //api môn học
  LIST_COURSE: {
    path: "/course/get-list",
    method: "POST",
  },
  CREATE_COURSE: {
    path: "/course/insert",
    method: "POST",
  },
  GET_COURSE_DETAIL: {
    path: "/course/get-detail",
    method: "GET",
  },
  UPDATE_COURSE: {
    path: "/course/update",
    method: "POST",
  },

  //api phòng học
  LIST_CLASSROOM: {
    path: "/classroom/get-list",
    method: "POST",
  },
  CREATE_CLASSROOM: {
    path: "/classroom/insert",
    method: "POST",
  },
  GET_CLASSROOM_DETAIL: {
    path: "/classroom/get-detail",
    method: "GET",
  },
  UPDATE_CLASSROOM: {
    path: "/classroom/update",
    method: "POST",
  },

  //api bộ môn
  LIST_DEPARTMENT: {
    path: "/department/get-list",
    method: "POST",
  },
  CREATE_DEPARTMENT: {
    path: "/department/insert",
    method: "POST",
  },
  GET_DEPARTMENT_DETAIL: {
    path: "/department/get-detail",
    method: "GET",
  },
  UPDATE_DEPARTMENT: {
    path: "/department/update",
    method: "POST",
  },
};
export default api;
