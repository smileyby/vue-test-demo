<template>
    <div>
      <MHeader>添加图书</MHeader>
      <div class="content">
        <ul>
          <li>
            <label for="bookCover">书的封面</label>
            <input type="text" v-model="book.bookCover" id="bookCover">
          </li>
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
            <button @click="add">确认添加</button>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  import {addBook} from "../api";
  export default {
      data() {
          return {
            book: {}
          }
      },
      methods: {
        async add(){
          await addBook(this.book);
          this.$router.push('/list');
        }
      },
      computed: {},
      components: {
        MHeader
      }
  }
</script>
<style scoped lang="less">
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
