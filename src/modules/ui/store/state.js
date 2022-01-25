import { ref } from "vue";

export default function () {
  const isSideMenuOpen = ref(true);

  return {
    isSideMenuOpen,
  };
}
