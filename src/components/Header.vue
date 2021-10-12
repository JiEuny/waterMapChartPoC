<template>
  <div>
    <h1>K-Water PoC</h1>
    <el-menu
      mode="horizontal"
      default-active="2"
      class="nav"
      background-color="#3b4346"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <a />
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Header",
};
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
</style>
