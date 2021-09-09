<template>
  <div id="wrap" class="section">
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="naverMap" class="map"></div>
      </el-col>
      <!-- <el-button class="bt" type="success" @click="geoQuery">
        geo-query 실행
      </el-button> -->
      <el-col :span="12">
        <div class="name2">탁도값 설정</div>
        <div class="request">
          <el-row :gutter="20">
            <el-col :span="4" class="content"
              >Sensor 1
              <!-- <el-select v-model="value" placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> -->
            </el-col>
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
                @click="config1(sensor1ReportTime, sensor1min, sensor1max)"
                >설정</el-button
              >
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
              <el-button type="info"
                @click="config2(sensor2ReportTime, sensor2min, sensor2max)"
                >설정</el-button>
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
              <el-button type="info">설정</el-button>
            </el-col>
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
              <el-button type="info">설정</el-button>
            </el-col>
          </el-row>
        </div>
        <el-row :gutter="20">
          <el-col :span="2" class="content2"></el-col>
          <el-col :span="18" class="content2">
            <!-- <HelloWorld></HelloWorld> -->
            <LineChart> </LineChart>
          </el-col>
        </el-row>

        <el-button type="success" v-on:click="click">File Download</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "./LineChart.vue";

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
  components: { LineChart },
  data() {
    return {
      response: "Response",
      polyPaths: [],
      sensor1ReportTime: "",
      sensor2ReportTime: "",
      sensor3ReportTime: "",
      sensor4ReportTime: "",
      sensor1min: "",
      sensor2min: "",
      sensor3min: "",
      sensor4min: "",
      sensor1max: "",
      sensor2max: "",
      sensor3max: "",
      sensor4max: "",
      value: "",
    };
  },
  methods: {
    config1: function (reportTime, min, max) {
      console.log(reportTime + ", " + min + ", " + max);
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
        console.log(response.data);
      });
    },
    config2: function (reportTime, min, max) {
      console.log(reportTime + ", " + min + ", " + max);
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
        console.log(response.data);
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
    },
    getBound() {
      //   console.log("rhkdus: " + sen1min);
      map = new naver.maps.Map(document.getElementById("naverMap"), {
        center: new naver.maps.LatLng(37.41229359683477, 127.12875737226753),
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.RIGHT_TOP,
        },
      });

      naver.maps.Event.addListener(map, "bounds_changed", function (bounds) {
        // console.log(bounds);
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
        // console.log(poly);

        const headers = {
          "X-M2M-RI": "12345",
          "X-M2M-Origin": "SM",
          Accept: "application/json",
        };
        const url =
          "http://203.253.128.139:7599/wdc_base/kwater-test?gsf=1&gmty=3&rcn=8&geom=" +
          poly;
        axios.get(url, { headers }).then((response) => {
          //   console.log(response.data);

          for (const [key, value] of Object.entries(response.data)) {
            //   console.log(key)
            for (const [key2, value2] of Object.entries(value)) {
              // console.log(key2+": "+ value2)
              for (const body of value2) {
                // console.log(body)
                for (const [key3, value3] of Object.entries(body)) {
                  if (key3 == "loc") {
                    console.log(value3.crd);

                    lat = value3.crd[1];
                    lng = value3.crd[0];
                    // console.log(value3.crd[1]);
                    // console.log(value3.crd[0]);
                  } else if (key3 == "rn") {
                    cont = value3;
                    // console.log(cont);
                    rnList.push(cont);
                    // contList.push(cont);
                  }
                }
                newMark.push([lat, lng, cont]);
              }
            }
          }
        });
        var sensorurl;

        for (const rn of rnList) {
          //   console.log(rn);
          //   http://203.253.128.139:7599/wdc_base/kwater-test/sensor1/config/la
          sensorurl =
            "http://203.253.128.139:7599/wdc_base/kwater-test/" +
            rn +
            "/report/la";
          //   console.log(sensorurl);
          axios.get(sensorurl, { headers }).then((sensorResponse) => {
            console.log(sensorResponse.data);
            for (const [sensorkey, sensorvalue] of Object.entries(
              sensorResponse.data
            )) {
              // console.log(sensorkey)
              for (const [sensorkey2, sensorvalue2] of Object.entries(
                sensorvalue
              )) {
                // console.log(sensorvalue2)
                if (sensorkey2 == "con") {
                //   console.log("sen: " + sensorvalue2);

                  const sensorConfurl =
                    "http://203.253.128.139:7599/wdc_base/kwater-test/sensor1/config/la";
                  //   console.log(sensorurl);
                  axios
                    .get(sensorConfurl, { headers })
                    .then((sensorResponse) => {
                      // console.log(sensorResponse.data);
                      for (const [
                        sensorconkey,
                        sensorConfvalue,
                      ] of Object.entries(sensorResponse.data)) {
                        // console.log(sensorkey)
                        for (const [
                          sensorConfkey2,
                          sensorConfvalue2,
                        ] of Object.entries(sensorConfvalue)) {
                          //   console.log("sen: "+sensorkey2);
                          if (sensorConfkey2 == "con") {
                            // console.log("min: " + sensorConfvalue2.validMin);
                            var contentString = [
                              '<div class="iw_inner">',
                              "   <h3>" + newMark[0][2] + "</h3>",
                              "   <p>value: " + sensorvalue2 + "<br />",
                              "   </p>",
                              "</div>",
                            ].join("");

                            if (
                              sensorvalue2 < sensorConfvalue2.validMax &&
                              sensorvalue2 > sensorConfvalue2.validMin
                            ) {
                              for (var i = 0; i < newMark.length; i++) {
                                var eachMark = new naver.maps.Marker({
                                  position: new naver.maps.LatLng(
                                    newMark[i][0],
                                    newMark[i][1]
                                  ),
                                  map: map,
                                  icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                                });
                                //   console.log(newMark)
                                var infowindow = new naver.maps.InfoWindow({
                                  content: contentString,
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
                                    console.log(infowindow);
                                  }
                                );
                                markers.push(eachMark);
                                infowindows.push(infowindow);
                              }
                            } else {
                              //   console.log("no")

                              for (var i = 0; i < newMark.length; i++) {
                                var eachMark = new naver.maps.Marker({
                                  position: new naver.maps.LatLng(
                                    newMark[i][0],
                                    newMark[i][1]
                                  ),
                                  map: map,
                                  icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                });
                                //   console.log(newMark)
                                var infowindow = new naver.maps.InfoWindow({
                                  content: contentString,
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
                                    console.log(infowindow);
                                  }
                                );
                                markers.push(eachMark);
                                infowindows.push(infowindow);
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