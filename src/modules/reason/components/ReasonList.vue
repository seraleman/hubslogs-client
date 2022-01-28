<template>
  <div class="row q-pa-md items-end justify-center">
    <!-- bg-grey-3 shadow-2 -->
    <Reason
      v-for="{ id, name, description } in reasons"
      :key="id"
      :id="id"
      :name="name"
      :description="description"
    />
  </div>
</template>

<script>
import { defineComponent, watch, readonly } from "vue";

import Reason from "../components/Reason.vue";

import useReason from "../composables/useReason";

export default defineComponent({
  name: "ReasonList",
  setup() {
    const { get, method } = useReason();

    const { reasons } = get;

    const {} = method;

    return {
      reasons,
    };
  },
  components: {
    Reason,
  },
});
</script>

<style lang="sass">

// .my-sticky-header-table
//   /* height or max-height is important */
//   max-height: 605px

//   .q-table__top,
//   .q-table__bottom,
//   thead tr:first-child th
//     /* bg color is important for th; just specify one */
//     background-color: #f9f9f9

//   thead tr th
//     position: sticky
//     z-index: 1
//   thead tr:first-child th
//     top: 0

//   /* this is when the loading indicator appears */
//   &.q-table--loading thead tr:last-child th
//     /* height of all previous header rows */
//     top: 48px
//
</style>
