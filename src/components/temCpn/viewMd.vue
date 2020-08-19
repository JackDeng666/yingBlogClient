<template>
  <div id="editormarkdown-view" class="em-view"></div>
</template>

<script>
  export default {
    props: {
      mdContent: {
        type: String,
        default: ""
      },
    },
    mounted(){
      // 显示富文本文章
      editormd.markdownToHTML("editormarkdown-view", {
        markdown: "[TOCM]\n\n" + this.mdContent, // 这里动态设置文本
        htmlDecode: "style,script,iframe", // 过滤掉危险的html标签
        emoji: true,  // 表情
        taskList: true, // 任务列表
        tocm: true, // 使用 [TOCM] 目录
      })
      // 让a标签点击都跳转新页面
      let view = document.getElementById("editormarkdown-view")
      let aTags = view.querySelectorAll("p>a")
      aTags.forEach(element => {
        element.target = "_blank"
      })
      // 让文章下面的图片都能放大
      let imgs = view.getElementsByTagName("img")
      imgs.forEach(element => {
        $(element).zoomify()
      })
    }
  }
</script>

<style>
/* 有bug重写属性 */
.em-view{
  padding: 0;
  overflow: visible;
}
.em-view ol{
  list-style: decimal;
}
.em-view ul{
  list-style: disc;
}
.editormd-html-preview .editormd-toc-menu>.markdown-toc>ul, .editormd-preview-container .editormd-toc-menu>.markdown-toc>ul {
  left: -1px;
  top: -1px;
  z-index: 100;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 3px 5px rgba(0,0,0,.2);
  list-style: none;
}
</style>