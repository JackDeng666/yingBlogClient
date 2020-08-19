<template>
  <div class="common-box">
    <div class="label">
      <a>分类</a>
    </div>
    <div class="blog-type" v-for="(item,index) in blogTypes" :key="index">
      <i class="fa fa-tag"></i>
      <a :href="`#/bloglist?blogTypeId=${item.id}`">{{item.type_name}}</a>
    </div>
  </div>
</template>

<script>
import { Blog } from "@/utils/api"
export default {
  data() {
    return {
      blogTypes: '', //博客分类
    }
  },
  async created(){
    let result = await Blog.getBlogTypes()
    this.blogTypes = result.data.data
  }
}
</script>

<style scoped>
.common-box{
  margin-bottom: 10px;
}
.label{
  display: block;
}
.blog-type{
  display: inline-block;
}
.blog-type{
  padding: 0px 10px;
}
.blog-type a{
  color: #333333;
  padding-left: 5px;
}
.blog-type i{
  color: #333333;
}
.blog-type:hover a,.blog-type:hover i{
  color: #FF0033;
}
</style>