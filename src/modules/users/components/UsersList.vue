<template>
  <q-table
    class="my-sticky-header-table q-pa-md"
    no-data-label="Sin usuarios para mostrar"
    row-key="id"
    rows-per-page-label="Registros por página"
    selection="multiple"
    v-model:selected="selected"
    :columns="columns"
    :pagination="pagination"
    :rows="users"
    :selected-rows-label="getSelectedString"
    :visible-columns="myCols"
  />
</template>

<script>
import { defineComponent, watch } from "vue";

import useUser from "../composables/useUsers";

export default defineComponent({
  name: "UsersList",

  setup() {
    const { get, method } = useUser();

    const { columns, myCols, pagination, users, selection, title } = get;

    const {
      getSelectedString,
      setQuantityInSelection,
      setTitleBySelection,
      twoWay,
    } = method;

    const { selected } = twoWay; //Object from method

    watch(
      () => selection.value,
      (selection) => {
        setQuantityInSelection(selection);
        setTitleBySelection(selection);
      }
    );

    return {
      //get
      columns,
      myCols,
      pagination,
      users,

      // methods
      getSelectedString,

      //twoWay
      selected,
    };
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
</style>
