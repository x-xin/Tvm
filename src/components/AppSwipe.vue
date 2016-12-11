<template>
    <div ref="swiper" class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in swiperinfo">
	            <img v-bind:src="item.imgsrc" v-bind:alt="item.alt">
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
			swiperinfo: [
				{
					imgsrc  :  "https://dummyimage.com/1080x720",
					alt     :  "alt说明"
				},
				{
					imgsrc  :  "https://dummyimage.com/1080x720",
					alt     :  "alt说明"
				},
				{
					imgsrc  :  "https://dummyimage.com/1080x720",
					alt     :  "alt说明"
				},
				{
					imgsrc  :  "https://dummyimage.com/1080x720",
					alt     :  "alt说明"
				},
				{
					imgsrc  :  "https://dummyimage.com/1080x720",
					alt     :  "alt说明"
				}
			]
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
		/*height: 720px;*/
		img{
			width: 100%;
		}
	}
</style>
