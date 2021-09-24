<template>
  <div id="wrap" class="section">
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="request">
          <el-row :gutter="20">
            <el-col :span="6" class="content">
              <el-select v-model="value" placeholder="Select" default-first-option="true">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" class="content"></el-col>
            <el-col :span="6" class="content"></el-col>
            <el-col :span="1" class="content"></el-col>
            <el-col :span="4">
              <el-button
                type="info"
                @click="
                  config(
                    sensorID,
                    manufacturer,
                    geoX,
                    geoY,
                    managmentDep,
                    manager,
                    contact
                  )
                "
              >
                설정
              </el-button>
            </el-col>
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
          sensorID: "",
          manufacturer: "",
          geoX: "",
          geoY: "",
          managmentDep: "",
          manager: "",
          contact: "",
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
        "Content-Type": "application/json; ty=4",
      },
      baseURL: "http://203.253.128.139:7599",
      sensorList: [],
      sensorInfoList: [],
      sensorID: "",
      manufacturer: "",
      geoX: "",
      geoY: "",
      managmentDep: "",
      manager: "",
      contact: "",
      //
    };
  },
  methods: {
    infoSetting() {
      // console.log("value" + this.value);
      const sensor1url =
        "http://203.253.128.139:7599/wdc_base/kwater-test/sensor1/la";
      axios.get(sensor1url, { headers: this.headers }).then((response) => {
        // console.log(response.data);
        for (const [sensorkey, sensorvalue] of Object.entries(response.data)) {
          for (const [sensorkey2, sensorvalue2] of Object.entries(
            sensorvalue
          )) {
            if (sensorkey2 == "con") {
              this.sensorID = sensorvalue2.sensorID;
              this.manufacturer = sensorvalue2.manufacturer;
              this.managmentDep = sensorvalue2.managmentDep;
              this.manager = sensorvalue2.manager;
              this.contact = sensorvalue2.contact;
              // this.options[0].sensorID = sensorvalue2.sensorId;
              // this.options[0].manufacturer = sensorvalue2.manufacturer;
              // this.options[0].managmentDep = sensorvalue2.managmentDep;
              // this.options[0].manager = sensorvalue2.manager;
              // this.options[0].contact = sensorvalue2.contact;
            }
          }
        }
      });
      const sensor1 =
        "http://203.253.128.139:7599/wdc_base/kwater-test/sensor1";
      axios.get(sensor1, { headers: this.headers }).then((response) => {
        // console.log(response.data)
        for (const [sensorkey, sensorvalue] of Object.entries(response.data)) {
          for (const [sensorkey2, sensorvalue2] of Object.entries(
            sensorvalue
          )) {
            if (sensorkey2 == "loc") {
              this.geoX = sensorvalue2.crd[0];
              this.geoY = sensorvalue2.crd[1];
              this.options[0].sensorID = sensorvalue2.sensorId;
              this.options[0].manufacturer = sensorvalue2.manufacturer;
              this.options[0].managmentDep = sensorvalue2.managmentDep;
              this.options[0].manager = sensorvalue2.manager;
              // this.options[0].contact = sensorvalue2.contact;
              // this.options[0].contact.reactiveSetter(sensorvalue2.contact)
            }
          }
        }
      });
      console.log(this.options[0]);
    },
    //
    config: function (
      sensorID,
      manufacturer,
      geoX,
      geoY,
      managmentDep,
      manager,
      contact
    ) {
      // console.log(sensorID + ", " + manufacturer + ", " + managmentDep);
      const sensor1url =
        "http://203.253.128.139:7599/wdc_base/kwater-test/" + this.value;
      const body = {
        "m2m:cin": {
          con: {
            sensorID: sensorID,
            manufacturer: manufacturer,
            managmentDep: managmentDep,
            manager: manager,
            contact: contact,
          },
        },
      };
      axios
        .post(sensor1url, body, { headers: this.headers })
        .then((response) => {
          console.log(response.data);
          // console.log("value" + this.value);
        });
    },
  },
  mounted() {
    this.infoSetting();
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