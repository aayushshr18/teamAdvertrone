import Departments from "../departments";
import Agents from "./screens/Agents";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Withdraw from "./screens/Withdraw";


export const allRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/withdraw',
    element: <Withdraw />
  },
  {
    path: '/agents',
    element: <Agents />
  },
  {
    path: '/leads',
    element: <Departments />
  },
  {
    path: '/signup',
    element: <Signup />
  }
];