<template>
  <template v-if="!reason.id">
    <div class="row q-pa-md items-end justify-center">
      <reason-item
        v-for="{ id, name, description } in reasons"
        :key="id"
        :id="id"
        :name="name"
        :description="description"
        @reasonSelected="setReason(id)"
      />
    </div>
  </template>

  <template v-else>
    <div class="row q-pa-md items-end justify-center">
      <reason :reason="reason" @go-back="resetReason" />
    </div>
  </template>
</template>

<script>
import { defineComponent, ref, watch, reactive } from "vue";

import ReasonItem from "./ReasonItem.vue";
import Reason from "./Reason.vue";

export default defineComponent({
  name: "ReasonList",
  props: {
    reasons: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    console.log(props.reasons);
    const reason = ref({
      description: "",
      id: "",
      name: "",
    });

    const setReason = (id) => {
      const reasonCurrent = props.reasons.find((reason) => {
        return reason.id === id;
      });

      if (!reasonCurrent) resetReason();
      else reason.value = reasonCurrent;
    };

    const resetReason = () => {
      reason.value = {
        description: "",
        id: "",
        name: "",
      };
    };

    //Este watch permite actualizar la razón una vez actualizada
    watch(props.reasons, (_, __) => {
      console.log("ejecutandose el watch");
      setReason(reason.value.id);
    });

    return {
      // get
      // reasons,
      reason,

      // method
      resetReason,
      setReason,
    };
  },
  components: {
    ReasonItem,
    Reason,
  },
});
</script>

<style lang="sass">

.my-sticky-header-table
  /* height or max-height is important */
  max-height: 605px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #f9f9f9

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
