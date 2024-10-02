import {
  User,
  Users,
  UserPlus,
  Bell,
  BookOpen,
  Briefcase,
  Table,
  Grid,
  Tv,
  Airplay,
  Book,
  Box,
} from "react-feather";
import { STAFF_ROLE } from "../../constants/app";

export default [
  // {
  //   id: "staffs",
  //   title: "System staff",
  //   icon: <Users size={20} />,
  //   navLink: "/apps/staff/list",
  //   role: STAFF_ROLE.MANAGE_STAFF,
  // },
  {
    id: "staffs",
    title: "System staff",
    icon: <Users size={20} />,
    navLink: "/apps/staff/list",
    role: STAFF_ROLE.MANAGE_SYSTEM,
  },

  {
    id: "training_programs",
    title: "training_program",
    icon: <Airplay size={20} />,
    navLink: "/apps/training_program/list",
    role: STAFF_ROLE.MANAGE_SYSTEM,
  },

  {
    id: "products",
    title: "Product_Course",
    icon: <Box size={20} />,
    navLink: "/apps/product/list",
    role: STAFF_ROLE.MANAGE_SYSTEM,
  },
  {
    id: "products",
    title: "Product_Course",
    icon: <Box size={20} />,
    navLink: "/apps/product/list",
    role: STAFF_ROLE.MANAGE_STAFF,
  },

  // {
  //   id: "semester",
  //   title: "Semester",
  //   icon: <Book size={20} />,
  //   navLink: "/apps/semester/list",
  //   role: STAFF_ROLE.MANAGE_STAFF,
  // },
  {
    id: "semester",
    title: "Semester",
    icon: <Book size={20} />,
    navLink: "/apps/semester/list",
    role: STAFF_ROLE.MANAGE_SYSTEM,
  },

  {
    id: "subject",
    title: "Môn học",
    icon: <BookOpen size={20} />,
    navLink: "/apps/subject/list",
    role: STAFF_ROLE.MANAGE_SYSTEM,
  },

  {
    id: "classroom",
    title: "Phòng học",
    icon: <Table size={20} />,
    navLink: "/apps/classroom/list",
    role: STAFF_ROLE.MANAGE_SYSTEM,
  },

  {
    id: "department",
    title: "Nghành",
    icon: <Briefcase size={20} />,
    navLink: "/apps/department/list",
    role: STAFF_ROLE.MANAGE_SYSTEM,
  },

  {
    id: "users",
    title: "User",
    icon: <User size={20} />,
    navLink: "/apps/user/list",
    role: STAFF_ROLE.MANAGE_SYSTEM,
  },
  {
    id: "users",
    title: "User",
    icon: <User size={20} />,
    navLink: "/apps/user/list",
    role: STAFF_ROLE.MANAGE_STAFF,
  },

  {
    id: "timetable",
    title: "Timetable",
    icon: <Table size={20} />,
    navLink: "/apps/timetable/list",
    role: STAFF_ROLE.MANAGE_SYSTEM,
  },
  {
    id: "timetable",
    title: "Timetable",
    icon: <Table size={20} />,
    navLink: "/apps/timetable/list",
    role: STAFF_ROLE.MANAGE_STAFF,
  },
  {
    id: "timetable",
    title: "Timetable",
    icon: <Table size={20} />,
    navLink: "/apps/timetable/list",
    role: STAFF_ROLE.MANAGE_USER,
  },

  {
    id: "rollcall",
    title: "Điểm danh",
    icon: <Tv size={20} />,
    navLink: "/apps/roll_call/list",
    role: STAFF_ROLE.MANAGE_SYSTEM,
  },
  {
    id: "rollcall",
    title: "Điểm danh",
    icon: <Tv size={20} />,
    navLink: "/apps/roll_call/list",
    role: STAFF_ROLE.MANAGE_STAFF,
  },
  // {
  //   id: "notification",
  //   title: "Notification",
  //   icon: <Bell size={20} />,
  //   navLink: "/apps/notification/list",
  //   // role: [STAFF_ROLE.MANAGE_STAFF, STAFF_ROLE.MANAGE_SYSTEM],
  //   role: STAFF_ROLE.MANAGE_STAFF,
  // },
];
