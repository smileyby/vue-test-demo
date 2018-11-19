<template>
    <div class="header">
      <i class="iconfont icon-back" v-if="back" @click="goback"></i>
      <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
          back: {
            type: Boolean,
            default: false
          }
        },
        methods: {
          goback(){
            this.$router.go(-1);
          }
        }
    }
</script>
<style scoped lang="less">
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  background: #afd9ee;
  i {
    position: absolute;
    left: 10px;
    font-size: 20px;
  }
}
</style>
