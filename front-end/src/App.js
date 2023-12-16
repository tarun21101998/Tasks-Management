  import React from "react";
  import Home from "./component/javaScript/home";
import Tasks from "./component/javaScript/tasks";
import SignUp from "./component/javaScript/signUp";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Navbar from "./component/javaScript/navbar";
import Login from "./component/javaScript/login";


const App = ()=>{

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <Login /> },
        {path: "/signup", element: <SignUp/>},
        {path: "/tasks", element: <Tasks />},
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;