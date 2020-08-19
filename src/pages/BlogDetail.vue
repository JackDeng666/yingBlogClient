<template>
<div>
  <blog :blogId="$route.query.blogId"/>
  <div class="common-box">
    <div style="text-align:center;">
      <waterButton buttonName="发表bb" :isActive="isComment" @click.native="commentClick(null,null)"/>
    </div>
    <comment @ReplyClick="commentClick" :isComment="isComment" v-if="isLoadComment"/>
  </div>
  <el-dialog
    :close-on-click-modal="false"
    :lock-scroll="false"
    title="发表bb"
    :visible.sync="dialogVisible"
    width="30%">
    <textarea
      :placeholder="comment.nick_name ? '@'+comment.nick_name : 'bb此博客'"
      v-model="comment.content">
    </textarea>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelComment()">取消</el-button>
      <el-button type="primary" @click="sendComment()">发送</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { mapState } from "vuex"
import waterButton from "@/components/littleCpn/waterButton"
import { Comment } from "@/utils/api"
const blog = () => import('@/components/temCpn/blog')
const comment = () => import('@/components/temCpn/comment')
export default {
  components:{
    blog,
    comment,
    waterButton
  },
  data() {
    return {
      isLoadComment: true,
      dialogVisible: false,
      isComment: false,
      comment: {}
    }
  },
  computed: mapState([
    "userInfo",
    "hasLogin",
  ]),
  methods: {
    commentClick(id, nick_name){
      this.comment.reply_to = id
      this.comment.nick_name = nick_name
      if (this.hasLogin) {
        this.isComment = !this.isComment
        this.dialogVisible = true
      } else {
        this.$message.warning("请先登录才能bb")
      }
    },
    cancelComment(){
      this.comment.content = ""
      this.dialogVisible = false
      this.isComment = false
    },
    async sendComment(){
      let result = await Comment.addComment({
        userId: this.userInfo.id,
        blogId: this.$route.query.blogId,
        replyTo: this.comment.reply_to,
        content: this.comment.content
      })
      if(result.data.meta.status == 1){
        this.$message.success("bb成功")
        this.comment.content = ""
        this.isComment = false
        this.dialogVisible = false
        // 重载comment
        this.isLoadComment = false
        this.$nextTick(function(){
          this.isLoadComment = true
        })
      } else {
        this.$message.error("bb失败")
      }
    }
  }
}
</script>

<style scoped>
.common-box {
  margin-top: 30px;
}
textarea{
  display: block;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  margin: 5px 0;
  padding: 10px 10px;
  border: 1px solid #ddd;
}
</style>
