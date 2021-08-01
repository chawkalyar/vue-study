import weatherAPI from "../../api/weather";
import useLoading from "../../common/useLoading";
const { loadingStatus, errorStatus } = useLoading();
const weatherModule = {
  namespaced: true,
  state: () => ({
    weather: {},
  }),
  mutations: {
    getWeatherByCity(state, weatherData) {
      state.weather = weatherData;
    },
  },
  actions: {
    getWeatherByCity({ commit }, city) {
      loadingStatus({ loading: true });
      weatherAPI
        .getWeatherByCity(city)
        .then((response) => {
          commit("getWeatherByCity", response.data);
        })
        .catch(() => errorStatus({ error: true }))
        .finally(() => {
          loadingStatus({ loading: false });
        });
    },
  },
};

export default weatherModule;
