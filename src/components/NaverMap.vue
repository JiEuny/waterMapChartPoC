<template>
  <div id="wrap" class="section">
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="naverMap" class="map"></div>
      </el-col>
      <el-col :span="12">
        <el-tabs
          type="border-card"
          class="tab"
          style="margin: 30px 30px 30px 30px"
        >
          <el-tab-pane label="센서 모니터링">
            <div style="margin: 30px 0px 30px 0px">
              <div v-for="sensor in sensorInfoList" :key="sensor.rn">
                <div class="request">
                      <Alarm v-bind:rn="sensor.rn"></Alarm>
                  <el-row :gutter="20">
                    <el-col :span="4">
                      <el-button
                        type="success"
                        @click="goCenter(sensor)"
                        class="bt"
                      >
                        {{ sensor.rn }}
                      </el-button>
                      <Download></Download>
                    </el-col>
                    <el-col :span="4">
                      <GaugeChart
                        v-bind:rn="sensor.rn"
                        class="chartGauge"
                      ></GaugeChart>
                    </el-col>
                    <el-col :span="16">
                      <LineChart v-bind:rn="sensor.rn" class="chart">
                      </LineChart>
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
            </div>
          </el-tab-pane>
          <el-tab-pane label="센서 범위 설정">
            <div style="margin: 30px 0px 30px 0px">
              <SensorRegist></SensorRegist>
            </div>
          </el-tab-pane>
          <el-tab-pane label="센서 정보 수정">
            <div style="margin: 30px 0px 30px 0px">
              <SensorInfo></SensorInfo>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "./LineChart.vue";
import SensorRegist from "./SensorRegist.vue";
import GaugeChart from "./GaugeChart.vue";
import SensorInfo from "./SensorInfo.vue";
import Download from "./Download.vue";
import Alarm from "./AlarmToggle.vue";

var map = null;

var newMark = [];
var rnList = [];
var map = null;
var markers = []

var lat,
  lng,
  cont = null;

export default {
  name: "hello",
  components: { LineChart, SensorRegist, GaugeChart, SensorInfo, Download, Alarm },
  data() {
    return {
      headers: {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      baseURL: "http://203.253.128.139:7599",
      sensorList: [],
      sensorInfoList: [],
      icon: "",
      isActive: false
    };
  },
  methods: {
    getSensors() {
      axios
        .get(this.baseURL + "/wdc_base/kwater-poc", {
          headers: this.headers,
          params: {
            fu: 1,
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
              address: sensorAddress, // "wdc_base/kwater-poc/sensor1"
              rn: value.rn, // "sensor1"
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
        .get(this.baseURL + "/" + sensorAddress + "/WtqltGnrlMesureIem", {
          headers: this.headers,
        })
        .then((response) => {
          for (const [key, value] of Object.entries(response.data)) {
            sensorValue = value.ntu;
            axios
              .get(this.baseURL + "/" + sensorAddress + "/WtqltMesureSetup", {
                headers: this.headers,
              })
              .then((response) => {
                for (const [key2, value2] of Object.entries(response.data)) {
                  if (
                    sensorValue < value2.maxValidNtu &&
                    sensorValue > value2.minValidNtu
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
      this.getSensorValue(sensor.address);
      var position = new naver.maps.LatLng(sensor.loc[1], sensor.loc[0]);
      var marker = new naver.maps.Marker({
        map: map,
        position: position,
        icon: this.icon,
      });
      var info;
      axios
        .get(this.baseURL + "/" + sensor.address, {
          headers: this.headers,
        })
        .then((response) => {
          for (const [key, value] of Object.entries(response.data)) {
            var infoContent = "";
            for (const lbl of value.lbl) {
              infoContent =
                infoContent +
                "<p>" +
                lbl.split(":")[0] +
                ": " +
                lbl.split(":")[1];
            }
            info = new naver.maps.InfoWindow({
              content:
                '<div class="iw_inner">' +
                "   <h3>" +
                sensor.rn +
                "</h3>" +
                infoContent +
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
    getBound() {
      map = new naver.maps.Map(document.getElementById("naverMap"), {
        center: new naver.maps.LatLng(37.41229359683477, 127.12875737226753),
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.RIGHT_TOP,
        },
      });

      naver.maps.Event.addListener(map, "bounds_changed", function (bounds) {
        const poly =
          "[[" +
          bounds.maxX() +
          "," +
          bounds.maxY() +
          "],[" +
          bounds.maxX() +
          "," +
          bounds.minY() +
          "],[" +
          bounds.minX() +
          "," +
          bounds.minY() +
          "],[" +
          bounds.minX() +
          "," +
          bounds.maxY() +
          "],[" +
          bounds.maxX() +
          "," +
          bounds.maxY() +
          "]]";

        const headers = {
          "X-M2M-RI": "12345",
          "X-M2M-Origin": "SM",
          Accept: "application/json",
        };
        const baseURL = "http://203.253.128.139:7599/wdc_base/kwater-test";
        const url = baseURL + "?gsf=1&gmty=3&rcn=8&geom=" + poly;
        axios.get(url, { headers }).then((response) => {
          for (const [key, value] of Object.entries(response.data)) {
            console.log(value);
            for (const [key2, value2] of Object.entries(value)) {
              for (const body of value2) {
                for (const [key3, value3] of Object.entries(body)) {
                  if (key3 == "loc") {
                    lat = value3.crd[1];
                    lng = value3.crd[0];
                  } else if (key3 == "rn") {
                    cont = value3;
                    rnList.push(cont);
                  }
                }
                newMark.push([lat, lng, cont]);
              }
            }
          }
        });
        var sensorurl;

        for (const rn of rnList) {
          sensorurl = baseURL + "/" + rn + "/report/la";
          axios.get(sensorurl, { headers }).then((sensorResponse) => {
            for (const [sensorkey, sensorvalue] of Object.entries(
              sensorResponse.data
            )) {
              for (const [sensorkey2, sensorvalue2] of Object.entries(
                sensorvalue
              )) {
                if (sensorkey2 == "con") {
                  console.log("rn: " + rn);

                  const sensorConfurl = baseURL + "/" + rn + "/config/la";
                  axios
                    .get(sensorConfurl, { headers })
                    .then((sensorResponse) => {
                      for (const [
                        sensorconkey,
                        sensorConfvalue,
                      ] of Object.entries(sensorResponse.data)) {
                        for (const [
                          sensorConfkey2,
                          sensorConfvalue2,
                        ] of Object.entries(sensorConfvalue)) {
                          if (sensorConfkey2 == "con") {
                            if (
                              sensorvalue2 < sensorConfvalue2.validMax &&
                              sensorvalue2 > sensorConfvalue2.validMin
                            ) {
                              console.log("gr: " + sensorvalue2);
                              for (var i = 0; i < newMark.length; i++) {
                                var eachMark = new naver.maps.Marker({
                                  position: new naver.maps.LatLng(
                                    newMark[i][0],
                                    newMark[i][1]
                                  ),
                                  map: map,
                                  icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                                });
                                markers.push(eachMark);
                              }
                            } else {
                              for (var i = 0; i < newMark.length; i++) {
                                var eachMark = new naver.maps.Marker({
                                  position: new naver.maps.LatLng(
                                    newMark[i][0],
                                    newMark[i][1]
                                  ),
                                  map: map,
                                  icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                });
                                markers.push(eachMark);
                              }
                            }
                          }
                        }
                      }
                    });
                }
              }
            }
          });
        }
      });
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
    this.getBound();
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
  min-width: 850px;
}

.content2 {
  margin: 0px 20px 0px 0px;
  border-radius: 4px;
  min-height: 1px;
}

.chart {
  height: 120px;
  margin: -10px 0px 0px 30px;
}

.chartGauge {
  height: 100px;
  margin: 30px 0px 0px 0px;
}

.bt {
  margin: 30px 0px 0px 0px;
}
</style>