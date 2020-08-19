<!-- 分类博客列表 -->
<template>
  <div>
    <categoryLabel></categoryLabel>
    <blogList listType="byBlogType" :blogTypeId="$route.query.blogTypeId"></blogList>
  </div>
</template>

<script>
const blogList = () => import('@/components/temCpn/blogList')
const categoryLabel = () => import('@/components/temCpn/categoryLabel')
import { mapState } from "vuex"
export default {
  components: {
    blogList,
    categoryLabel
  }
}
</script>
