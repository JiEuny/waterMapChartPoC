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
                      <!-- <el-button
                        type="success"
                        @click="goCenter(sensor)"
                        class="bt"
                      >
                        Download
                      </el-button> -->
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

              <!-- <el-button type="success" v-on:click="click">
                File Download
              </el-button> -->
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
import Download from "./Download.vue"

var map = null;

var newMark = [];
var rnList = [];
var map = null;
var markers = [],
  infowindows = [];

var lat,
  lng,
  cont = null;

export default {
  name: "hello",
  components: { LineChart, SensorRegist, GaugeChart, SensorInfo, Download },
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
      this.getSensorValue(sensor.address);
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
                value.con.sensorID +
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
    download() {
      axios
        .get("http://203.253.128.179/kwater/test.csv", {
          //   headers: this.headers,
          responseType: "blob",
        })
        .then(({ response }) => {
          const blob = new Blob([response], {
            type: "text/csv;charset=utf8",
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "test.csv";
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
    },
    click() {
      axios
        .get("http://203.253.128.179/kwater/test.csv", {
          //   headers: this.headers,
          responseType: "blob",
        })
        .then(({ response }) => {
          const blob = new Blob([response], {
            type: "text/csv;charset=utf8",
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "test.csv";
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
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
        const url =
          "http://203.253.128.139:7599/wdc_base/kwater-test?gsf=1&gmty=3&rcn=8&geom=" +
          poly;
        axios.get(url, { headers }).then((response) => {
          for (const [key, value] of Object.entries(response.data)) {
            console.log(value)
            for (const [key2, value2] of Object.entries(value)) {
              for (const body of value2) {
                for (const [key3, value3] of Object.entries(body)) {
                  if (key3 == "loc") {
                    // console.log(value3.crd);

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
          sensorurl =
            "http://203.253.128.139:7599/wdc_base/kwater-test/" +
            rn +
            "/report/la";
          axios.get(sensorurl, { headers }).then((sensorResponse) => {
            // console.log(sensorResponse.data);
            for (const [sensorkey, sensorvalue] of Object.entries(
              sensorResponse.data
            )) {
              for (const [sensorkey2, sensorvalue2] of Object.entries(
                sensorvalue
              )) {
                if (sensorkey2 == "con") {
                  console.log("rn: " + rn);

                  const sensorConfurl =
                    "http://203.253.128.139:7599/wdc_base/kwater-test/sensor1/config/la";
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
                                var infowindow = new naver.maps.InfoWindow({
                                  content:
                                    '<div class="iw_inner">' +
                                    "   <h3>" +
                                    newMark[0][2] +
                                    "</h3>" +
                                    "   <p>value: " +
                                    sensorvalue2 +
                                    "<br />" +
                                    "   </p>" +
                                    "</div>",
                                });
                                new naver.maps.Event.addListener(
                                  eachMark,
                                  "click",
                                  function (e) {
                                    if (infowindow.getMap()) {
                                      infowindow.close();
                                    } else {
                                      infowindow.open(map, eachMark);
                                    }
                                    // console.log(infowindow);
                                  }
                                );
                                markers.push(eachMark);
                                infowindows.push(infowindow);
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
                                var infowindow = new naver.maps.InfoWindow({
                                  content:
                                    '<div class="iw_inner">' +
                                    "   <h3>" +
                                    newMark[0][2] +
                                    "</h3>" +
                                    "   <p>value: " +
                                    sensorvalue2 +
                                    "<br />" +
                                    "   </p>" +
                                    "</div>",
                                });

                                new naver.maps.Event.addListener(
                                  eachMark,
                                  "click",
                                  function (e) {
                                    if (infowindow.getMap()) {
                                      infowindow.close();
                                    } else {
                                      infowindow.open(map, eachMark);
                                    }
                                    // console.log(infowindow);
                                  }
                                );
                                markers.push(eachMark);
                                infowindows.push(infowindow);
                                console.log(markers);
                                console.log(infowindows);
                              }
                            }
                          }

                          //   for (var i = 0, ii = markers.length; i < ii; i++) {
                          //     naver.maps.Event.addListener(
                          //       markers[i],
                          //       "click",
                          //       function (e) {
                          //         var marker = markers[i],
                          //           infoWindow = infoWindows[i];

                          //         if (infoWindow.getMap()) {
                          //           infoWindow.close();
                          //         } else {
                          //           infoWindow.open(map, marker);
                          //         }
                          //       }
                          //     );
                          //   }
                        }
                      }
                    });
                }
              }
            }
          });
        }
      });
    }
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
  min-height: 50px;
  min-width: 850px;
}

.name2 {
  font-size: 1.5em;
  margin: 0px 0px 0px 30px;
  text-align: left;
  padding: 1em;
}

.content {
  border-radius: 4px;
  min-height: 30px;
}

.content2 {
  margin: 0px 20px 0px 0px;
  border-radius: 4px;
  min-height: 1px;
}

.chart {
  height: 120px;
  margin: 0px 0px 0px 30px;
}

.chartGauge {
  height: 100px;
  margin: 30px 0px 0px 0px;
}

.bt {
  margin: 30px 0px 0px 0px;
}
</style>