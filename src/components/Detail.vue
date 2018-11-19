<template>
    <div class="detail">
      <MHeader :back="true">详情</MHeader>
      <ul>
        <li>
          <label for="bookName">书的名字</label>
          <input type="text" v-model="book.bookName" id="bookName">
        </li>
        <li>
          <label for="bookInfo">书的信息</label>
          <input type="text" v-model="book.bookInfo" id="bookInfo">
        </li>
        <li>
          <label for="bookPrice">书的价格</label>
          <input type="text" v-model.number="book.bookPrice" id="bookPrice">
        </li>
        <li>
          <button @click="update">确认修改</button>
        </li>
      </ul>
    </div>
</template>
<script>
import MHeader from '../base/MHeader.vue';
import {getOneBook, updateBook} from "../api";

export default {
    data() {
        return {
          book: {}
        }
    },
    created(){
      this.getData();
    },
    watch: {
      //=> 检测路径变化，自动获取数据
      $route(){
        this.getData();
      }
    },
    methods: {
      async getData(){
         this.book = await getOneBook(this.bid);
         //=> 如果是空对象需要跳转回列表页
        Object.keys(this.book).length > 0 ?void(0):this.$router.push('/list');
      },
      async update(){
        await updateBook(this.bid, this.book);
        this.$router.push('/list');
      }

    },
    computed: {
      bid(){ //=> 将路径参数的id映射到bid上
        return this.$route.params.bid;
      }
    },
    components: {
      MHeader
    }
}
</script>
<style scoped lang="less">
  .detail {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background: #ffffff;
  }
  ul {
    margin: 50px 10px 0 10px;
    li {
      label {
        display: block;
        font-size: 25px;
      }
      input {
        width: 100%;
        height: 25px;
      }
      button {
        font-size: 9.6px;
        width: 100%;
        height: 40px;
        line-height: 24px;
        padding: 0 24px;
        color: #fff;
        background-color: #FF4351;
        font-weight: 300;
        text-decoration: none;
        text-align: center;
        margin: 10px auto;
        display: block;
        appearance: none;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        outline: none;
      }
    }
  }
</style>
