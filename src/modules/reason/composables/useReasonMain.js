import { computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const useReason = () => {
  const store = useStore();
  const $q = useQuasar();

  /*---actions---*/
  const action = {
    loadReasons: async () => {
      await store.dispatch("reason/loadReasons");
    },
  };

  /*---getters---*/
  const get = {
    isLoadingReasons: computed(
      () => store.getters["reason/getIsLoadingReasons"]
    ),
    reasons: computed(() => store.getters["reason/getReasons"]),
    reasonById: computed(() => store.getters["reason/getReasonById"]),
  };

  /**---methods---*/
  const method = {
    deleteReason: (reason) => {
      $q.dialog({
        title: "Confirmar",
        message: `¿Desea eliminar la razón '${reason.name}'?`,
        ok: {
          color: "secondary",
          label: "Sí",
        },
        cancel: {
          color: "secondary",
          label: "Cancelar",
          outline: true,
        },
        persistent: true,
      })
        .onOk(() => {
          deleteReason();
        })
        .onCancel(() => {
          return;
        });

      const deleteReason = () => {
        mutation.deleteReason(reason);
        $q.notify({
          color: "green-4",
          icon: "cloud_done",
          message: "Razón eliminada",
          textColor: "white",
        });
      };
    },

    loadReasons: async (reasons) => {
      if (!reasons.length) {
        mutation.toggleIsLoadingReasons();
        method.showLoading();
        await action.loadReasons();
        $q.loading.hide();
        mutation.toggleIsLoadingReasons();
      }
    },

    showLoading: () => {
      $q.loading.show({
        message: "Por favor espera",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "secondary",
      });
    },

    twoWay: {},
  };

  //*---mutations---*/
  const mutation = {
    toggleIsLoadingReasons: () => {
      store.commit("reason/toggleIsLoadingReasons");
    },

    deleteReason: (reason) => {
      store.commit("reason/deleteReason", reason);
    },
  };

  //*---initializer---*/
  method.loadReasons(get.reasons.value);

  return {
    get,
    method,
    mutation,
  };
};

export default useReason;
