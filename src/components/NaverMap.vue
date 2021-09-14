<template>
  <div id="wrap" class="section">
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="naverMap" class="map"></div>
      </el-col>
      <el-col :span="12">
        <div class="name2">탁도 센서</div>
        <div v-for="sensor in sensorInfoList" :key="sensor.rn">
          <div class="request">
            <el-row :gutter="20">
              <el-col :span="4" class="content">
                <el-button type="success" @click="goCenter(sensor)">{{
                  sensor.rn
                }}</el-button>
              </el-col>
              <el-col :span="16">
                <LineChart v-bind:rn="sensor.rn" class="chart"> </LineChart>
              </el-col>
            </el-row>
            <br />
          </div>
          <br />
        </div>
        <el-row :gutter="20">
          <el-col :span="2" class="content2"></el-col>
          <el-col :span="18" class="content2"> </el-col>
        </el-row>

        <el-button type="success" v-on:click="click">File Download</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "./LineChart.vue";

var map = null;

export default {
  name: "hello",
  components: { LineChart },
  data() {
    return {
      headers: {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
        Accept: "application/json",
        "Content-Type": "application/json; ty=4",
      },
      baseURL: "http://203.253.128.139:7599",
      sensorList: [],
      sensorInfoList: [],
      icon: "",
    };
  },
  methods: {
    getSensors() {
      axios
        .get(this.baseURL + "/wdc_base/kwater-test", {
          headers: this.headers,
          params: {
            fu: 1,
            ty: 3,
            lvl: 1,
          },
        })
        .then((response) => {
          for (const [key, value] of Object.entries(response.data)) {
            this.sensorList = value;
            for (const i of this.sensorList) {
              this.getSensorInfo(i);
            }
          }
        });
    },
    getSensorInfo(sensorAddress) {
      axios
        .get(this.baseURL + "/" + sensorAddress, {
          headers: this.headers,
        })
        .then((response) => {
          for (const [key, value] of Object.entries(response.data)) {
            this.sensorInfoList.push({
              address: sensorAddress,
              rn: value.rn,
              loc: value.loc.crd,
            });
          }
        });
      this.getSensorValue(sensorAddress);
    },
    goCenter(sensor) {
      map = new naver.maps.Map(document.getElementById("naverMap"), {
        center: new naver.maps.LatLng(sensor.loc[1], sensor.loc[0]),
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.RIGHT_TOP,
        },
      });
      this.makeMarker(sensor);
    },
    getSensorValue(sensorAddress) {
      var sensorValue;
      axios
        .get(this.baseURL + "/" + sensorAddress + "/report/la", {
          headers: this.headers,
        })
        .then((response) => {
          for (const [key, value] of Object.entries(response.data)) {
            sensorValue = value.con;
            axios
              .get(this.baseURL + "/" + sensorAddress + "/config/la", {
                headers: this.headers,
              })
              .then((response) => {
                for (const [key2, value2] of Object.entries(response.data)) {
                  if (
                    sensorValue < value2.con.validMax &&
                    sensorValue > value2.con.validMin
                  ) {
                    this.icon =
                      "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
                  } else {
                    this.icon =
                      "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
                  }
                }
              });
          }
        });
    },
    makeMarker(sensor) {
      var position = new naver.maps.LatLng(sensor.loc[1], sensor.loc[0]);
      var marker = new naver.maps.Marker({
        map: map,
        position: position,
        icon: this.icon,
      });
      var info;
      axios
        .get(this.baseURL + "/" + sensor.address + "/la", {
          headers: this.headers,
        })
        .then((response) => {
          for (const [key, value] of Object.entries(response.data)) {
            info = new naver.maps.InfoWindow({
              content:
                '<div class="iw_inner">' +
                "   <h3>" +
                sensor.rn +
                "</h3>" +
                "<p>sensorId: " +
                value.con.sensorId +
                "<p>contact: " +
                value.con.contact +
                "<p>manager: " +
                value.con.manager +
                "<p>managmentDep: " +
                value.con.managmentDep +
                "<p>manufacturer: " +
                value.con.manufacturer +
                "<br />" +
                "   </p>" +
                "</div>",
            });
          }
        });

      new naver.maps.Event.addListener(marker, "click", function (e) {
        if (info.getMap()) {
          info.close();
        } else {
          info.open(map, marker);
        }
      });
    },
    click() {
      const blob = new Blob(["res.data"], { type: "text/csv;charset=utf8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "this.csv";
      link.click();
      URL.revokeObjectURL(link.href);
    },
  },
  mounted() {
    this.getSensors();
    map = new naver.maps.Map(document.getElementById("naverMap"), {
      center: new naver.maps.LatLng(37.41229359683477, 127.12875737226753),
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.RIGHT_TOP,
      },
    });
  },
};
</script>

<style scoped>
#naverMap {
  height: 80vh;
  min-height: 800px;
  width: 100%;
}

.map {
  margin: 20px;
}

.request {
  background: #e5e9f2;
  text-align: left;
  margin: 0px 80px 0px 50px;
  font-size: 1.3em;
  padding: 1em;
  min-height: 50px;
}

.name2 {
  font-size: 1.5em;
  margin: 0px 0px 0px 30px;
  text-align: left;
  padding: 1em;
}

.content {
  border-radius: 4px;
  min-height: 36px;
}

.content2 {
  margin: 0px 30px 0px 0px;
  border-radius: 4px;
  min-height: 1px;
}

.chart {
  height: 120px;
}
</style>