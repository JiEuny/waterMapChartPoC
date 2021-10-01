<template>
  <div id="wrap" class="section">
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="request">
          <el-row :gutter="20">
            <el-col :span="4" class="content"> Sensor 1 </el-col>
            <el-col :span="5" class="content">보고주기:</el-col>
            <el-col :span="4" class="content"></el-col>
            <el-col :span="1" class="content"></el-col>
            <el-col :span="4">
              <el-input placeholder="Please input" v-model="sensor1ReportTime">
              </el-input>
            </el-col>
            <el-col :span="3" class="content">초</el-col>
          </el-row>
          <br />
          <el-row :gutter="20">
            <el-col :span="4" class="content"></el-col>
            <el-col :span="5" class="content">유효값 범위:</el-col>
            <el-col :span="4">
              <el-input placeholder="Please input" v-model="sensor1min">
              </el-input>
            </el-col>
            <el-col :span="1">~</el-col>
            <el-col :span="4">
              <el-input placeholder="Please input" v-model="sensor1max">
              </el-input>
            </el-col>
            <el-col :span="3">NTU</el-col>
            <el-col :span="2" class="content">
              <el-button
                type="info"
                @click="config1(sensor1ReportTime, sensor1min, sensor1max)">
                설정
              </el-button>
            </el-col>
          </el-row>
        </div>
        <br />
        <div class="request">
          <el-row :gutter="20">
            <el-col :span="4" class="content">Sensor 2</el-col>
            <el-col :span="5" class="content">보고주기:</el-col>
            <el-col :span="4" class="content"></el-col>
            <el-col :span="1" class="content"></el-col>
            <el-col :span="4">
              <el-input placeholder="Please input" v-model="sensor2ReportTime">
              </el-input>
            </el-col>
            <el-col :span="4" class="content">초</el-col>
          </el-row>
          <br />
          <el-row :gutter="20">
            <el-col :span="4" class="content"></el-col>
            <el-col :span="5" class="content">유효값 범위:</el-col>
            <el-col :span="4">
              <el-input placeholder="Please input" v-model="sensor2min">
              </el-input>
            </el-col>
            <el-col :span="1">~</el-col>
            <el-col :span="4">
              <el-input placeholder="Please input" v-model="sensor2max">
              </el-input>
            </el-col>
            <el-col :span="3">NTU</el-col>
            <el-col :span="2" class="content">
              <el-button
                type="info"
                @click="config2(sensor2ReportTime, sensor2min, sensor2max)"
                >설정</el-button
              >
            </el-col>
          </el-row>
        </div>
        <br />
        <div class="request">
          <el-row :gutter="20">
            <el-col :span="4" class="content">Sensor 3</el-col>
            <el-col :span="5" class="content">보고주기:</el-col>
            <el-col :span="4" class="content"></el-col>
            <el-col :span="1" class="content"></el-col>
            <el-col :span="4">
              <el-input placeholder="Please input" v-model="sensor3ReportTime">
              </el-input>
            </el-col>
            <el-col :span="4" class="content">초</el-col>
          </el-row>
          <br />
          <el-row :gutter="20">
            <el-col :span="4" class="content"></el-col>
            <el-col :span="5" class="content">유효값 범위:</el-col>
            <el-col :span="4">
              <el-input placeholder="Please input" v-model="sensor3min">
              </el-input>
            </el-col>
            <el-col :span="1">~</el-col>
            <el-col :span="4">
              <el-input placeholder="Please input" v-model="sensor3max">
              </el-input>
            </el-col>
            <el-col :span="3">NTU</el-col>
            <el-col :span="2" class="content">
              <el-button
                type="info"
                @click="config3(sensor3ReportTime, sensor3min, sensor3max)"
                >설정</el-button
              ></el-col>
          </el-row>
        </div>
        <br />
        <div class="request">
          <el-row :gutter="20">
            <el-col :span="4" class="content">Sensor 4</el-col>
            <el-col :span="5" class="content">보고주기:</el-col>
            <el-col :span="4" class="content"></el-col>
            <el-col :span="1" class="content"></el-col>
            <el-col :span="4">
              <el-input placeholder="Please input" v-model="sensor4ReportTime">
              </el-input>
            </el-col>
            <el-col :span="4" class="content">초</el-col>
          </el-row>
          <br />
          <el-row :gutter="20">
            <el-col :span="4" class="content"></el-col>
            <el-col :span="5" class="content">유효값 범위:</el-col>
            <el-col :span="4">
              <el-input placeholder="Please input" v-model="sensor4min">
              </el-input>
            </el-col>
            <el-col :span="1">~</el-col>
            <el-col :span="4">
              <el-input placeholder="Please input" v-model="sensor4max">
              </el-input>
            </el-col>
            <el-col :span="3">NTU</el-col>
            <el-col :span="2" class="content">
              <el-button
                type="info"
                @click="config4(sensor4ReportTime, sensor4min, sensor4max)"
                >설정</el-button
              ></el-col>
          </el-row>
        </div>
        <el-row :gutter="20">
          <el-col :span="2" class="content2"></el-col>
          <el-col :span="18" class="content2"> </el-col>
        </el-row>
          <br />

        <el-button type="success" v-on:click="click">File Download</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

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
  data() {
    return {
      headers: {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
        // Accept: "application/json",
        // "Content-Type": "application/json; ty=4",
      },
      baseURL: "http://203.253.128.139:7599",
      response: "Response",
      polyPaths: [],
      sensor1ReportTime: 0,
      sensor2ReportTime: 0,
      sensor3ReportTime: 0,
      sensor4ReportTime: 0,
      sensor1min: 0,
      sensor2min: 0,
      sensor3min: 0,
      sensor4min: 0,
      sensor1max: 0,
      sensor2max: 0,
      sensor3max: 0,
      sensor4max: 0,
      value: "",
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
        });
    },
    config1: function (reportTime, min, max) {
      const headers = {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
        Accept: "application/json",
        "Content-Type": "application/json; ty=4",
      };
      const sensor1url =
        "http://203.253.128.139:7599/wdc_base/kwater-test/sensor1/config";
      const body = {
        "m2m:cin": {
          con: {
            reportingPeriod: reportTime,
            validMin: min,
            validMax: max,
          },
        },
      };
      axios.post(sensor1url, body, { headers }).then((response) => {
        // console.log(response.data);
      });
    },
    config2: function (reportTime, min, max) {
      // console.log(reportTime + ", " + min + ", " + max);
      const headers = {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
        Accept: "application/json",
        "Content-Type": "application/json; ty=4",
      };
      const sensor1url =
        "http://203.253.128.139:7599/wdc_base/kwater-test/sensor2/config";
      const body = {
        "m2m:cin": {
          con: {
            reportingPeriod: reportTime,
            validMin: min,
            validMax: max,
          },
        },
      };
      axios.post(sensor1url, body, { headers }).then((response) => {
        // console.log(response.data);
      });
    },
    config3: function (reportTime, min, max) {
      // console.log(reportTime + ", " + min + ", " + max);
      const headers = {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
        Accept: "application/json",
        "Content-Type": "application/json; ty=4",
      };
      const sensor1url =
        "http://203.253.128.139:7599/wdc_base/kwater-test/sensor3/config";
      const body = {
        "m2m:cin": {
          con: {
            reportingPeriod: reportTime,
            validMin: min,
            validMax: max,
          },
        },
      };
      axios.post(sensor1url, body, { headers }).then((response) => {
        // console.log(response.data);
      });
    },
    config4: function (reportTime, min, max) {
      // console.log(reportTime + ", " + min + ", " + max);
      const headers = {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
        Accept: "application/json",
        "Content-Type": "application/json; ty=4",
      };
      const sensor1url =
        "http://203.253.128.139:7599/wdc_base/kwater-test/sensor4/config";
      const body = {
        "m2m:cin": {
          con: {
            reportingPeriod: reportTime,
            validMin: min,
            validMax: max,
          },
        },
      };
      axios.post(sensor1url, body, { headers }).then((response) => {
        // console.log(response.data);
      });
    },
    configSetting() {
      const headers = {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
        Accept: "application/json",
      };
      const sensor1url =
        "http://203.253.128.139:7599/wdc_base/kwater-test/sensor1/config/la";
      axios.get(sensor1url, { headers }).then((sensorResponse) => {
        for (const [sensorkey, sensorvalue] of Object.entries(
          sensorResponse.data
        )) {
          for (const [sensorkey2, sensorvalue2] of Object.entries(
            sensorvalue
          )) {
            if (sensorkey2 == "con") {
              this.sensor1ReportTime = sensorvalue2.reportingPeriod;
              this.sensor1min = sensorvalue2.validMin;
              this.sensor1max = sensorvalue2.validMax;
            }
          }
        }
      });
      const sensor2url =
        "http://203.253.128.139:7599/wdc_base/kwater-test/sensor2/config/la";
      axios.get(sensor2url, { headers }).then((sensorResponse) => {
        for (const [sensorkey, sensorvalue] of Object.entries(
          sensorResponse.data
        )) {
          for (const [sensorkey2, sensorvalue2] of Object.entries(
            sensorvalue
          )) {
            if (sensorkey2 == "con") {
              this.sensor2ReportTime = sensorvalue2.reportingPeriod;
              this.sensor2min = sensorvalue2.validMin;
              this.sensor2max = sensorvalue2.validMax;
            }
          }
        }
      });
      const sensor3url =
        "http://203.253.128.139:7599/wdc_base/kwater-test/sensor3/config/la";
      axios.get(sensor3url, { headers }).then((sensorResponse) => {
        for (const [sensorkey, sensorvalue] of Object.entries(
          sensorResponse.data
        )) {
          for (const [sensorkey2, sensorvalue2] of Object.entries(
            sensorvalue
          )) {
            if (sensorkey2 == "con") {
              this.sensor3ReportTime = sensorvalue2.reportingPeriod;
              this.sensor3min = sensorvalue2.validMin;
              this.sensor3max = sensorvalue2.validMax;
            }
          }
        }
      });
      const sensor4url =
        "http://203.253.128.139:7599/wdc_base/kwater-test/sensor4/config/la";
      axios.get(sensor4url, { headers }).then((sensorResponse) => {
        for (const [sensorkey, sensorvalue] of Object.entries(
          sensorResponse.data
        )) {
          for (const [sensorkey2, sensorvalue2] of Object.entries(
            sensorvalue
          )) {
            if (sensorkey2 == "con") {
              this.sensor4ReportTime = sensorvalue2.reportingPeriod;
              this.sensor4min = sensorvalue2.validMin;
              this.sensor4max = sensorvalue2.validMax;
            }
          }
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
        const url =
          "http://203.253.128.139:7599/wdc_base/kwater-test?gsf=1&gmty=3&rcn=8&geom=" +
          poly;
        axios.get(url, { headers }).then((response) => {
          for (const [key, value] of Object.entries(response.data)) {
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
  },
  mounted() {
    map = new naver.maps.Map(document.getElementById("naverMap"), {
      center: new naver.maps.LatLng(37.41229359683477, 127.12875737226753),
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.RIGHT_TOP,
      },
    });
    this.configSetting();
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

.bt {
  margin: 90px 0px 50px 60px;
  float: left;
  font-size: 1.5em;
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

.name {
  font-size: 1.5em;
  margin: 90px 0px 0px 30px;
  text-align: left;
  padding: 1em;
}

.name2 {
  font-size: 1.5em;
  margin: 0px 0px 0px 30px;
  text-align: left;
  padding: 1em;
}
.chart {
  margin: 30px 0px 0px 30px;
  text-align: left;
}

.grid-content {
  min-height: 500px;
  max-height: 800px;
  padding: 1em;
  font-size: 1.5em;
  text-align: left;
}

.bg-purple-light {
  background: #e5e9f2;
  margin: 0px 80px 0px 50px;
  min-height: 700px;
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
</style>