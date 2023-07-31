var myIframe = document.getElementById('myIframe');

// 全屏显示 1.5 秒
myIframe.style.transform = 'scale(1)';
setTimeout(function () {
    myIframe.style.transform = 'scale(0.3)';
    myIframe.style.top = '30%';
    myIframe.style.opacity = '0';
}, 1300);
setTimeout(function () {
    myIframe.style.visibility = 'hidden';
}, 1500);