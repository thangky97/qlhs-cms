import {
  ShoppingCart,
  User,
  Users,
  UserPlus,
  Bell,
  BookOpen,
} from "react-feather";
import { STAFF_ROLE } from "../../constants/app";
export default [
  {
    id: "staffs",
    title: "System staff",
    icon: <Users size={20} />,
    navLink: "/apps/staff/list",
    role: STAFF_ROLE.MANAGE_SYSTEM,
  },
  {
    id: "Instructors",
    title: "Instructors",
    icon: <UserPlus size={20} />,
    navLink: "/apps/instructors/list",
    role: STAFF_ROLE.MANAGE_USER,
  },
  {
    id: "products",
    title: "Product_Course",
    icon: <ShoppingCart size={20} />,
    navLink: "/apps/product/list",
    role: STAFF_ROLE.MANAGE_STAFF,
  },
  {
    id: "subject",
    title: "Môn học",
    icon: <BookOpen size={20} />,
    navLink: "/apps/subject/list",
    role: STAFF_ROLE.MANAGE_STAFF,
  },
  {
    id: "users",
    title: "User",
    icon: <User size={20} />,
    navLink: "/apps/user/list",
    role: STAFF_ROLE.MANAGE_USER,
  },
  {
    id: "notification",
    title: "Notification",
    icon: <Bell size={20} />,
    navLink: "/apps/notification/list",
    role: STAFF_ROLE.MANAGE_USER,
  },
];
