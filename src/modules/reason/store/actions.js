import backendEmulator from "./BackendEmulator";

export function someAction(/* context */) {}

// export function getReasonById({ commit }, id) {}

export const loadReasons = async ({ commit }) => {
  const { data } = await backendEmulator.reasons();
  const { reasons: reasonsData } = data;

  if (!reasonsData) {
    return commit("setReasons", []);
  }

  const reasons = [];
  for (let id of Object.keys(reasonsData)) {
    reasons.push({
      id,
      ...reasonsData[id],
    });
  }

  commit("setReasons", reasons);
};

// export async function loadReasond({ commit }) {
//   const { data } = await backendEmulator.reasons();

//   if (!data) {
//     return commit("reson/setEntries", []);
//   }

//   const reasons = [];
//   for (let id of Object.keys(data)) {
//     reasons.push({});
//   }
// }

const actions = {
  ejemplo3: {
    async actionA({ commit }) {
      commit("gotData", await getData());
    },
    async actionB({ dispatch, commit }) {
      await dispatch("actionA"); // wait for `actionA` to finish
      commit("gotOtherData", await getOtherData());
    },
  },

  ejemplo2: {
    actionA({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit("someMutation");
          resolve();
        }, 1000);
      });
    },
  },

  ejemplo1: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    },
  },
};
