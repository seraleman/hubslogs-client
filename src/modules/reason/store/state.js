import { ref } from "vue";

export default function () {
  const reasons = ref([]);
  const reason = ref({
    description: "",
    id: "",
    name: "",
  });

  return {
    reasons,
    reason,
  };
}
