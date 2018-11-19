<template>
    <div>
      <MHeader :back="true">列表页</MHeader>
      <div class="content" ref="scroll" @scroll="loadMore">
        <ul>
          <router-link v-for="(book, index) in books" :to="{name:'detail',params:{bid:book.bookId}}" :key="index" tag="li">
            <img v-lazy="book.bookCover" alt="">
            <div>
              <h4>{{book.bookName}}</h4>
              <p>{{book.bookInfo}}</p>
              <b>￥{{book.bookPrice}}</b>
              <!-- 阻止事件冒泡 -->
              <button @click.stop="deleteBook(book.bookId)">删除</button>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
</template>
<script>
    import MHeader from '../base/MHeader.vue';
    import {removeBook, pagination} from '../api';
    export default {
        data() {
            return {
              books: [],
              offset: 0,
              hasMore: true,
              isLoading: false
            }
        },
        mounted(){
          let scroll = this.$refs.scroll;
          let top = scroll.offsetTop;
          let distance = 0;
          scroll.addEventListener('touchstart', (e)=>{
            if (scroll.scrollTop !=0 || scroll.offsetTop !== top){return}
            let start = e.touches[0].pageY;
            let move = (e)=>{
              let current = e.touches[0].pageY;
              distance = current - start;
              if (distance > 0){
                if (distance <= 50){
                  scroll.style.top = distance + top + 'px';
                } else {
                  distance = 50;
                  scroll.style.top = top + 50 + 'px';
                }

              } else {
                scroll.removeEventListener('touchmove', move);
                scroll.removeEventListener('touchend', end);
              }
            };
            let end = ()=>{
              clearTimeout(this.timer1);
              this.timer1 = setInterval(()=>{
                if (distance <= 0){
                  clearTimeout(this.timer1);
                  distance = 0;
                  scroll.style.top = top + 'px';
                  this.books = [];
                  this.offset = 0;
                  this.getData();
                }
                distance -= 1;
                scroll.style.top = top + distance + 'px';
              }, 1);
            };
            scroll.addEventListener('touchmove', move);
            scroll.addEventListener('touchend', end);
          }, false);
        },
        created(){
          this.getData();
        },
        methods: {
          async getData(){
            this.isLoading = true;
            if (this.hasMore && this.isLoading){
              let {hasMore, books} = await pagination(this.offset);
              this.books = [...this.books, ...books];
              this.hasMore = hasMore;
              this.offset = this.books.length;
              this.isLoading = false;
            }
          },
          async deleteBook(id){
            await removeBook(id);

            //=> 要删除前台数据
            this.books = this.books.filter(item=>item.bookId !== id);
          },
          loadMore(){
            clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
              let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll;
              if (scrollTop + clientHeight + 20 >= scrollHeight){
                this.getData();
              }
            }, 60);
          }
        },
        computed: {},
        components: {
          MHeader
        }
    }
</script>
<style scoped lang="less">
  .content {
    ul {
      padding: 10px;
      li {
        display: flex;
        padding-bottom: 10px;
        border-bottom: 1px solid #f1f1f1;
        img {
          width: 120px;
          height: 150px;
        }
      }
    }
    h4 {
      font-size: 20px;
      line-height: 25px;
      margin-bottom: 10px;
    }
    p{
      color: #2a2a2a;
      line-height: 25px;
      margin-bottom: 10px;
    }
    b {
      color: red;
    }
    button {
      font-size: 9.6px;
      height: 24px;
      line-height: 24px;
      padding: 0 24px;
      color: #fff;
      background-color: #FF4351;
      font-weight: 300;
      text-decoration: none;
      text-align: center;
      margin-top: 10px;
      display: block;
      appearance: none;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      outline: none;
    }
  }
</style>
