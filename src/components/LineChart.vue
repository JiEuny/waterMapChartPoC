<template>
  <div class="my-app">
    <D3LineChart :config="chart_config" :datum="chart_data"></D3LineChart>
  </div>
</template>

<script>
import axios from "axios";
import { D3LineChart } from "vue-d3-charts";
import { mixin as VueTimers } from "vue-timers";

export default {
  mixins: [VueTimers],
  props: ['rn'],
  components: {
    D3LineChart,
  },
  timers: {
    addData: { time: 5000, autostart: true, repeat: true },
  },
  data() {
    return {
      sen1: "",
    //   sen2: "",
      chart_data: [],
      chart_config: {
        values: ["sensor1"],
        date: {
          key: "time",
          inputFormat: "%-I:%M:%S",
          outputFormat: "%-I:%M:%S",
        },
        points: {
          visibleSize: 3,
          hoverSize: 5,
        },
        axis: {
          yTicks: 2,
          yTitle: "탁도값",
          xTitle: "Time",
        },
        tooltip: {
          labels: ["Total hours", "Total production"],
        },
        // color: {
        //   scheme: ["#55D6BE", "#7D5BA6", "#DDDDDD", "#ACFCD9"],
        // },
        margin: {
          top: 10,
          right: 10,
          bottom: 180,
          left: 10,
        },
      },
      count: "",
    };
  },
  methods: {
    log() {
      console.log("timer");
    },
    addData() {
      let today = new Date();

      var hours = ("0" + today.getHours()).slice(-2);
      var minutes = ("0" + today.getMinutes()).slice(-2);
      var seconds = ("0" + today.getSeconds()).slice(-2);
      var now = hours + ":" + minutes + ":" + seconds;
      const headers = {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
        Accept: "application/json",
      };
      const sensor1url =
        "http://203.253.128.139:7599/wdc_base/kwater-test/"+ this.rn + "/report/la";
      axios.get(sensor1url, { headers }).then((sensorResponse) => {
        for (const [sensorkey, sensorvalue] of Object.entries(
          sensorResponse.data
        )) {
          for (const [sensorkey2, sensorvalue2] of Object.entries(
            sensorvalue
          )) {
            if (sensorkey2 == "con") {
              this.sen1 = sensorvalue2;
            }
          }
        }
      });
      this.chart_data.push({
        sensor1: this.sen1,
        time: now,
      });
    },
  },
  mounted() {},
};
</script>

