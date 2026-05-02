import Index from "./pages/Index";
import AquaPave from "./pages/AquaPave";
import Login from "./pages/admin/Login";
import AdminUpload from "./pages/admin/Upload";
import MediaLibrary from "./pages/admin/MediaLibrary";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export const routers = [
    {
      path: "/",
      name: 'home',
      element: <Index />,
    },
    {
      path: "/services/aquapave",
      name: 'aquapave',
      element: <AquaPave />,
    },
    {
      path: "/admin/login",
      name: 'admin-login',
      element: <Login />,
    },
    {
      path: "/admin/upload",
      name: 'admin-upload',
      element: <ProtectedRoute><AdminUpload /></ProtectedRoute>,
    },
    {
      path: "/admin/media",
      name: 'admin-media',
      element: <ProtectedRoute><MediaLibrary /></ProtectedRoute>,
    },
    /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
    {
      path: "*",
      name: '404',
      element: <NotFound />,
    },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
