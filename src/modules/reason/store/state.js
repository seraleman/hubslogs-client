import { ref, reactive } from "vue";

export default function () {
  const isLoadingReasons = ref(false);
  const reasons = ref([]);

  return {
    isLoadingReasons,
    reasons,
  };
}
