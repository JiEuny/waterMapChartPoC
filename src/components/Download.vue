<template>
  <el-button class="bt" type="success" v-on:click="click">Download </el-button>
</template>

<script>
import axios from "axios";

export default {
  name: "hello",
  props: ["rn"],
  data() {
    return {
      headers: {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
      },
      baseURL: "http://203.253.128.139:7599",
      title: "sensor2.csv",
    };
  },
  methods: {
    click() {
      axios
        .get("http://203.253.128.179/kwater/" + this.rn + ".csv", {
          responseType: "blob",
        })
        .then((response) => {
          console.log(response);
          const blob = new Blob([response.data], {
            type: "text/csv",
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = this.rn + ".csv";
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.bt {
  margin: 30px 0px 0px 0px;
}
</style>