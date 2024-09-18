// ** Redux Imports
import { combineReducers } from "redux";

// ** Reducers Imports
import partners from "@src/views/apps/cms/home/partner/store/reducer";
import sliders from "@src/views/apps/cms/home/slider/store/reducer";
import documents from "@src/views/apps/document/store/reducer";
import products from "@src/views/apps/product/store/reducer";
import terms from "@src/views/apps/product/term/store/reducer";
import staffs from "@src/views/apps/staff/store/reducer";
import transactions from "@src/views/apps/transaction/store/reducer";
import user_product from "@src/views/apps/user-product/store/reducer";
import users from "@src/views/apps/user/store/reducer";
import dataTables from "@src/views/tables/data-tables/store/reducer";
import abouts from "../../views/apps/cms/about/store/reducer";
import settings from "../../views/apps/cms/setting/store/reducer";
import notification from "../../views/apps/notification/store/reducer";
import kind from "../../views/apps/kind/store/reducer";
import transcript from "../../views/apps/achievement/transcript/store/reducer";
import trainninghistory from "../../views/apps/achievement/trainningHistory/store/reducer";
import instructors from "../../views/apps/instructors/store/reducer";

import user from "../../views/apps/users/store/reducer";
import userToken from "../../views/apps/user-token/store/reducer";
import userTokenDetail from "../../views/apps/user-token-detail/store/reducer";

import transactionsToken from "../../views/apps/transactionToken/store/reducer";
import courses from "../../views/apps/course/store/reducer";

import classrooms from "../../views/apps/classroom/store/reducer";

import department from "../../views/apps/department/store/reducer";

import auth from "./auth";
import common from "./common";
import layout from "./layout";
import navbar from "./navbar";

const rootReducer = combineReducers({
  auth,
  sliders,
  common,
  user_product,
  transcript,
  users,
  user,
  transactions,
  notification,
  settings,
  staffs,
  trainninghistory,
  terms,
  products,
  partners,
  abouts,
  kind,
  navbar,
  layout,
  documents,
  dataTables,
  instructors,
  userToken,
  userTokenDetail,
  transactionsToken,
  courses,
  classrooms,
  department,
});

export default rootReducer;
