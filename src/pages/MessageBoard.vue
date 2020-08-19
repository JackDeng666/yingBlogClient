<!-- 赞赏页面 -->
<template>
<div>
  <send></send>
  <message></message>
</div>
</template>

<script>
const message = () => import('@/components/temCpn/message')
const send = () => import('@/components/temCpn/send')
export default {
  name: "messageboard",
  components: {
    message,
    send
  }
}
</script>
