import { computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const useReason = () => {
  const store = useStore();
  const $q = useQuasar();

  const action = {
    deleteReason: async (id) => {
      return await store.dispatch("reason/deleteReason", id);
    },

    loadReasons: async () => {
      await store.dispatch("reason/loadReasons");
    },
  };

  const get = {
    reason: computed(() => store.getters["reason/getReason"]),
    reasons: computed(() => store.getters["reason/getReasons"]),
    setReasonById: computed(() => store.getters["reason/getReasonById"]),
  };

  const method = {
    deleteReason: async (id) => {
      method.showLoading();
      const resp = await action.deleteReason(id);
      $q.loading.hide();
      $q.notify({
        color: "secondary",
        icon: "cloud_done",
        message: "Razón eliminada",
        textColor: "white",
      });
      return resp;
    },

    loadReasons: async (reasons) => {
      if (!reasons.length) {
        method.showLoading();
        await action.loadReasons();
        $q.loading.hide();
      }
    },

    resetReason: () => {
      mutation.resetReason();
    },

    setReasonById: (id) => {
      const reason = get.setReasonById.value(id);
      mutation.setReason(reason);
    },

    showLoading: () => {
      $q.loading.show({
        message: "Por favor espera...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "secondary",
      });
    },

    twoWay: {},
  };

  const mutation = {
    resetReason: () => {
      store.commit("reason/resetReason");
    },

    setReason: (reason) => {
      store.commit("reason/setReason", reason);
    },
  };

  return {
    get,
    method,
  };
};

export default useReason;
