import Index from "./pages/Index";
import ServicePage from "./pages/ServicePage";
import Login from "./pages/admin/Login";
import AdminUpload from "./pages/admin/Upload";
import MediaLibrary from "./pages/admin/MediaLibrary";
import NotFound from "./pages/NotFound";
import { SERVICE_PAGES } from "./lib/servicePages";

export const routers = [
    {
      path: "/",
      name: 'home',
      element: <Index />,
    },
    /* One route per service page, defined in src/lib/servicePages.ts */
    ...SERVICE_PAGES.map((page) => ({
      path: page.path,
      name: page.slug,
      element: <ServicePage slug={page.slug} />,
    })),
    {
      path: "/admin/login",
      name: 'admin-login',
      element: <Login />,
    },
    {
      path: "/admin/upload",
      name: 'admin-upload',
      element: <AdminUpload />,
    },
    {
      path: "/admin/media",
      name: 'admin-media',
      element: <MediaLibrary />,
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
