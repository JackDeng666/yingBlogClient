<!-- 首页 -->
<template>
  <div>
    <introduce></introduce>
  </div>
</template>

<script>
const introduce = () => import('@/components/temCpn/introduce')
export default {
  name: "home",
  components: {
    introduce
  }
}
</script>

