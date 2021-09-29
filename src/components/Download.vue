<template>
  <!-- <el-button class="bt" type="success" :href="item" download
    >Download</el-button
  > -->
  <el-button class="bt" type="success" v-on:click="click"
    >Download</el-button
  >
</template>

<script>
import axios from "axios";
import csvFile from "../assets/logo.png";

export default {
  name: "hello",
  data() {
    return {
      headers: {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
      },
      baseURL: "http://203.253.128.139:7599",
      title: "sensor2.csv",
      item: csvFile,
    };
  },
  methods: {
    click() {
      axios
        // .get("http://203.253.128.179/kwater/sensor2.csv", {
        .get(this.item, {
          responseType: "blob",
        })
        .then(({ response }) => {
          const blob = new Blob([response], {
            type: "text/csv;charset=utf8",
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "sensor2.csv";
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
    },
    downloadFile() {
      axios({
        url: "./../assets/logo.png",
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "logo.png"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
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