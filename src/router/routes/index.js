// ** Routes Imports
import AppRoutes from "./Apps";
import PagesRoutes from "./Pages";

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/apps/staff/list";

// ** Merge Routes
const Routes = [...AppRoutes, ...PagesRoutes];

export { DefaultRoute, TemplateTitle, Routes };
