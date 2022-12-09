import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  // strict mode will prevent methods that will affect the state outside of mutations
  strict: true,
  state: {
    products: [
      { name: "Banana Skin", price: 20 },
      { name: "Shiny Star", price: 40 },
      { name: "Green Shells", price: 60 },
      { name: "Red Shells", price: 80 },
    ],
  },
  // functions to compute derived state based on store state
  getters: {
    saleProducts: (state) => {
      let saleProducts = state.products.map((product) => {
        return {
          name: "**" + product.name + "**",
          price: product.price / 2,
        };
      });
      return saleProducts;
    },
  },
  // mutations can be tracked in the Vuejs dev tools
  // shouldn't put async code in mutations since can be hard to track in dev tools
  mutations: {
    reducePrice: (state, payload) => {
      state.products.forEach((product) => {
        product.price -= payload;
      });
    },
  },
  // Good practice to dispatch an action that calls a mutation
  // HTTP requests should be sent from actions
  actions: {
    reducePrice: (context, payload) => {
      setTimeout(function () {
        // reach out for data
        context.commit("reducePrice", payload);
      }, 2000);
    },
  },
});
