import { computed } from "vue";
import { useStore } from "vuex";

const useUi = () => {
  const store = useStore();

  /*------------------getters------------------*/
  const isSideMenuOpen = computed(() => store.getters["ui/getIsSideMenuOpen"]);

  //*-----------------mutations-----------------*/
  const toggleSideMenu = () => {
    store.commit("ui/toggleSideMenu");
  };

  /**------------------functios------------------*/

  const sideMenuOpen = computed({
    get() {
      return isSideMenuOpen.value;
    },
    set() {
      toggleSideMenu();
    },
  });

  // const sideMenuOpen = {
  //   get() {
  //     return isSideMenuOpen.value;
  //   },
  //   set() {
  //     toggleSideMenu();
  //   },
  // };

  return {
    sideMenuOpen,

    toggleSideMenu,
  };
};

export default useUi;
