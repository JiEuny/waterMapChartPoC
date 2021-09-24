<template>
    <div>
        <h1 >K-Water PoC</h1>
        <el-menu mode="horizontal" default-active="2" class="nav"
          background-color="#3b4346" text-color="#fff" active-text-color="#ffd04b">

          <!-- <el-menu-item index="3">
            <router-link to="/sensorRegist" style="font-size:1.5em">센서 등록 및 승인</router-link>
          </el-menu-item>

          <el-menu-item aria-hidden="true"/>

          <el-menu-item index="4">
            <router-link to="/sensorStatus" style="font-size:1.5em">센서 상태 확인</router-link>
          </el-menu-item> -->

          <a/>

        </el-menu>
    </div>

</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
.el-menu.el-menu--horizontal {
    border-bottom: none;

}

h1 {
    position: absolute;
    bottom: 35px;
    left: 3%;
    font-size: 3em;
}

.nav {
    position: absolute;
    right: 0;
    bottom: 35px;
    font-size: 2.25em;
    margin-right: 20px;
}

</style>
