<template>
  <div class="common-box">
    <div :class="dataLoaded?'round':'round loading'">
      <img :src="emojiImgList[imgId]" />
      <p>疯狂加载中...</p>
    </div>
    <div v-if="dataLoaded">
      <div class="label">
        <a :href="'#/bloglist?blogTypeId='+blog.blog_type_id">{{blog.type_name}}</a>
      </div>
      <div class="header">
        <h1>
          <a href="javascript:void(0);">{{blog.title}}</a>
        </h1>
      </div>
      <div class="blog-info">
        <h2>
          <div>
            <i class="fa fa-pencil-square-o"></i>
            <span v-html="showInitDate(blog.created_time,'ymd')"></span>
          </div>
          <div>
            <i class="fa fa-fw fa-eye"></i>
            <span>{{blog.browsed_count?blog.browsed_count:0}}</span>
          </div>
          <div>
            <i class="fa fa-fw fa-thumbs-up"></i>
            <span>{{blog.praised_count?blog.praised_count:0}}</span>
          </div>
          <div>
            <i class="fa fa-fw fa-star"></i>
            <span>{{blog.collected_count?blog.collected_count:0}}</span>
          </div>
        </h2>
      </div>
      <viewMd :mdContent="blog.md_content"/>
      <div class="blog-operate">
        <div class="praise-and-collect">
          <div :class="isPraise?'praise active':'praise'" @click="clickPraise">
            <i class="fa fa-fw fa-thumbs-up"></i>
            {{blog.praised_count?blog.praised_count:0}}
          </div>
          <div :class="isCollect?'collect active':'collect'" @click="clickCollect">
            <i class="fa fa-fw fa-star"></i>
            {{blog.collected_count?blog.collected_count:0}}
          </div>
        </div>
      </div>
      <p class="tip">(๑¯∀¯๑) (O_o)(o_O) (´･_･`) (๑¯∀¯๑) ╰(*°▽°*)╯ o(￣▽￣)ｄ</p>
      <div class="donate">
        <div style="text-align:center;">
          <waterButton buttonName="赞赏" :isActive="pdonate" @click.native="pdonate=!pdonate"/>
        </div>
        <div :class="pdonate?'donate-body donate-body-show':'donate-body'">
          <div class="donate-item">
            <img :src="AlipayReceivingCode" />
            <span>微信扫一扫，向我赞赏</span>
          </div>
          <div class="donate-item">
            <img :src="WechatReceivingCode" />
            <span>支付宝扫一扫，向我赞赏</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Blog, Statistics } from "@/utils/api";
import { initDate } from "@/utils/common";
import waterButton from "@/components/littleCpn/waterButton";
import viewMd from "@/components/temCpn/viewMd";

export default {
  props: ['blogId'],
  data() {
    return {
      dataLoaded: false,
      blog: {},
      pdonate: false, //打开赞赏控制
      isPraise: false,
      isCollect: false,
      imgId: 1
    };
  },
  components: {
    waterButton,
    viewMd
  },
  computed: mapState([
    "userInfo",
    "emojiImgList",
    "hasLogin",
    "AlipayReceivingCode",
    "WechatReceivingCode"
  ]),
  methods: {
    // 读取博客详情
    async readBlog() {
      let result = await Blog.getBlogDetail({ blogId: this.blogId });
      if (result.data.meta.status === 1) {
        this.blog = result.data.data.blogDetail;
      } else {
        this.blog = {
          type_name: "(●’◡’●)",
          created_time: new Date(),
          md_content: "没有这篇博客呢"
        };
      }
    },
    showInitDate(date, full) {
      return initDate(date, full);
    },
    // 读取本博客的点赞收藏信息
    async readPandC() {
      // 本篇博客的点赞收藏计数
      let res1 = await Statistics.getPraiseCountByBid({
        objectId: this.blog.id
      });
      this.blog.praised_count = res1.data.data.praisedNum;
      let res2 = await Statistics.getCollectCountByBid({
        objectId: this.blog.id
      });
      this.blog.collected_count = res2.data.data.collectedNum;
      // 用户对本篇博客的点赞收藏信息
      if (this.hasLogin) {
        // 是否点赞
        let res1 = await Statistics.getPraise({
          userId: this.userInfo.id,
          objectId: this.blog.id
        });
        let praiseData = res1.data.data.result;
        this.isPraise = false;
        if (praiseData.length && praiseData[0].is_cancelled === 0) {
          this.isPraise = true;
        }
        // 是否收藏
        let res2 = await Statistics.getCollect({
          userId: this.userInfo.id,
          objectId: this.blog.id
        });
        let collectData = res2.data.data.result;
        this.isCollect = false;
        if (collectData.length && collectData[0].is_cancelled === 0) {
          this.isCollect = true;
        }
      }
    },
    // 点赞
    async clickPraise() {
      if (this.hasLogin) {
        let result;
        if (this.isPraise) {
          // 已经点赞，取消点赞
          result = await Statistics.togglePraise({
            userId: this.userInfo.id,
            objectId: this.blog.id,
            isCancelled: 1
          });
          if (result.data.meta.status === 1) {
            this.$message.success("取消点赞成功");
            this.isPraise = false;
            this.blog.praised_count -= 1;
          } else {
            this.$message.error("取消点赞失败");
          }
        } else {
          // 没有点赞，进行点赞
          result = await Statistics.togglePraise({
            userId: this.userInfo.id,
            objectId: this.blog.id,
            isCancelled: 0
          });
          if (result.data.meta.status === 1) {
            this.$message.success("点赞成功");
            this.isPraise = true;
            this.blog.praised_count += 1;
          } else {
            this.$message.error("点赞失败");
          }
        }
      } else {
        this.$message.error("请先登录才能点赞");
      }
    },
    // 收藏
    async clickCollect() {
      if (this.hasLogin) {
        let result;
        if (this.isCollect) {
          // 已经收藏，取消收藏
          result = await Statistics.toggleCollect({
            userId: this.userInfo.id,
            objectId: this.blog.id,
            isCancelled: 1
          });
          if (result.data.meta.status === 1) {
            this.$message.success("取消收藏成功");
            this.isCollect = false;
            this.blog.collected_count -= 1;
          } else {
            this.$message.error("取消收藏失败");
          }
        } else {
          // 没有收藏，进行收藏
          result = await Statistics.toggleCollect({
            userId: this.userInfo.id,
            objectId: this.blog.id,
            isCancelled: 0
          });
          if (result.data.meta.status === 1) {
            this.$message.success("收藏成功");
            this.isCollect = true;
            this.blog.collected_count += 1;
          } else {
            this.$message.error("收藏失败");
          }
        }
      } else {
        this.$message.error("请先登录才能收藏");
      }
    },
    async addBlogBrowsed() {
      // 判断此博客是否在本次打开网页浏览过
      if (!sessionStorage.getItem("blog" + this.blog.id)) {
        let result = await Blog.addBlogBrowsedCount({
          browsedCount: this.blog.browsed_count + 1,
          blogId: this.blog.id
        });
        if (result.data.meta.status === 1) {
          sessionStorage.setItem("blog" + this.blog.id, 0);
        }
      }
    }
  },
  async created() {
    Statistics.addBlogBrowsedCount()
    this.imgId = parseInt(Math.random() * 6);
    await this.readBlog();
    await this.readPandC();
    await this.addBlogBrowsed();
    this.dataLoaded = true;
  }
};
</script>

<style scoped>
/* 博客标题 */
.header {
  position: relative;
  top: 0;
  text-align: center;
}
.header h1 a {
  color: #444;
  font-size: 20px;
  font-weight: 700;
}
/* 右侧表情&加载 */
.round {
  position: absolute;
  top: -10px;
  right: -10px;
  text-align: center;
}
.round img {
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 1px 1px 1px rgba(102, 102, 102, 1);
  animation: swing 3s infinite linear;
  transition: 1s;
}
.round p {
  display: none;
  font-size: 16px;
  font-weight: 700;
  color: #00a0e9;
}
.round.loading {
  position: relative;
  top: 0;
  left: 0;
}
.round.loading img {
  width: 120px;
  height: 120px;
  background: #fff;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 1px 1px 1px rgba(102, 102, 102, 1);
  animation: swing 1s infinite linear;
}
.round.loading p {
  display: block;
}
/* 博客统计信息 */
.blog-info {
  border-radius: 5px;
  text-align: center;
  margin: 20px 0;
}
.blog-info h2 {
  display: inline-block;
  line-height: 24px;
  text-align: center;
  font-size: 14px;
  border-top: 1px solid #f2f3f3;
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
/* 点赞收藏按钮 */
.blog-operate {
  margin: 20px 0;
  text-align: right;
}
.praise-and-collect {
  display: inline;
  font-size: 16px;
}
.praise,
.collect {
  display: inline-block;
  font-weight: bold;
  padding: 8px 20px;
  color: #b2bac2;
  border-radius: 1px;
  border: 1px solid #edeeef;
  cursor: pointer;
}
.collect {
  border-left: none;
}
.praise:hover,
.collect:hover {
  background-color: #fcfcfc;
}
.praise.active,
.collect.active {
  color: #23b5f8;
}
.tip {
  text-align: center;
  animation: clock-effect 5s infinite ease-in-out;
}
/* 赞赏 */
.donate {
  margin-top: 10px;
}
.donate-body {
  display: none;
  text-align: center;
}
.donate-body-show {
  display: block;
}
.donate-item {
  display: inline-block;
  width: 180px;
  box-sizing: border-box;
}
.donate-item img {
  width: 100%;
  display: block;
  height: auto;
}
.donate-item span {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
  text-align: center;
  font-size: 14px;
}
.donate-body .donate-item:first-of-type {
  color: #3ac541;
}
.donate-body .donate-item:nth-of-type(2) {
  color: #00a0e9;
}
</style>
