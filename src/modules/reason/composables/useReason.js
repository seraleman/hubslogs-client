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
    labelNewBtn: computed(() => store.getters["reason/getLabelNewBtn"]),
    isLoadingReasons: computed(
      () => store.getters["reason/getIsLoadingReasons"]
    ),
    isReasonFormOpen: computed(
      () => store.getters["reason/getIsReasonFormOpen"]
    ),
    reasonForm: computed(() => store.getters["reason/getReasonForm"]),
    reasons: computed(() => store.getters["reason/getReasons"]),
    reasonById: computed(() => store.getters["reason/getReasonById"]),
    title: computed(() => store.getters["reason/getTitle"]),
  };

  /**---methods---*/
  const method = {
    loadReasons: async () => {
      mutation.toggleIsLoadingReasons();
      method.showLoading();
      await action.loadReasons();
      $q.loading.hide();
      mutation.toggleIsLoadingReasons();
    },

    showLoading: () => {
      $q.loading.show({
        message: "Por favor espera",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "secondary",
      });
    },

    isFieldNotNull: (val, message) => {
      return (val !== null && val !== "") || message;
    },

    onNew: () => {
      method.setTitle();
      mutation.toggleIsReasonFormOpen();
    },

    onCancel: () => {
      mutation.toggleIsReasonFormOpen();
      mutation.resetReasonForm();
      method.resetTitle();
    },

    onEdit: (reason) => {
      method.setTitle(reason.name);
      mutation.setReasonForm(reason);
      mutation.toggleIsReasonFormOpen();
    },

    onReset: () => {
      mutation.resetReasonForm();
    },

    onSubmit: (reasonForm, reasons) => {
      if (!reasonForm.id) {
        // creating a reason
        let idMax = 0;
        reasons.forEach((reason) => {
          if (Number(reason.id) > idMax) idMax = Number(reason.id);
        });

        const reason = {
          description: reasonForm.description,
          id: String(idMax + 1),
          name: reasonForm.name,
        };

        mutation.createReason(reason);
        mutation.toggleIsReasonFormOpen();
        $q.notify({
          color: "secondary",
          icon: "cloud_done",
          message: `La razón '${reasonForm.name}' ha sido creada`,
          textColor: "white",
        });
        mutation.resetReasonForm();
        method.resetTitle();
      } else {
        // updating a reason
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
          mutation.resetReasonForm();
        } else {
          const args = {
            idx,
            reasonUpdated,
          };

          mutation.updateReason(args);

          $q.notify({
            color: "secondary",
            icon: "cloud_done",
            message: `La información de ${reasonUpdated.name} ha sido actualizada`,
            textColor: "white",
          });
          mutation.toggleIsReasonFormOpen();
          mutation.resetReasonForm();
        }
      }
    },

    resetReasonForm: () => {
      mutation.resetReasonForm();
    },

    resetTitle: () => {
      mutation.resetTitle();
    },

    setLabelNewBtn: (reasonForm) => {
      const { name, description } = reasonForm;

      !name && !description
        ? mutation.setLabelNewBtn("")
        : mutation.setLabelNewBtn("continuar agregando razón");
    },

    setReasonById: (reasons, id) => {
      const reason = reasons.find((reason) => reason.id === id);
      mutation.setReasonById(reason);
    },

    setReasonForm: (isReasonFormOpen, reasonForm) => {
      if (!isReasonFormOpen && reasonForm.id !== "") method.resetReasonForm();
    },

    setTitle: (name = "") => {
      name === ""
        ? mutation.setTitle("Creando una nueva razón")
        : mutation.setTitle(`Editando '${name}'`);
    },

    trimText: (text, size) => {
      switch (size) {
        case "small":
          return text.length > 60 ? text.substring(0, 50) + "..." : text;

        case "medium":
          return text.length > 130 ? text.substring(0, 120) + "..." : text;
      }
    },

    twoWay: {
      isReasonFormOpen: computed({
        get() {
          return get.isReasonFormOpen.value;
        },
        set() {
          store.commit("reason/toggleIsReasonFormOpen");
        },
      }),
      description: computed({
        get() {
          return get.reasonForm.value.description;
        },
        set(value) {
          store.commit("reason/twoWayReasonForm", {
            key: "description",
            value,
          });
        },
      }),
      name: computed({
        get() {
          return get.reasonForm.value.name;
        },
        set(value) {
          store.commit("reason/twoWayReasonForm", {
            key: "name",
            value,
          });
        },
      }),
    },
  };

  //*---mutations---*/
  const mutation = {
    createReason: (reason) => {
      store.commit("reason/createReason", reason);
    },

    resetReasonForm: () => {
      store.commit("reason/resetReasonForm");
    },

    resetTitle: () => {
      store.commit("reason/resetTitle");
    },

    setLabelNewBtn: (label) => {
      store.commit("reason/setLabelNewBtn", label);
    },

    setTitle: (title) => {
      store.commit("reason/setTitle", title);
    },

    setReasonById: (reason) => {
      store.commit("reason/setReasonById", reason);
    },

    setReasonForm: (reason) => {
      store.commit("reason/setReasonForm", reason);
    },

    toggleIsReasonFormOpen: () => {
      store.commit("reason/toggleIsReasonFormOpen");
    },

    toggleIsLoadingReasons: () => {
      store.commit("reason/toggleIsLoadingReasons");
    },

    updateReason: (args) => {
      store.commit("reason/updateReason", args);
    },
  };

  return {
    get,
    method,
    mutation,
  };
};

export default useReason;
