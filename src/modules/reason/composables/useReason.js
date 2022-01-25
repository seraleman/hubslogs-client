import { computed } from "vue";
import { useStore } from "vuex";

const useReason = () => {
  const store = useStore();

  /*---getters---*/
  const get = {
    reasons: computed(() => store.getters["reason/getReasons"]),
    reasonById: store.getters["reason/getReasonById"],
  };

  /**---methods---*/
  const method = {
    shortDescription: (description) => {
      return description.length > 130
        ? description.substring(0, 130) + "..."
        : description;
    },

    twoWay: {},
  };

  //*---mutations---*/
  const mutation = {};

  return {
    get,
    method,
    mutation,
  };
};

export default useReason;
