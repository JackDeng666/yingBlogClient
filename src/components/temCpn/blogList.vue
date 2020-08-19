<!-- 博客列表 -->
<template>
<div>
  <div v-if="!hasData" class="common-box">
    <p>没有数据呢...</p>
  </div>
  <div v-if="dataLoaded">
    <div class="common-box" v-for="(item,index) in blogList" :key="'blog'+index">
      <!-- 分类标签 -->
      <div class="label">
        <a :href="'#/bloglist?blogTypeId='+item.blog_type_id">{{item.type_name}}</a>
      </div>
      <!-- 博客标题，点击跳转 -->
      <h1><a :href="`#/blogdetail?blogId=${item.id}`">{{item.title}}</a></h1>
      <!-- 博客描述 -->
      <div class="describe-content">
        <p>{{item.describe}}</p>
      </div>
      <!-- 博客小信息 -->
      <div class="blog-info">
        <h2>
          <div>
            <i class="fa fa-pencil-square-o"></i>
            写于
            <span v-html="showInitDate(item.created_time,'ymd')"></span>
          </div><div>
            <i class="fa fa-fw fa-eye"></i>
            被围观
            <span>{{item.browsed_count?item.browsed_count:0}}</span>
            次
          </div>
        </h2>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        :current-page="1"
        @current-change="pageChange"
        :page-size="pageSize"
        :total="total"
        layout="total, prev, pager, next, jumper"
        background>
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { Blog } from '@/utils/api'
import { initDate } from '@/utils/common'
export default {
  name: "blogList",
  props:['listType','userId','blogTypeId'],
  data() {
    return {
      hasData: true,
      dataLoaded: false, 
      pageSize: 10,
      total: 0,
      blogList: []
    }
  },
  methods: {
    // 读取博客列表
    async readBlogList(currentPage, pageSize){
      let result
      // 根据类型还是用户收藏
      if(this.listType==='byBlogType'){
        if(this.blogTypeId == null){
          result = await Blog.getBlogList({status:1,currentPage,pageSize})
        }else{
          result = await Blog.getBlogListByType({typeId:this.blogTypeId,status:1,currentPage,pageSize})
        }
      }else{
        result = await Blog.getCollectBlogListByUid({userId:this.userId,currentPage,pageSize})
      }
      if(result.data.meta.status != 0){
        this.total = result.data.data.total
        this.blogList = result.data.data.blogList
      }else{
        this.hasData = false
      }
    },
    // 页数改变
    pageChange(val){
      this.readBlogList(val,this.pageSize)
    },
    showInitDate(oldDate, full) {
      return initDate(oldDate,full)
    }
  },
  async mounted(){
    await this.readBlogList(1,this.pageSize)
    this.dataLoaded = true
  }
}
</script>

<style scoped>
.common-box{
  margin-bottom: 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  position: relative;
}
/* .common-box:hover::after */
.common-box:hover::before{
  display: block;
}
.common-box::before{
  display: none;
  content: '';
  position: absolute;
  right: -4px;
  top: 0;
  width: 4px;
  height: 100%;
  background: rgb(255, 0, 85);
}
/* .common-box::after{
  display: none;
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background: rgba(255, 0, 85, 0.02);
  pointer-events: none;
} */
h1 a{
  color: #0984e3;
  font-size: 20px;
  font-weight: 600;
}
h1:hover a{
  color: #18436e;
  text-decoration: underline;
}
.describe-content{
  margin-top: 10px;
  font-size: 15px;
  color: #555;
}
.pagination {
  text-align: center;
  width: 100%;
}
/* 博客统计信息 */
.blog-info {
  display: inline-block;
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px solid #f2f3f3;
}
.blog-info h2 {
  line-height: 24px;
  text-align: center;
  font-size: 14px;
}
.blog-info h2 div {
  display: inline-block;
  font-weight: bold;
  padding: 3px 10px;
  color: #b2bac2;
  border-radius: 1px;
  border: 1px solid #edeeef;
  border-right: none;
}
.blog-info h2 div:last-child {
  border-right: 1px solid #edeeef;
}
.blog-info h2 div:hover {
  background: #fcfcfc;
}
.blog-info h1 a {
  color: black;
}
</style>
