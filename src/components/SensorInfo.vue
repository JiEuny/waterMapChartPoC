<template>
  <div id="wrap" class="section">
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="request">
          <el-row :gutter="20">
            <el-col :span="6" class="content">
              <el-select
                v-model="value"
                placeholder="Select"
                default-first-option="true"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" class="content">
              <el-button type="info" @click="configGet()">
                센서 불러오기
              </el-button>
            </el-col>
            <el-col :span="5" class="content">
              <el-button
                type="info"
                @click="
                  config(sensorID, manufacturer, managmentDep, manager, contact, geoX, geoY)
                "
              >
                센서 업데이트
              </el-button>
            </el-col>
            <el-col :span="1" class="content"></el-col>
            <el-col :span="4"> </el-col>
            <el-col :span="3" class="content"></el-col>
          </el-row>
          <br />
          <el-row :gutter="20">
            <el-col :span="4" class="content"></el-col>
            <el-col :span="5" class="content">센서 ID:</el-col>
            <el-col :span="1" class="content"></el-col>
            <el-col :span="6">
              <el-input placeholder="Please input" v-model="sensorID">
              </el-input>
            </el-col>
          </el-row>
          <br />
          <el-row :gutter="20">
            <el-col :span="4" class="content"></el-col>
            <el-col :span="5" class="content">제조사:</el-col>
            <el-col :span="1" class="content"></el-col>
            <el-col :span="6">
              <el-input placeholder="Please input" v-model="manufacturer">
              </el-input>
            </el-col>
          </el-row>
          <br />
          <el-row :gutter="20">
            <el-col :span="4" class="content"></el-col>
            <el-col :span="5" class="content">좌표계:</el-col>
            <el-col :span="1" class="content">X</el-col>
            <el-col :span="6">
              <el-input placeholder="Please input" v-model="geoX"> </el-input>
            </el-col>
          </el-row>
          <br />
          <el-row :gutter="20">
            <el-col :span="4" class="content"></el-col>
            <el-col :span="5" class="content"></el-col>
            <el-col :span="1" class="content">Y</el-col>
            <el-col :span="6">
              <el-input placeholder="Please input" v-model="geoY"> </el-input>
            </el-col>
          </el-row>
          <br />
          <el-row :gutter="20">
            <el-col :span="4" class="content"></el-col>
            <el-col :span="5" class="content">관리부서:</el-col>
            <el-col :span="1" class="content"></el-col>
            <el-col :span="6">
              <el-input placeholder="Please input" v-model="managmentDep">
              </el-input>
            </el-col>
          </el-row>
          <br />
          <el-row :gutter="20">
            <el-col :span="4" class="content"></el-col>
            <el-col :span="5" class="content">관리자:</el-col>
            <el-col :span="1" class="content"></el-col>
            <el-col :span="6">
              <el-input placeholder="Please input" v-model="manager">
              </el-input>
            </el-col>
          </el-row>
          <br />
          <el-row :gutter="20">
            <el-col :span="4" class="content"></el-col>
            <el-col :span="5" class="content">연락처:</el-col>
            <el-col :span="1" class="content"></el-col>
            <el-col :span="6">
              <el-input placeholder="Please input" v-model="contact">
              </el-input>
            </el-col>
          </el-row>
        </div>
        <br />
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
      options: [
        {
          value: "sensor1",
          label: "Sensor1",
        },
        {
          value: "sensor2",
          label: "Sensor2",
        },
        {
          value: "sensor3",
          label: "Sensor3",
        },
        {
          value: "sensor4",
          label: "Sensor4",
        },
      ],
      value: "",
      headers: {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SM",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      baseURL: "http://203.253.128.139:7599/wdc_base/kwater-poc/",
      sensorID: "",
      manufacturer: "",
      geoX: 0,
      geoY: 0,
      managmentDep: "",
      manager: "",
      contact: "",
    };
  },
  methods: {
    infoSetting() {
      const sensor1URL = this.baseURL + "sensor1";
      axios.get(sensor1URL, { headers: this.headers }).then((response) => {
        for (const [key, value] of Object.entries(response.data)) {
          this.geoX = value.loc.crd[0];
          this.geoY = value.loc.crd[1];
          for (const lbl of value.lbl) {
            if (lbl.split(":")[0] == "sensorID")
              this.sensorID = lbl.split(":")[1];
            else if (lbl.split(":")[0] == "manufacturer")
              this.manufacturer = lbl.split(":")[1];
            else if (lbl.split(":")[0] == "managmentDep")
              this.managmentDep = lbl.split(":")[1];
            else if (lbl.split(":")[0] == "manager")
              this.manager = lbl.split(":")[1];
            else if (lbl.split(":")[0] == "contact")
              this.contact = lbl.split(":")[1];
          }
        }
      });
    },
    config: function (sensorID, manufacturer, managmentDep, manager, contact, geoX, geoY) {
      const sensorURL = this.baseURL + this.value;
      const body = {
        "wat:wqmi": {
          lbl: [
            "sensorID:" + sensorID,
            "manufacturer:" + manufacturer,
            "managmentDep:" + managmentDep,
            "manager:" + manager,
            "contact:" + contact,
          ],
          loc: {
            typ: 1,
            crd: [
              geoX, geoY
            ]
          }
        },
      };
      axios.put(sensorURL, body, { headers: this.headers }).then(() => {});
    },
    configGet() {
      const sensor1URL = this.baseURL + this.value;
      axios.get(sensor1URL, { headers: this.headers }).then((response) => {
        for (const [key, value] of Object.entries(response.data)) {
          this.geoX = value.loc.crd[0];
          this.geoY = value.loc.crd[1];
          for (const lbl of value.lbl) {
            if (lbl.split(":")[0] == "sensorID")
              this.sensorID = lbl.split(":")[1];
            else if (lbl.split(":")[0] == "manufacturer")
              this.manufacturer = lbl.split(":")[1];
            else if (lbl.split(":")[0] == "managmentDep")
              this.managmentDep = lbl.split(":")[1];
            else if (lbl.split(":")[0] == "manager")
              this.manager = lbl.split(":")[1];
            else if (lbl.split(":")[0] == "contact")
              this.contact = lbl.split(":")[1];
          }
        }
      });
    },
  },
  mounted() {
    this.infoSetting();
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