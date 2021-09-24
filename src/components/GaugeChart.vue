<template>
  <VueSvgGauge
    :start-angle="-90"
    :end-angle="90"
    :value="chartValue"
    :separator-step="1"
    :min="0"
    :max="10"
    :gauge-color="[
      { offset: 0, color: '#347AB0' },
      { offset: 100, color: '#8CDFAD' },
    ]"
    :scale-interval="10"
    >{{ chartValue }}</VueSvgGauge
  >
</template>

<script>
import axios from "axios";
import { VueSvgGauge } from "vue-svg-gauge";
import { mixin as VueTimers } from "vue-timers";

export default {
  mixins: [VueTimers],
  name: "hello",
  components: { VueSvgGauge },
  props: ["rn"],
  data() {
    return {
      chartValue: 0,
    };
  },
  timers: {
    addData: { time: 5000, autostart: true, repeat: true },
  },
  methods: {
    addData() {
      const headers = {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
        Accept: "application/json",
      };
      const sensor1url =
        "http://203.253.128.139:7599/wdc_base/kwater-test/" +
        this.rn +
        "/report/la";
      axios.get(sensor1url, { headers }).then((sensorResponse) => {
        for (const [sensorkey, sensorvalue] of Object.entries(
          sensorResponse.data
        )) {
          for (const [sensorkey2, sensorvalue2] of Object.entries(
            sensorvalue
          )) {
            if (sensorkey2 == "con") {
              this.chartValue = sensorvalue2;
            }
          }
        }
      });
    },
  },
  mounted() {
    this.addData();
  },
};
</script>

<style scoped>
</style>