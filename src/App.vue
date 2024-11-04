<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$store.dispatch('login/getConfigToken')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
/*引入公共样式部分 */
@import 'uview-ui/index.scss';
// 全局公共样式
@import '@/assets/scss/index.scss';
</style>
