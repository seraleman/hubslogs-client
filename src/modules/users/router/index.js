export default {
  name: "users",
  component: () =>
    // import(/* webpackChunkName: "UsersPage" */ "../pages/UsersPage.vue"),
    import(/* webpackChunkName: "UsersLayout" */ "../layouts/UsersLayout.vue"),
  children: [
    {
      path: "admon",
      name: "users-admon",
      component: () =>
        import(/* webpackChunkName: "UsersPage" */ "../pages/UsersPage.vue"),
    },
  ],
};
