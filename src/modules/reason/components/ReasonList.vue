<template>
  <template v-if="!reason.id">
    <div class="row q-pa-md items-end justify-center">
      <reason-item
        v-for="{ id, name, description } in reasons"
        :key="id"
        :id="id"
        :name="name"
        :description="description"
        v-bind="$attrs"
      />
    </div>
  </template>

  <template v-else>
    <div class="row q-pa-md items-end justify-center">
      <reason :reason="reason" @go-back="resetReason()" />
    </div>
  </template>
</template>

<script>
import { defineComponent } from "vue";

import Reason from "./Reason.vue";
import ReasonItem from "./ReasonItem.vue";

export default defineComponent({
  name: "ReasonList",

  props: {
    resetReason: {
      required: true,
      type: Function,
    },
    reason: {
      default() {
        return {
          reason: {
            description: "",
            id: "",
            name: "",
          },
        };
      },
      required: true,
      type: Object,
    },
    reasons: {
      required: true,
      type: Array,
    },
  },

  components: {
    Reason,
    ReasonItem,
  },
});
</script>

<style lang="sass" scoped>

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
