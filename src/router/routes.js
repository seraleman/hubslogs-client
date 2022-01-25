import usersRouter from "../modules/users/router";
import resonRouter from "../modules/reason/router";

const routes = [
  {
    path: "/",
    component: () => import("../modules/ui/layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../modules/ui/pages/Home.vue"),
      },
      {
        path: "typography",
        name: "typography",
        component: () => import("../modules/ui/pages/Typography.vue"),
      },
      {
        path: "flex",
        name: "flex",
        component: () => import("../modules/ui/pages/Flex.vue"),
      },
      {
        path: "dialogs",
        name: "dialogs",
        component: () => import("../modules/ui/pages/Dialogs.vue"),
      },
      {
        path: "forms",
        name: "forms",
        component: () => import("../modules/ui/pages/Forms.vue"),
      },
      {
        path: "users",
        ...usersRouter,
      },
      {
        path: "reasons",
        ...resonRouter,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("../modules/ui/pages/Error404.vue"),
  },
];

export default routes;
