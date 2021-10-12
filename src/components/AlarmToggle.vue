<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="grid-content bg-purple">Alarm</div>
      </el-col>
      <el-col :span="2"
        ><div class="grid-content bg-purple">
          <el-tooltip :content="'Alarm status: ' + valueAlarm" placement="top">
            <el-switch
              v-model="valueAlarm"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="true"
              inactive-value="false"
              @change="alarmToggle"
            >
            </el-switch>
          </el-tooltip>
        </div>
      </el-col>
      <el-col :span="2"
        ><div class="grid-content bg-purple">Report</div>
      </el-col>
      <el-col :span="3"
        ><div class="grid-content bg-purple">
          <el-tooltip :content="'Report status: ' + valueReport" placement="top">
            <el-switch
              v-model="valueReport"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="true"
              inactive-value="false"
              @change="reportToggle"
            >
            </el-switch>
          </el-tooltip>
        </div>
      </el-col>
      <el-col :span="12"
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["rn"],
  data() {
    return {
      valueAlarm: "false",
      valueReport: "true",
      headers: {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      baseURL: "http://203.253.128.139:7599/wdc_base/kwater-poc/",
    };
  },
  methods: {
    getToggleInfo() {
      axios
        .get(this.baseURL + this.rn + "/WtqltMesureSetup", {
          headers: this.headers,
        })
        .then((response) => {
          for (const [key, value] of Object.entries(response.data)) {
            if (value.alarmActvty == true) this.valueAlarm = "true";
            else if (value.alarmActvty == false) this.valueAlarm = "false";
            if (value.reprtActvty == true) this.valueReport = "true";
            else if (value.reprtActvty == false) this.valueReport = "false";
          }
        });
    },
    alarmToggle(valueAlarm) {
      const body = {
        "wat:alsw": {},
      };
      axios
        .put(this.baseURL + this.rn + "/WtqltMesureSetup/AlarmSwitch", body, {
          headers: this.headers,
        })
        .then(() => {});
    },
    reportToggle(valueReport) {
      const body = {
        "wat:rpsw": {},
      };
      axios
        .put(this.baseURL + this.rn + "/WtqltMesureSetup/MsrinsreprtSwitch", body, {
          headers: this.headers,
        })
        .then(() => {});
    },
  },
  mounted() {
    this.getToggleInfo();
  },
};
</script>

<style scoped>
.content {
  margin: 0px 0px 0px 0px;
  border-radius: 4px;
  min-height: 1px;
}
</style>