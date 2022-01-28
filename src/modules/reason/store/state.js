import { ref, reactive } from "vue";

export default function () {
  const isReasonFormOpen = ref(false);
  const labelNewBtn = ref("");
  const isLoadingReasons = ref(false);
  const reasonForm = ref({
    description: "",
    id: "",
    name: "",
  });
  const reasons = ref([]);
  const reasonsById = ref({
    description: "",
    id: "",
    name: "",
  });
  const title = ref("");

  return {
    isReasonFormOpen,
    labelNewBtn,
    isLoadingReasons,
    reasonForm,
    reasons,
    reasonsById,
    title,
  };
}
