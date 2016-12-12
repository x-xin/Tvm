<template>
    <div class="footer">
        技术支持：厦门欣欣信息有限公司&福建智慧旅游有限公司&nbsp;&nbsp;<a href="#">设置</a>
    </div>
</template>
<script>
export default {
  name: 'footer',
  data () {
    return {
      // 
    }
  }
}
</script>
<style lang="less">
    .footer{
        width: 100%;
        margin-top: 90px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        color: #999999;
        background-color: #fff;
        font-size: 20px;

        position: fixed;
        bottom: 0;
        left:0 ;

        a{
            color: #109afa;
        }
    }
</style>