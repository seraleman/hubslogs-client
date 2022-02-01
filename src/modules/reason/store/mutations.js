export function someMutation(/* state */) {}

export function createReason(state, reason) {
  state.reasons = [reason, ...state.reasons];
}

export function deleteReason(state, reason) {
  const idx = state.reasons.map((e) => e.id).indexOf(reason.id);
  state.reasons.splice(idx, 1);
}

export function setReasons(state, reasons) {
  state.reasons = reasons;
}

export function toggleIsLoadingReasons(state) {
  state.isLoadingReasons = !state.isLoadingReasons;
}

export function updateReason(state, args) {
  const { idx, reasonUpdated } = args;
  state.reasons[idx] = reasonUpdated;
}
