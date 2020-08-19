<!-- 关于 -->
<template>
  <div>
    <myAbout></myAbout>
  </div>
</template>

<script>
const myAbout = () => import('@/components/temCpn/myAbout')
export default {
  name: "aboutme",
  methods: {},
  components: {
    myAbout
  },
}
</script>

<style>
</style>
