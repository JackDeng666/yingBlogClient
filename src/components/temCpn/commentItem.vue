<template>
  <div>
    <div class="commentItem" v-for="(item,index) in commentChild" :key="index">
      <!-- 头像 -->
      <div class="left">
        <img v-if="item.avatar" :src="item.avatar"/>
        <img v-else src="img/comical.png"/>
      </div>
      <!-- 右侧内容 -->
      <div class="right">
        <!-- 用户姓名，评论时间，回复按钮 -->
        <p>
          <span class="name">{{item.nick_name}}</span>
          <span class="time">{{item.created_time}}</span>
          <span class="reply-btn" @click="PostItemReply(item.id,item.nick_name)">回复</span>
        </p>
        <!-- 评论内容 -->
        <div class="comment-content">
          <span style="color:#478ef0"  v-if="temp">@{{item.reply_to_nick_name}}</span>：{{item.content}}
        </div>
      </div>
      <!-- 3级评论下为回复某人，加temp=true区别 -->
      <commentchild-item :commentChild="item.replies" @postChild="postChild" :temp="true"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentchildItem",
  props: ["commentChild", "temp"],
  methods: {
    PostItemReply(id, nick_name) {
      // 往item提交和根提交
      this.$emit("postChild", id, nick_name);
      this.$emit("PostReply", id, nick_name);
    },
    // 接受子自己的点击
    postChild(id, nick_name) {
      this.PostItemReply(id, nick_name);
    }
  }
};
</script>
