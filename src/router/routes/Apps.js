import { lazy } from "react";
import { Redirect } from "react-router-dom";

const AppRoutes = [
  {
    path: "/apps/user/list",
    component: lazy(() => import("../../views/apps/user/list")),
  },

  {
    path: "/apps/user/edit",
    exact: true,
    component: () => <Redirect to="/apps/user/edit/1" />,
  },
  {
    path: "/apps/user/edit/:id",
    component: lazy(() => import("../../views/apps/user/edit")),
    meta: {
      navLink: "/apps/user/edit",
    },
  },

  {
    path: "/apps/user-product/list/:id",
    component: lazy(() => import("../../views/apps/user-product/list")),
  },

  {
    path: "/apps/user-product/edit",
    exact: true,
    component: () => <Redirect to="/apps/user-product/edit/1" />,
  },
  {
    path: "/apps/user-product/edit/:id",
    component: lazy(() => import("../../views/apps/user-product/edit")),
    meta: {
      navLink: "/apps/user-product/edit",
    },
  },
  //Đơn hàng
  {
    path: "/apps/transaction/list",
    component: lazy(() => import("../../views/apps/transaction/list")),
  },
  {
    path: "/apps/transaction/edit",
    exact: true,
    component: () => <Redirect to="/apps/transaction/edit/1" />,
  },
  {
    path: "/apps/transaction/edit/:id",
    component: lazy(() => import("../../views/apps/transaction/edit")),
    meta: {
      navLink: "/apps/transaction/edit",
    },
  },

  {
    path: "/apps/blog/list",
    component: lazy(() => import("../../views/apps/document/list/index")),
  },
  {
    path: "/apps/blog/edit",
    exact: true,
    component: () => <Redirect to="/apps/document/edit/1" />,
  },
  {
    path: "/apps/blog/edit/:id",
    component: lazy(() => import("../../views/apps/document/edit")),
    meta: {
      navLink: "/apps/blog/edit",
    },
  },

  {
    path: "/apps/users/list",
    component: lazy(() => import("../../views/apps/users/list/index")),
  },
  {
    path: "/apps/users/edit",
    exact: true,
    component: () => <Redirect to="/apps/users/edit/1" />,
  },
  {
    path: "/apps/users/edit/:id",
    component: lazy(() => import("../../views/apps/users/edit")),
    meta: {
      navLink: "/apps/users/edit",
    },
  },

  {
    path: "/apps/product/list",
    component: lazy(() => import("../../views/apps/product/list/index")),
  },
  {
    path: "/apps/product/edit",
    exact: true,
    component: () => <Redirect to="/apps/product/edit/1" />,
  },
  {
    path: "/apps/product/edit/:id",
    component: lazy(() => import("../../views/apps/product/edit")),
    meta: {
      navLink: "/apps/product/edit",
    },
  },
  {
    path: "/apps/notification/list",
    component: lazy(() => import("../../views/apps/notification/list/index")),
  },

  {
    path: "/apps/notification/edit",
    exact: true,
    component: () => <Redirect to="/apps/notification/edit/1" />,
  },
  {
    path: "/apps/notification/edit/:id",
    component: lazy(() => import("../../views/apps/notification/edit/index")),
    meta: {
      navLink: "/apps/notification/edit",
    },
  },
  {
    path: "/apps/kind/list",
    component: lazy(() => import("../../views/apps/kind/list/index")),
  },
  {
    path: "/apps/kind/edit",
    exact: true,
    component: () => <Redirect to="/apps/kind/edit/1" />,
  },
  {
    path: "/apps/kind/edit/:id",
    component: lazy(() => import("../../views/apps/kind/edit")),
    meta: {
      navLink: "/apps/kind/edit",
    },
  },

  {
    path: "/apps/product/import-file/list",
    exact: true,
    component: () => <Redirect to="/apps/product/import-file/list/1" />,
  },
  {
    path: "/apps/product/import-file/list/:id",
    component: lazy(() => import("../../views/apps/product/import-file/list")),
    meta: {
      navLink: "/apps/product/import-file/list",
    },
  },
  {
    path: "/apps/product/import-file/edit",
    exact: true,
    component: () => <Redirect to="/apps/product/import-file/edit/1" />,
  },
  {
    path: "/apps/product/import-file/edit/:id",
    component: lazy(() => import("../../views/apps/product/import-file/edit")),
    meta: {
      navLink: "/apps/product/import-file/edit",
    },
  },
  //
  {
    path: "/apps/product/import-video/list",
    exact: true,
    component: () => <Redirect to="/apps/product/import-video/list/1" />,
  },
  {
    path: "/apps/product/import-video/list/:id",
    component: lazy(() => import("../../views/apps/product/import-video/list")),
    meta: {
      navLink: "/apps/product/import-video/list",
    },
  },
  {
    path: "/apps/product/import-video/edit",
    exact: true,
    component: () => <Redirect to="/apps/product/import-video/edit/1" />,
  },
  {
    path: "/apps/product/import-video/edit/:id",
    component: lazy(() => import("../../views/apps/product/import-video/edit")),
    meta: {
      navLink: "/apps/product/import-video/edit",
    },
  },

  {
    path: "/apps/product/term/list/:id",
    component: lazy(() => import("../../views/apps/product/term/list")),
    meta: {
      navLink: "/apps/product/term/list",
    },
  },
  {
    path: "/apps/product/term/edit",
    exact: true,
    component: () => <Redirect to="/apps/product/term/edit/1" />,
  },
  {
    path: "/apps/product/term/edit/:id",
    component: lazy(() => import("../../views/apps/product/term/edit")),
    meta: {
      navLink: "/apps/product/term/edit",
    },
  },
  {
    path: "/apps/staff/list",
    component: lazy(() => import("../../views/apps/staff/list")),
  },
  {
    path: "/apps/staff/edit",
    exact: true,
    component: () => <Redirect to="/apps/staff/edit/1" />,
  },
  {
    path: "/apps/staff/edit/:id",
    component: lazy(() => import("../../views/apps/staff/edit")),
    meta: {
      navLink: "/apps/staff/edit",
    },
  },
  {
    path: "/apps/product/list",
    component: lazy(() => import("../../views/apps/product/list/index")),
  },

  {
    path: "/apps/achievements/transcript/list",
    component: lazy(() =>
      import("../../views/apps/achievement/transcript/list/index")
    ),
  },
  {
    path: "/apps/achievements/trainningHistory/list",
    component: lazy(() =>
      import("../../views/apps/achievement/trainningHistory/list/index")
    ),
  },
  {
    path: "/apps/achievements/transcript/edit/:id",
    component: lazy(() =>
      import("../../views/apps/achievement/transcript/edit/index")
    ),
    meta: {
      navLink: "/apps/achievements/transcript/edit",
    },
  },

  {
    path: "/apps/instructors/list",
    component: lazy(() => import("../../views/apps/instructors/list/index")),
  },
  {
    path: "/apps/instructors/edit/:id",
    component: lazy(() => import("../../views/apps/instructors/edit/index")),
    meta: {
      navLink: "/apps/instructors/edit",
    },
  },
  {
    path: "/apps/transactionToken/list",
    component: lazy(() => import("../../views/apps/transactionToken/list")),
  },
  {
    path: "/apps/transactionToken/edit",
    exact: true,
    component: () => <Redirect to="/apps/transactionToken/edit/1" />,
  },
  {
    path: "/apps/transactionToken/edit/:id",
    component: lazy(() => import("../../views/apps/transactionToken/edit")),
    meta: {
      navLink: "/apps/transactionToken/edit",
    },
  },

  {
    path: "/apps/user/token/list",
    component: lazy(() => import("../../views/apps/user-token/list")),
  },

  {
    path: "/apps/user/token/edit",
    exact: true,
    component: () => <Redirect to="/apps/user/token/edit/1" />,
  },
  {
    path: "/apps/user/edit/token/:id",
    component: lazy(() => import("../../views/apps/user-token/edit")),
    meta: {
      navLink: "/apps/user/token/edit",
    },
  },

  //
  {
    path: "/apps/user/token-detail/list/:id",
    component: lazy(() =>
      import("../../views/apps/user-token-detail/list/index")
    ),
  },

  {
    path: "/apps/user/token-detail/edit",
    exact: true,
    component: () => <Redirect to="/apps/user/token-detail/edit/1" />,
  },
  {
    path: "/apps/user/token-detail/edit/:id",
    component: lazy(() =>
      import("../../views/apps/user-token-detail/edit/index")
    ),
    meta: {
      navLink: "/apps/user/token-detail/edit",
    },
  },

  //môn học
  {
    path: "/apps/subject/list",
    component: lazy(() => import("../../views/apps/course/list/index")),
  },
  {
    path: "/apps/subject/edit/:id",
    component: lazy(() => import("../../views/apps/course/edit/index")),
    meta: {
      navLink: "/apps/subject/edit",
    },
  },

  //phòng học
  {
    path: "/apps/classroom/list",
    component: lazy(() => import("../../views/apps/classroom/list/index")),
  },
  {
    path: "/apps/classroom/edit/:id",
    component: lazy(() => import("../../views/apps/classroom/edit/index")),
    meta: {
      navLink: "/apps/classroom/edit",
    },
  },

  //bộ môn
  {
    path: "/apps/department/list",
    component: lazy(() => import("../../views/apps/department/list/index")),
  },
  {
    path: "/apps/department/edit/:id",
    component: lazy(() => import("../../views/apps/department/edit/index")),
    meta: {
      navLink: "/apps/department/edit",
    },
  },

  //chương trình đào tạo
  {
    path: "/apps/training_program/list",
    component: lazy(() =>
      import("../../views/apps/training_program/list/index")
    ),
  },
  {
    path: "/apps/training_program/edit/:id",
    component: lazy(() =>
      import("../../views/apps/training_program/edit/index")
    ),
    meta: {
      navLink: "/apps/training_program/edit",
    },
  },

  //kì học
  {
    path: "/apps/semester/list",
    component: lazy(() => import("../../views/apps/semester/list/index")),
  },
  {
    path: "/apps/semester/edit/:id",
    component: lazy(() => import("../../views/apps/semester/edit/index")),
    meta: {
      navLink: "/apps/semester/edit",
    },
  },

  //lịch học
  {
    path: "/apps/timetable/list",
    component: lazy(() => import("../../views/apps/timetable/list/index")),
  },
  {
    path: "/apps/timetable/edit/:id",
    component: lazy(() => import("../../views/apps/timetable/edit/index")),
    meta: {
      navLink: "/apps/timetable/edit",
    },
  },

  //điểm danh
  {
    path: "/apps/roll_call/list",
    component: lazy(() => import("../../views/apps/roll_call/list/index")),
  },
  {
    path: "/apps/roll_call/edit",
    component: lazy(() => import("../../views/apps/roll_call/edit/index")),
    meta: {
      navLink: "/apps/roll_call/edit",
    },
  },

  // {
  //   path: "/apps/product/term/list/:id",
  //   component: lazy(() => import("../../views/apps/product/term/list")),
  //   meta: {
  //     navLink: "/apps/product/term/list",
  //   },
  // },
  // {
  //   path: "/apps/product/term/edit",
  //   exact: true,
  //   component: () => <Redirect to="/apps/product/term/edit/1" />,
  // },
  // {
  //   path: "/apps/product/term/edit/:id",
  //   component: lazy(() => import("../../views/apps/product/term/edit")),
  //   meta: {
  //     navLink: "/apps/product/term/edit",
  //   },
  // },
];
export default AppRoutes;
