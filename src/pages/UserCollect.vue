<!-- 分类博客列表 -->
<template>
  <div>
    <blogList listType="byUserId" :userId="userInfo.id"></blogList>
  </div>
</template>

<script>
import { mapState } from "vuex"
const blogList = () => import('@/components/temCpn/blogList')
export default {
  computed: mapState(['userInfo']),
  components: {
    blogList
  }
}
</script>
