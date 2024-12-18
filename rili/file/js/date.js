//修改时一定要标注好注释！不然我有时候读不懂逻辑反而要重写...本文件位于./file/js/中，注意路径问题。其为单独js，外联需../
let currentDate = new Date(); // 当前日期
let displayDate = new Date(); // 显示的日期

// 日程数据
const scheduleData = [
    {
        title: "FurryGooo", // 标题
        description: "FurryGooo 冬日集会", // 描述
        image: "/api/placeholder/600/400", // 图片链接
        link: "https://www.bilibili.com/opus/1000012699584692229", // 链接
        location: "广州·花都皇冠假日酒店", // 地点
        startDate: "2025-02-07 00:00", // 开始时间
        endDate: "2025-02-10 00:00" // 结束时间
    },
    {
        title: "示例日程-此处为标题部分", // 标题
        description: "示例日程-此处为展开菜单栏（悬浮窗）部分", // 描述
        image: "/api/placeholder/600/400", // 图片链接
        link: "https://example.com", // 链接
        location: "示例日程-此处为地点部分", // 地点
        startDate: "2024-11-23 10:00", // 开始时间
        endDate: "2024-11-23 12:00" // 结束时间
    }
];

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    initCalendar(); // 初始化日历
    initScheduleList(); // 初始化日程列表
    updateCurrentDate(); // 更新当前日期
});

// 改变月份
function changeMonth(delta) {
    displayDate.setMonth(displayDate.getMonth() + delta); // 增加或减少月份
    initCalendar(); // 重新初始化日历
}

// 改变年份
function changeYear(delta) {
    displayDate.setFullYear(displayDate.getFullYear() + delta); // 增加或减少年份
    initCalendar(); // 重新初始化日历
}

// 跳转到今天
function goToToday() {
    displayDate = new Date(); // 设置为当前日期
    initCalendar(); // 重新初始化日历
}

// 更新当前日期显示
function updateCurrentDate() {
    const now = new Date(); // 获取当前时间
    const options = { // 日期格式选项
        weekday: 'long', // 星期几
        year: 'numeric', // 年
        month: 'long', // 月
        day: 'numeric' // 日
    };
    document.getElementById('current-date').textContent =
        now.toLocaleDateString('zh-CN', options); // 更新当前日期文本
}

// 初始化日历
function initCalendar() {
    const year = displayDate.getFullYear(); // 获取年份
    const month = displayDate.getMonth(); // 获取月份

    document.getElementById('month-year').textContent =
        `${year}年${month + 1}月`; // 更新显示的年月

    const firstDay = new Date(year, month, 1); // 获取该月的第一天
    const lastDay = new Date(year, month + 1, 0); // 获取该月的最后一天
    const startDay = firstDay.getDay(); // 获取第一天是星期几
    const totalDays = lastDay.getDate(); // 获取该月的总天数

    const calendarGrid = document.getElementById('calendar-grid'); // 获取日历网格
    calendarGrid.innerHTML = ''; // 清空网格内容

    // 填充空白单元格
    for (let i = 0; i < startDay; i++) {
        const cell = document.createElement('div'); // 创建单元格
        cell.className = 'calendar-cell empty'; // 设置类名
        calendarGrid.appendChild(cell); // 添加到网格
    }

    // 遍历每一天
    for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement('div'); // 创建单元格
        cell.className = 'calendar-cell'; // 设置类名

        const currentDateStr = new Date(year, month, day).toDateString(); // 当前日期字符串
        const todayStr = new Date().toDateString(); // 今天的日期字符串

        if (currentDateStr === todayStr) { // 如果是今天
            cell.classList.add('today'); // 添加今天的类名
        }

        const dateDiv = document.createElement('div'); // 创建日期显示
        dateDiv.className = 'date'; // 设置类名
        dateDiv.innerHTML = `
            <span class="date-number">${day}</span> <!-- 显示日期 -->
            ${currentDateStr === todayStr ? '<i class="fas fa-circle today-indicator"></i>' : ''} <!-- 今天的指示器 -->
        `;
        cell.appendChild(dateDiv); // 添加日期到单元格

        // 过滤出该天的日程
        const schedules = scheduleData.filter(s => {
            const scheduleDate = new Date(s.startDate); // 获取日程开始时间
            return scheduleDate.getFullYear() === year &&
                scheduleDate.getMonth() === month &&
                scheduleDate.getDate() === day; // 判断是否在同一天
        });

        if (schedules.length > 0) { // 如果有日程
            const scheduleDiv = document.createElement('div'); // 创建日程显示
            scheduleDiv.className = 'schedule'; // 设置类名
            scheduleDiv.innerHTML = `
                <i class="fas fa-calendar-check"></i> <!-- 日程图标 -->
                <span>${schedules.length}个日程</span> <!-- 显示日程数量 -->
            `;
            cell.appendChild(scheduleDiv); // 添加日程到单元格
            cell.onclick = () => showSchedulePopup(schedules); // 点击单元格显示日程详情
        }

        cell.style.animationDelay = `${(startDay + day) * 0.05}s`; // 设置动画延迟
        calendarGrid.appendChild(cell); // 添加单元格到网格
    }
}

// 初始化日程列表
function initScheduleList() {
    const list = document.getElementById('schedule-list'); // 获取日程列表
    list.innerHTML = ''; // 清空列表内容

    const now = new Date(); // 获取当前时间
    const pastSchedules = []; // 存放过去的日程
    const upcomingSchedules = []; // 存放即将到来的日程

    // 遍历日程数据
    scheduleData.forEach(schedule => {
        const scheduleDate = new Date(schedule.startDate); // 获取日程开始时间
        if (scheduleDate < now) { // 如果是过去的日程
            pastSchedules.push(schedule); // 添加到过去日程
        } else {
            upcomingSchedules.push(schedule); // 添加到即将到来的日程
        }
    });

    // 按时间排序过去日程
    pastSchedules.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    // 按时间排序即将到来的日程
    upcomingSchedules.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    if (upcomingSchedules.length > 0) { // 如果有即将到来的日程
        const upcomingSection = document.createElement('div'); // 创建即将到来的日程部分
        upcomingSection.innerHTML = `
            <h2><i class="fas fa-calendar-alt"></i> 最近日程</h2> <!-- 标题 -->
        `;
        upcomingSchedules.forEach((schedule, index) => { // 遍历即将到来的日程
            const item = createScheduleItem(schedule, index); // 创建日程项
            upcomingSection.appendChild(item); // 添加到即将到来的日程部分
        });
        list.appendChild(upcomingSection); // 添加到日程列表
    }

    if (pastSchedules.length > 0) { // 如果有过去的日程
        const pastSection = document.createElement('div'); // 创建过去日程部分
        pastSection.innerHTML = `
            <h2><i class="fas fa-history"></i> 往期日程</h2> <!-- 标题 -->
        `;
        pastSchedules.forEach((schedule, index) => { // 遍历过去的日程
            const item = createScheduleItem(schedule, index); // 创建日程项
            pastSection.appendChild(item); // 添加到过去日程部分
        });
        list.appendChild(pastSection); // 添加到日程列表
    }
}

// 创建日程项
function createScheduleItem(schedule, index) {
    const item = document.createElement('div'); // 创建日程项容器
    item.className = 'schedule-item'; // 设置类名
    item.style.animationDelay = `${index * 0.1}s`; // 设置动画延迟

    const scheduleContent = document.createElement('div'); // 创建日程内容
    scheduleContent.className = 'schedule-content'; // 设置类名

    const startDate = new Date(schedule.startDate); // 获取开始时间
    const endDate = new Date(schedule.endDate); // 获取结束时间

    scheduleContent.innerHTML = `
        <h3><i class="fas fa-calendar-day"></i> ${schedule.title}</h3> <!-- 标题 -->
        <p><i class="fas fa-clock"></i> ${startDate.toLocaleString()} - ${endDate.toLocaleString()}</p> <!-- 时间 -->
    `;

    const scheduleIcon = document.createElement('i'); // 创建日程图标
    scheduleIcon.className = 'fas fa-chevron-right'; // 设置类名
    scheduleIcon.style.color = 'var(--text-light)'; // 设置颜色

    item.appendChild(scheduleContent); // 添加内容到日程项
    item.appendChild(scheduleIcon); // 添加图标到日程项
    item.onclick = () => showSchedulePopup([schedule]); // 点击显示日程详情

    return item; // 返回日程项
}

// 显示日程弹出框
function showSchedulePopup(schedules) {
    const popup = document.getElementById('schedule-popup'); // 获取弹出框
    const overlay = document.getElementById('popup-overlay'); // 获取遮罩层

    popup.innerHTML = `
        <div class="popup-header">
            <h2 class="popup-title">日程详情</h2> <!-- 弹出框标题 -->
            <button class="popup-close" onclick="closeSchedulePopup()">
                <i class="fas fa-times"></i> <!-- 关闭图标 -->
            </button>
        </div>
        <div class="popup-content">
            ${schedules.map((schedule, index) => { // 遍历日程
        const startDate = new Date(schedule.startDate); // 获取开始时间
        const endDate = new Date(schedule.endDate); // 获取结束时间
        return `
                    <div class="schedule-detail animate-slide-in" 
                         style="animation-delay: ${index * 0.2}s"> <!-- 日程详情 -->
                        <h3>${schedule.title}</h3> <!-- 标题 -->
                        <img src="${schedule.image}" alt="${schedule.title}" 
                             class="schedule-image"> <!-- 图片 -->
                        <div class="schedule-info animate-fade-scale" 
                             style="animation-delay: ${index * 0.2 + 0.3}s"> <!-- 日程信息 -->
                            <h4>时间</h4>
                            <p>${startDate.toLocaleString()} - ${endDate.toLocaleString()}</p> <!-- 时间 -->
                            <h4>地点</h4>
                            <p>${schedule.location}</p> <!-- 地点 -->
                            <h4>详细说明</h4>
                            <p>${schedule.description}</p> <!-- 描述 -->
                            <a href="${schedule.link}" target="_blank" 
                               class="schedule-link animate-bounce" 
                               style="animation-delay: ${index * 0.2 + 0.6}s"> <!-- 链接 -->
                                查看详情
                                <i class="fas fa-external-link-alt ml-2"></i> <!-- 外部链接图标 -->
                            </a>
                        </div>
                    </div>
                `;
    }).join('')} <!-- 将日程详情连接成字符串 -->
        </div>
    `;

    overlay.classList.add('active'); // 显示遮罩层
    popup.classList.add('active'); // 显示弹出框
    overlay.onclick = closeSchedulePopup; // 点击遮罩层关闭弹出框
}

// 关闭日程弹出框
function closeSchedulePopup() {
    const popup = document.getElementById('schedule-popup'); // 获取弹出框
    const overlay = document.getElementById('popup-overlay'); // 获取遮罩层

    popup.classList.remove('active'); // 隐藏弹出框
    overlay.classList.remove('active'); // 隐藏遮罩层
}

// 显示导出模态框
function showExportModal() {
    const modal = document.getElementById('export-modal'); // 获取模态框
    modal.classList.add('active'); // 显示模态框

    modal.onclick = (e) => { // 点击模态框外部关闭
        if (e.target === modal) {
            closeModal();
        }
    };
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('export-modal'); // 获取模态框
    modal.classList.remove('active'); // 隐藏模态框
}

// 导出为文件
function exportToFile() {
    const headers = ['日期', '时间', '标题', '描述', '地点']; // CSV表头
    const rows = scheduleData.map(s => { // 遍历日程数据
        const startDate = new Date(s.startDate); // 获取开始时间
        const endDate = new Date(s.endDate); // 获取结束时间
        return [
            `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`, // 日期
            `${startDate.toLocaleTimeString()}-${endDate.toLocaleTimeString()}`, // 时间
            s.title, // 标题
            s.description, // 描述
            s.location // 地点
        ];
    });

    const csvContent = [
        headers.join(','), // 表头
        ...rows.map(row => row.join(',')) // 数据行
    ].join('\n'); // 连接成CSV格式

    const blob = new Blob([csvContent], { // 创建Blob对象
        type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob); // 创建下载链接
    const link = document.createElement('a'); // 创建链接元素
    link.setAttribute('href', url); // 设置链接地址
    link.setAttribute('download', '日程表.csv'); // 设置下载文件名
    link.style.visibility = 'hidden'; // 隐藏链接
    document.body.appendChild(link); // 添加到文档
    link.click(); // 触发下载
    document.body.removeChild(link); // 移除链接
    URL.revokeObjectURL(url); // 释放链接

    closeModal(); // 关闭模态框
    showToast('文件已成功下载！'); // 显示下载成功提示
}

// 导出到日历
async function exportToCalendar() {
    const exporter = new CalendarExporter(scheduleData); // 创建日历导出实例
    exporter.export(); // 执行导出
}

// 高级日历导出功能
class CalendarExporter {
    constructor(schedules) {
        this.schedules = schedules; // 日程数据
        this.userAgent = navigator.userAgent.toLowerCase(); // 获取用户代理
    }

    // 生成标准ICalendar格式
    generateICalString(schedule) {
        const startDate = new Date(schedule.startDate); // 获取开始时间
        const endDate = new Date(schedule.endDate); // 获取结束时间

        const formatDate = (date) => {
            return date.toISOString().replace(/[-:]|\.\d{3}/g, ''); // 格式化日期
        };

        const uniqueId = this.generateUniqueId(); // 生成唯一标识符

        return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FurryCalendar//Event Export
BEGIN:VEVENT
UID:${uniqueId}
SUMMARY:${this.escapeICalText(schedule.title)} // 标题
DESCRIPTION:${this.escapeICalText(schedule.description)} // 描述
LOCATION:${this.escapeICalText(schedule.location)} // 地点
DTSTART:${formatDate(startDate)} // 开始时间
DTEND:${formatDate(endDate)} // 结束时间
DTSTAMP:${formatDate(new Date())} // 创建时间
CREATED:${formatDate(startDate)} // 创建时间
LAST-MODIFIED:${formatDate(new Date())} // 最后修改时间
URL:${schedule.link} // 链接
END:VEVENT
END:VCALENDAR`;
    }

    // 生成唯一标识符
    generateUniqueId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@furrycalendar.com`; // 生成唯一ID
    }

    // 转义ICalendar特殊字符
    escapeICalText(text) {
        return text
            .replace(/\\/g, '\\\\') // 转义反斜杠
            .replace(/;/g, '\\;') // 转义分号
            .replace(/,/g, '\\,') // 转义逗号
            .replace(/\n/g, '\\n'); // 转义换行符
    }

    // 检测设备和操作系统
    detectEnvironment() {
        return {
            isMobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(this.userAgent), // 检测是否为移动设备
            isIOS: /iPad|iPhone|iPod/.test(this.userAgent), // 检测是否为iOS设备
            isAndroid: /android/i.test(this.userAgent), // 检测是否为Android设备
            isWindows: /windows/i.test(this.userAgent), // 检测是否为Windows设备
            isMacOS: /macintosh/i.test(this.userAgent), // 检测是否为MacOS设备
            isLinux: /linux/i.test(this.userAgent), // 检测是否为Linux设备
            isSafari: /safari/i.test(this.userAgent) && !/chrome/i.test(this.userAgent), // 检测是否为Safari浏览器
            isChrome: /chrome/i.test(this.userAgent), // 检测是否为Chrome浏览器
            isFirefox: /firefox/i.test(this.userAgent), // 检测是否为Firefox浏览器
            isEdge: /edg/i.test(this.userAgent) // 检测是否为Edge浏览器
        };
    }

    // Android品牌检测
    detectAndroidBrand() {
        const brands = {
            'miui': /miui/i, // 小米
            'huawei': /huawei|honor/i, // 华为
            'oppo': /oppo|coloros/i, // OPPO
            'vivo': /vivo/i, // VIVO
            'samsung': /samsung/i, // 三星
            'oneplus': /oneplus/i // 一加
        };

        for (const [brand, regex] of Object.entries(brands)) {
            if (regex.test(this.userAgent)) return brand; // 返回匹配的品牌
        }
        return 'default'; // 默认品牌
    }

    // 导出方法
    export() {
        const env = this.detectEnvironment(); // 检测环境

        this.schedules.forEach(schedule => {
            const iCalString = this.generateICalString(schedule); // 生成iCal字符串
            const blob = new Blob([iCalString], { type: 'text/calendar;charset=utf-8' }); // 创建Blob对象
            const url = URL.createObjectURL(blob); // 创建下载链接

            if (env.isIOS) {
                this.exportForIOS(iCalString, schedule); // iOS导出处理
            } else if (env.isAndroid) {
                this.exportForAndroid(url, schedule, env); // Android导出处理
            } else if (env.isWindows) {
                this.exportForWindows(url, schedule, env); // Windows导出处理
            } else if (env.isMacOS) {
                this.exportForMacOS(url, schedule); // MacOS导出处理
            } else if (env.isLinux) {
                this.exportForLinux(url, schedule); // Linux导出处理
            } else {
                this.exportFallback(url, schedule); // 备用导出方案
            }

            URL.revokeObjectURL(url); // 释放链接
        });

        this.showNotification('日程已导出，请在系统日历中查看'); // 显示通知
    }

    // iOS特殊导出处理
    exportForIOS(iCalString, schedule) {
        const encodedUri = encodeURIComponent(iCalString); // 编码iCal字符串
        const iosUrl = `https://calendars.apple.com/webcal/parseICS?url=text/calendar;charset=utf-8,${encodedUri}`; // iOS日历链接
        window.open(iosUrl, '_blank'); // 打开链接
    }

    // Android导出处理
    exportForAndroid(url, schedule, env) {
        const androidBrand = this.detectAndroidBrand(); // 检测Android品牌
        const androidIntents = {
            'miui': `intent:#Intent;action=android.intent.action.VIEW;type=text/calendar;component=com.miui.calendar/.event.EditEventActivity;S.title=${encodeURIComponent(schedule.title)};end`, // 小米
            'huawei': `intent:#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.dir/event;component=com.huawei.calendar/.event.EditEventActivity;S.title=${encodeURIComponent(schedule.title)};end`, // 华为
            'oppo': `intent:#Intent;action=android.intent.action.EDIT;type=vnd.android.cursor.dir/event;component=com.coloros.calendar/.event.EditEventActivity;S.title=${encodeURIComponent(schedule.title)};end`, // OPPO
            'vivo': `intent:#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.dir/event;component=com.vivo.calendar/.event.EditEventActivity;S.title=${encodeURIComponent(schedule.title)};end`, // VIVO
            'default': url // 默认处理
        };

        const intent = androidIntents[androidBrand] || androidIntents['default']; // 获取对应品牌的intent

        if (androidBrand !== 'default') {
            window.location.href = intent; // 打开日历
        } else {
            this.downloadFile(url, `${schedule.title}.ics`); // 下载文件
        }
    }

    // Windows导出处理
    exportForWindows(url, schedule, env) {
        const windowsMethods = {
            'edge': () => navigator.msSaveBlob && navigator.msSaveBlob(new Blob([url]), `${schedule.title}.ics`), // Edge处理
            'chrome': () => this.downloadFile(url, `${schedule.title}.ics`), // Chrome处理
            'firefox': () => this.downloadFile(url, `${schedule.title}.ics`), // Firefox处理
            'default': () => this.downloadFile(url, `${schedule.title}.ics`) // 默认处理
        };

        const exportMethod = windowsMethods[env.isEdge ? 'edge' :
            env.isChrome ? 'chrome' :
                env.isFirefox ? 'firefox' :
                    'default'];
        exportMethod(); // 执行导出方法
    }

    // MacOS导出处理
    exportForMacOS(url, schedule) {
        this.downloadFile(url, `${schedule.title}.ics`); // 下载文件
    }

    // Linux导出处理
    exportForLinux(url, schedule) {
        this.downloadFile(url, `${schedule.title}.ics`); // 下载文件
    }

    // 通用导出备用方案
    exportFallback(url, schedule) {
        this.downloadFile(url, `${schedule.title}.ics`); // 下载文件
    }

    // 文件下载方法
    downloadFile(url, filename) {
        const a = document.createElement('a'); // 创建链接元素
        a.href = url; // 设置链接地址
        a.download = filename; // 设置下载文件名
        document.body.appendChild(a); // 添加到文档
        a.click(); // 触发下载
        document.body.removeChild(a); // 移除链接
    }

    // 通知方法
    showNotification(message, type = 'success') {
        const notification = document.createElement('div'); // 创建通知框
        notification.className = `notification notification-${type}`; // 设置类名
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        // 通知样式和动画
        Object.assign(notification.style, {
            position: 'fixed', // 固定定位
            top: '20px', // 距离顶部
            right: '20px', // 距离右侧
            backgroundColor: type === 'success' ? '#4CAF50' : '#F44336', // 背景色
            color: 'white', // 文字颜色
            padding: '15px', // 内边距
            borderRadius: '5px', // 圆角
            zIndex: '9999', // 层级
            transition: 'all 0.3s ease', // 过渡效果
            opacity: '0', // 初始透明度
            transform: 'translateX(100%)' // 初始位置
        });

        document.body.appendChild(notification); // 添加到文档

        // 显示通知
        setTimeout(() => {
            notification.style.opacity = '1'; // 显示通知框
            notification.style.transform = 'translateX(0)'; // 还原位置
        }, 10);

        // 隐藏通知
        setTimeout(() => {
            notification.style.opacity = '0'; // 隐藏通知框
            notification.style.transform = 'translateX(100%)'; // 移出视口
            setTimeout(() => document.body.removeChild(notification), 300); // 移除通知框
        }, 3000); // 3秒后隐藏
    }
}