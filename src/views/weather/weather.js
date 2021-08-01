import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { onMounted, ref, watch } from "vue";
import { URL } from "../../const/Constant";
import useLoading from "../../common/useLoading";

export default {
  setup() {
    const store = useStore();
    const city = ref("yangon");

    onMounted(() => {
      searchCity();
    });

    const searchCity = () => {
      store.dispatch("weatherModule/getWeatherByCity", city.value);
    };

    let weather = computed(() => {
      return store.state.weatherModule.weather;
    });

    let searchName = ref("");

    const weatherIcon = computed(() => {
      if (store.state.weatherModule.weather.weather !== undefined) {
        return `${URL.WEATHER_ICON}${store.state.weatherModule.weather.weather[0].icon}@2x.png`;
      } else {
        return "";
      }
    });

    const search = () => {
      store.dispatch("weatherModule/getWeatherByCity", searchName.value);
    };

    const clear = () => {
      searchName.value = "";
    };

    const { commonState, errorStatus } = useLoading();

    watch(
      () => {
        return { ...commonState };
      },
      (newValue) => {
        if (newValue.error === true) {
          setTimeout(() => {
            errorStatus({ error: false });
          }, 3000);
        }
      }
    );

    // watch(commonState.error, (newStatus) => {
    //   if (newStatus === true) {
    //     setTimeout(() => errorStatus({ error: false }), 5000);
    //   }
    // });

    return {
      weather,
      searchName,
      weatherIcon,
      search,
      clear,
      commonState,
    };
  },
};
