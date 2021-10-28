export const state = () => ({
  sum: 0,
});

export const mutations = {
  incrementMutation(state) {
      state.sum++
  },
  decrementMutation(state) {
      state.sum--
  },
}
