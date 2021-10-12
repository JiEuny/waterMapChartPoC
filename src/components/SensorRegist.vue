<template>
  <div id="wrap" class="section">
    <el-row :gutter="20">
      <el-col :span="20">
        <div v-for="sensor in sensorConfList" :key="sensor.rn">
          <div class="request">
            <el-row :gutter="20">
              <el-col :span="4" class="content">
                {{ sensor.sensorNum }}
              </el-col>
              <el-col :span="5" class="content">보고주기:</el-col>
              <el-col :span="4" class="content"></el-col>
              <el-col :span="1" class="content"></el-col>
              <el-col :span="4">
                <el-input
                  placeholder="Please input"
                  v-model="sensor.reportingPeriod"
                >
                </el-input>
              </el-col>
              <el-col :span="3" class="content">초</el-col>
            </el-row>
            <br />
            <el-row :gutter="20">
              <el-col :span="4" class="content"></el-col>
              <el-col :span="5" class="content">유효값 범위:</el-col>
              <el-col :span="4">
                <el-input placeholder="Please input" v-model="sensor.validMin">
                </el-input>
              </el-col>
              <el-col :span="1">~</el-col>
              <el-col :span="4">
                <el-input placeholder="Please input" v-model="sensor.validMax">
                </el-input>
              </el-col>
              <el-col :span="3">NTU</el-col>
              <el-col :span="2" class="content">
                <el-button
                  type="info"
                  @click="
                    setConfig(
                      sensor.rn,
                      sensor.reportingPeriod,
                      sensor.validMin,
                      sensor.validMax
                    )
                  "
                >
                  설정
                </el-button>
              </el-col>
            </el-row>
          </div>
          <br />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "hello",
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
      sensorConfList: [],
      sensorReportTime: 0,
      sensorMin: 0,
      sensorMax: 0,
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
        .get(this.baseURL + "/" + sensorAddress + "/config/la", {
          headers: this.headers,
        })
        .then((response) => {
          for (const [key, value] of Object.entries(response.data)) {
            this.sensorConfList.push({
              rn: sensorAddress, // "wdc_base/kwater-test/sensor1"
              sensorNum: sensorAddress.split("/")[2],
              reportingPeriod: value.con.reportingPeriod,
              validMax: value.con.validMax,
              validMin: value.con.validMin,
            });
          }
        });
    },
    setConfig(address, reportTime, min, max) {
      const sensorURL = this.baseURL + "/" + address + "/config";
      const body = {
        "m2m:cin": {
          con: {
            reportingPeriod: reportTime,
            validMin: min,
            validMax: max,
          },
        },
      };
      axios.post(sensorURL, body, { headers: this.headers }).then(() => {});
    },
  },
  mounted() {
    this.getSensors();
  },
};
</script>

<style scoped>
.request {
  background: #e5e9f2;
  text-align: left;
  margin: 0px 80px 0px 50px;
  font-size: 1.3em;
  padding: 1em;
  min-height: 50px;
  min-width: 850px;
}

.content {
  border-radius: 4px;
  min-height: 36px;
}
</style>