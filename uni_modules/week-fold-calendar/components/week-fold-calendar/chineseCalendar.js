import { formattedDate } from './dateManage.js'

const lunarArray = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
	0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
	0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
	0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
	0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
	0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
	0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
	0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
	0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
	0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
	0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
	0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
	0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
	0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
	0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
	0x14b63
]

// 中文日期
function chineseDay(m, d) {
	d = Math.floor(d)
	const nStr1 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
	const nStr2 = ['初', '十', '廿', '三十', '']
	let month = ''
	let day = ''
	
	if (m > 10) {
		month = '十' + nStr1[m - 10] + '月'
	} else {
		month = nStr1[m] + '月'
	}
	
	switch (d) {
		case 10:
			day = '初十'
			break;
		case 20:
			day = '二十'
			break;
		case 30:
			day = '三十'
			break;
		default:
			day += nStr2[Math.floor(d / 10)]
			day += nStr1[d % 10]
	}
	
	const fullDate = month + day
	
	if(month === '一月') {
		month = '正月'
	}
	if(month === '十一月') {
		month = '冬月'
	}
	if(month === '十二月') {
		month = '腊月'
	}
	
	if(day === '初一') {
		day = ''
	}
	
	return {
		month,
		day,
		fullDate
	}
}

// 获取农历 y年闰月 1-12, 没闰月返回 0
function leapMonth(y) {
	return lunarArray[y - 1900] & 0xf
}

// 获取农历 y年m月的总天数
function monthDays(y, m) {
	return (lunarArray[y - 1900] & (0x10000 >> m)) ? 30 : 29
}

// 获取农历 y年闰月的天数
function getLeapMonthDays(y) {
	if (leapMonth(y)) {
		return (lunarArray[y - 1900] & 0x10000) ? 30 : 29
	} else {
		return 0
	}
}

// 获取农历 y年的总天数
function getLunarYearDays(y) {
	let i, sum = 348
	for (i = 0x8000; i > 0x8; i >>= 1) {
		sum += (lunarArray[y - 1900] & i) ? 1 : 0
	}
	return sum + getLeapMonthDays(y)
}

// 获取农历日期
function getLunar(date) {
	let i, leap = 0, temp = 0
	const lunarData = {
		year: 0,
		month: 0,
		day: 0,
		isLeap: false, // 是否闰月
	}
	const baseDate = new Date(1900, 0, 31)
	let offset = (date - baseDate) / 86400000
	for (i = 1900; i < 2050 && offset > 0; i++) {
		temp = getLunarYearDays(i)
		offset -= temp
	}
	if (offset < 0) {
		offset += temp
		i--
	}

	lunarData.year = i
	leap = leapMonth(i)
	
	for (i = 1; i < 13 && offset > 0; i++) {
		if (leap > 0 && i == (leap + 1) && lunarData.isLeap == false) {
			--i
			lunarData.isLeap = true
			temp = getLeapMonthDays(lunarData.year)
		} else {
			temp = monthDays(lunarData.year, i)
		}
		if (lunarData.isLeap && i == (leap + 1)) {
			lunarData.isLeap = false
		}
		offset -= temp
	}

	if (offset == 0 && leap > 0 && i == leap + 1) {
		if (lunarData.isLeap) {
			lunarData.isLeap = false
		} else {
			lunarData.isLeap = true
			--i
		}
	}

	if (offset < 0) {
		offset += temp
		--i
	}
	lunarData.month = i
	lunarData.day = offset + 1
	
	return lunarData
}

function getChineseCalendar(date) {
	const targetDate = date ? new Date(date) : new Date()
	const lunarData = getLunar(targetDate)
	return {
		...chineseDay(lunarData.month, lunarData.day),
		lunarData
	}
}
export default getChineseCalendar