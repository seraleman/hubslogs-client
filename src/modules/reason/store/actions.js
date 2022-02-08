import backendEmulator from "./BackendEmulator";

// export function someAction(/* context */) {}

export const loadReasons = async ({ commit }) => {
  const { data } = await backendEmulator.reasons();
  const { reasons: reasonsData } = data;

  if (!reasonsData) return;

  const reasons = [];
  for (let id of Object.keys(reasonsData)) {
    reasons.push({
      id,
      ...reasonsData[id],
    });
  }

  commit("setReasons", reasons);
};

export const deleteReason = async ({ commit }, id) => {
  const { data } = await backendEmulator.deleteReason();
  const { status } = data;

  if (status === 200) {
    commit("deleteReason", id);
    return true;
  }
};

export const createReason = async ({ commit }, reason) => {
  const { data } = await backendEmulator.createReason();
  const { status } = data;

  if (status === 200) commit("createReason", reason);
};

export const updateReason = async ({ commit }, args) => {
  const { data } = await backendEmulator.updateReason();
  const { status } = data;

  if (status === 200) commit("updateReason", args);
};
