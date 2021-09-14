<template>
  <div id="app">
    <el-container>
      <el-aside class="header">
        <Header />
      </el-aside>
    </el-container>
      
      <router-view class="el-main"/>
  </div>
</template>

<script>
import NaverMap from "./components/NaverMap.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    NaverMap,
    Header,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font: inherit;
}

body {
  line-height: 1.4;
}

.logo-container {
  padding: 22px;
  background: #434a50;
}

.el-menu {
  border-right: 0 !important;
}

.el-main {
  background: #c5cfda;
  padding: 45px 0 45px 0;
} */

.el-aside {
  position: relative;
  color: white;
  min-width: 100%;
  min-height: 155px;
  background: #3b4346;
  /* border-bottom: solid 1px #272d30;
  box-shadow: inset 0px -1px 0px 0px #51575a;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.75); */
}

.header a {
  color: #fff;
  padding-right: 5px;
  text-decoration: none;
}

</style>
