<template>
    <div ref="swiper" class="swiper-container">
        <div class="swiper-wrapper">

            <div class="swiper-slide">
	            <img class="biglogo" src="../assets/banner/banner-1.jpg">
            </div>
            <div class="swiper-slide">
	            <img class="biglogo" src="../assets/banner/banner-2.jpg">
            </div>
            <div class="swiper-slide">
	            <img class="biglogo" src="../assets/banner/banner-3.jpg">
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
export default {
	name: 'swipe',
	data () {
		
		return {
			// 图片数据接口
			// swiperinfo: [
			// 	{
			// 		imgsrc  :  "../assets/banner/banner-1.jpg",
			// 		alt     :  "alt说明"
			// 	},
			// 	{
			// 		imgsrc  :  "../assets/banner/banner-2.jpg",
			// 		alt     :  "alt说明"
			// 	},
			// 	{
			// 		imgsrc  :  "../assets/banner/banner-3.jpg",
			// 		alt     :  "alt说明"
			// 	}
			// ]
		}

	},
	mounted () { // ready
		// console.log(this.$refs.swiper);
		let self = this;
		self.swiper = new Swiper(self.$refs.swiper, {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        loop: true,
			autoplay:3000,
			speed:1000
	    });
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	.swiper-container{
		width:100%;
		height: 750px;
		cursor: pointer;
		img{
			display: block;
			width: 100%;
			height: 750px;
		}
	}
</style>
