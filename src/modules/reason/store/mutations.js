import { store } from "quasar/wrappers";

export function someMutation(/* state */) {}

export function createReason(state, reason) {
  state.reasons = [reason, ...state.reasons];
}

export function resetReasonForm(state) {
  state.reasonForm = {
    description: "",
    id: "",
    name: "",
  };
}

export function resetTitle(state) {
  state.title = "";
}

export function setLabelNewBtn(state, label) {
  state.labelNewBtn = label;
}

export function setReasonForm(state, reason) {
  const { description, id, name } = reason;
  state.reasonForm = {
    description,
    id,
    name,
  };
}

export function setReasons(state, reasons) {
  state.reasons = reasons;
}

export function setTitle(state, title) {
  state.title = title;
}

export function setReasonById(state, reason) {
  state.reasonById = reason;
}

export function toggleIsReasonFormOpen(state) {
  state.isReasonFormOpen = !state.isReasonFormOpen;
}

export function toggleIsLoadingReasons(state) {
  state.isLoadingReasons = !state.isLoadingReasons;
}

export function updateReason(state, args) {
  const { idx, reasonUpdated } = args;
  state.reasons[idx] = reasonUpdated;
}

//twoWay
export function twoWayReasonForm(state, arg) {
  const { key, value } = arg;
  switch (key) {
    case "name":
      state.reasonForm.name = value;
      break;
    case "description":
      state.reasonForm.description = value;
      break;
  }
}
