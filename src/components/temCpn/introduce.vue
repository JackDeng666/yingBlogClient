<template>
<div class="common-box">
  <viewMd v-if="blog.md_content" :mdContent="blog.md_content"/>
</div>
</template>

<script>
import { Blog } from "@/utils/api"
import viewMd from "@/components/temCpn/viewMd"

export default {
  components: {
    viewMd
  },
  data() {
    return {
      blog: '',
    }
  },
  async created(){
    let result = await Blog.getBlogDetail({
      blogId: 1
    })
    this.blog = result.data.data.blogDetail
  }
}
</script>
