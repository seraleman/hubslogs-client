import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const useReasonForm = () => {
  const store = useStore();
  const $q = useQuasar();

  const isReasonFormOpen = ref(false);
  const reasonForm = ref({
    description: "",
    id: "",
    name: "",
  });

  const action = {
    createReason: async (reason) => {
      await store.dispatch("reason/createReason", reason);
    },

    updateReason: async (args) => {
      await store.dispatch("reason/updateReason", args);
    },
  };

  const get = {
    isReasonFormOpen: computed(() => isReasonFormOpen.value),
    reasonForm: computed(() => reasonForm.value),
  };

  const method = {
    awaiting: async (func) => {
      $q.loading.show({
        message: "Por favor espera...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "secondary",
      });

      await func;

      $q.loading.hide();
    },

    createRason: async (reasonForm, reasons) => {
      let idMax = 0;
      reasons.forEach((reason) => {
        if (Number(reason.id) > idMax) idMax = Number(reason.id);
      });

      const reason = {
        description: reasonForm.description,
        id: String(idMax + 1),
        name: reasonForm.name,
      };

      await method.awaiting(action.createReason(reason));

      mutation.toggleIsReasonFormOpen();
      $q.notify({
        color: "secondary",
        icon: "cloud_done",
        message: `La razón '${reasonForm.name}' ha sido creada`,
        textColor: "white",
      });
      mutation.resetReasonForm();
    },

    isFieldNotNull: (val, message) => {
      return (val !== null && val !== "") || message;
    },

    onCancel: (reason) => {
      mutation.toggleIsReasonFormOpen();
      if (!reason === null) mutation.resetReasonForm();
    },

    onReset: () => {
      mutation.resetReasonForm();
    },

    onSubmit: async (reasonForm, reasons) => {
      if (!reasonForm.id) await method.createRason(reasonForm, reasons);
      else method.updateReason(reasonForm, reasons);
    },

    resetReasonForm: () => {
      mutation.resetReasonForm();
    },

    setReasonForm: (reason) => {
      mutation.setReasonForm(reason);
    },

    toggleIsReasonFormOpen: () => {
      mutation.toggleIsReasonFormOpen();
    },

    twoWayReasonForm: (arg) => {
      const { key, value } = arg;
      switch (key) {
        case "name":
          reasonForm.value.name = value;
          break;
        case "description":
          reasonForm.value.description = value;
          break;
      }
    },

    updateReason: async (reasonForm, reasons) => {
      const { description, id, name } = reasonForm;
      const idx = reasons.map((e) => e.id).indexOf(id);
      const reasonCurrent = reasons[idx];

      const reasonUpdated = {
        description,
        id,
        name,
      };

      let equal = true;
      for (let [key, val] of Object.entries(reasonCurrent)) {
        if (reasonUpdated[key] !== val) equal = false;
        if (!equal) break;
      }

      if (equal) {
        $q.notify({
          color: "warning",
          icon: "las la-exclamation-circle",
          message: `No hubo cambios en la información de ${reasonCurrent.name}`,
          textColor: "white",
        });
        mutation.toggleIsReasonFormOpen();
      } else {
        const args = {
          idx,
          reasonUpdated,
        };

        await method.awaiting(action.updateReason(args));
        mutation.updateSetReason(reasonUpdated);

        $q.notify({
          color: "secondary",
          icon: "cloud_done",
          message: `La información de ${reasonUpdated.name} ha sido actualizada`,
          textColor: "white",
        });
        mutation.toggleIsReasonFormOpen();
      }
    },

    twoWay: {
      isReasonFormOpen: computed({
        get() {
          return get.isReasonFormOpen.value;
        },
        set() {
          isReasonFormOpen.value = !isReasonFormOpen.value;
        },
      }),

      description: computed({
        get() {
          if (reasonForm.value.description === undefined) return "";
          return get.reasonForm.value.description;
        },
        set(value) {
          method.twoWayReasonForm({
            key: "description",
            value,
          });
        },
      }),

      name: computed({
        get() {
          if (reasonForm.value.name === undefined) return "";
          return reasonForm.value.name;
        },
        set(value) {
          method.twoWayReasonForm({
            key: "name",
            value,
          });
        },
      }),
    },
  };

  const mutation = {
    resetReasonForm: () => {
      reasonForm.value = {
        description: "",
        id: "",
        name: "",
      };
    },

    setReasonForm: (reason) => {
      const { description, id, name } = reason;

      reasonForm.value = {
        description,
        id,
        name,
      };
    },

    toggleIsReasonFormOpen: () => {
      isReasonFormOpen.value = !isReasonFormOpen.value;
    },

    updateSetReason: (reason) => {
      store.commit("reason/setReason", reason);
    },

    updateReason: (args) => {
      store.commit("reason/updateReason", args);
    },
  };

  return {
    get,
    method,
  };
};

export default useReasonForm;
