<template>
	<view>
		<uni-card :is-shadow="false" is-full>
			<text class="uni-h6">此示例展示了聊天列表的使用场景。</text>
		</uni-card>
		<uni-section title="圆头像且不显示分割线" type="line">
			<uni-list :border="false">
				<uni-list-chat v-for="item in listData" :avatar-circle="true" :key="item.id" :title="item.author_name" :avatar="item.cover"
				 :note="item.title" :time="item.published_at" :clickable="false"></uni-list-chat>
			</uni-list>
		</uni-section>

		<uni-section title="带圆点" type="line">
			<uni-list>
				<uni-list-chat v-for="item in listData" :key="item.id" :title="item.author_name" :avatar="item.cover" :note="item.title"
				 :time="item.published_at" :badge-text="item.text" :clickable="false" badge-positon="left" badge-text="dot"></uni-list-chat>
			</uni-list>
		</uni-section>

		<uni-section title="自定义右侧内容" type="line">
			<uni-list>
				<uni-list-chat v-for="item in listData" :key="item.id" :title="item.author_name" :avatar="item.cover" :note="item.title"
				 badge-positon="left" :badge-text="item.text">
					<view class="chat-custom-right">
						<text class="chat-custom-text">刚刚</text>
						<uni-icons type="star-filled" color="#999" size="18"></uni-icons>
					</view>
				</uni-list-chat>
			</uni-list>
		</uni-section>

		<uni-section title="带通知角标的单头像聊天列表" type="line">
			<uni-list>
				<uni-list-chat v-for="item in listData" :key="item.id" :title="item.author_name" :avatar="item.cover" :note="item.title"
				 :time="item.published_at" :clickable="true" :badge-text="item.text" @click="onClick"></uni-list-chat>
			</uni-list>
		</uni-section>

		<uni-section title="带通知角标的多头像聊天列表" type="line">
			<uni-list>
				<uni-list-chat v-for="(item,index) in listData" :key="item.id" :title="item.author_name" :avatar="item.cover" :note="item.title"
				 :time="item.published_at" :clickable="true" :avatarList="avatar(index+1)" :badge-text="item.text" @click="onClick"></uni-list-chat>
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				UNITS: {
					'年': 31557600000,
					'月': 2629800000,
					'天': 86400000,
					'小时': 3600000,
					'分钟': 60000,
					'秒': 1000
				},
				listData: [],
				avatarList: [{
					url: '/static/logo.png'
				}, {
					url: '/static/logo.png'
				}, {
					url: '/static/logo.png'
				}]
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			onClick() {
				uni.showToast({
					title: '列表被点击',
					icon:'none'
				})
			},
			avatar(count) {
				let arr = []
				this.avatarList.forEach((item, index) => {
					if (index < count) {
						arr.push(item)
					}
				})
				return arr
			},
			getList() {
				var data = {
					column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};

				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					data: data,
					success: data => {
						if (data.statusCode == 200) {
							let list = this.setTime(data.data);
							list = this.reload ? list : this.listData.concat(list);
							list.map(item => {
								item.text = Math.floor(Math.random() * (1 - 20) + 20)
								return item
							})
							this.listData = this.getRandomArrayElements(list, 3)
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				});
			},
			getRandomArrayElements(arr, count) {
				var shuffled = arr.slice(0),
					i = arr.length,
					min = i - count,
					temp, index;
				while (i-- > min) {
					index = Math.floor((i + 1) * Math.random());
					temp = shuffled[index];
					shuffled[index] = shuffled[i];
					shuffled[i] = temp;
				}
				return shuffled.slice(min);
			},
			setTime(items) {
				var newItems = [];
				items.forEach(e => {
					newItems.push({
						author_name: e.author_name,
						cover: e.cover,
						id: e.id,
						post_id: e.post_id,
						published_at: this.format(e.published_at),
						title: e.title
					});
				});
				return newItems;
			},
			format(dateStr) {
				var date = this.parse(dateStr)
				var diff = Date.now() - date.getTime();
				if (diff < this.UNITS['天']) {
					return this.humanize(diff);
				}
				var _format = function(number) {
					return (number < 10 ? ('0' + number) : number);
				};
				return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDate()) + ' ' +
					_format(date.getHours()) + ':' + _format(date.getMinutes());
			},
			parse(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
				var a = str.split(/[^0-9]/);
				return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
			},

		}
	}
</script>

<style lang="scss" >
	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}
</style>
