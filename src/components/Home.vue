<template>
    <div>
      <MHeader :back="false">首页</MHeader>
      <div class="content">
        <Loading v-if="loading"></Loading>
        <template v-else>
          <Swiper :swiperSlides="sliders"></Swiper>
          <div class="container">
            <h3>热门图书</h3>
            <ul>
              <li v-for="hot in hotBooks">
                <img :src="hot.bookCover">
                <b>{{hot.bookName}}</b>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue'
  import Swiper from '../base/Swiper.vue'
  import Loading from '../base/Loading.vue'
  import {getAll} from '../api';
  export default {
      created(){
        this.getData();
      },
      data() {
          return {
            sliders: [],
            hotBooks: [],
            loading: true
          }
      },
      methods: {
        async getData(){
          let [sliders, hotBooks] = await getAll();
          this.sliders = sliders;
          this.hotBooks = hotBooks;
          //=> 轮播图和热门图书已经获取完成
          this.loading = false;
        }
      },
      computed: {},
      components: {
        MHeader,
        Swiper,
        Loading
      }
  }
</script>
<style scoped lang="less">
  h3 {
    color: #999;
    padding: 5px 0;
  }
  .container {
    width: 90%;
    margin: 0 auto;
    ul {
      display: flex;
      flex-wrap: wrap;
      li{
        margin: 5px 0;
        width: 50%;
        padding-bottom: 10px;
        text-align: center;
        font-size: 14px;
        color: #111;
        img {
          width: 100%;
        }
      }
    }
  }

</style>
