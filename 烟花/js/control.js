var canvas = $("#canvas")[0];
var context = canvas.getContext("2d");

// 屏幕宽高
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// 保存烟花
var fireworks = [];
// 保存烟花的颗粒
var particles = [];

// 鼠标坐标
var mouseX;
var mouseY;

// =====================================================================

canvas.width = screenWidth;
canvas.height = screenHeight;

// =====================================================================

/**
 * 随机返回一个指定区间内的函数
 * @param {int} min 随机数的最小值
 * @param {int} max 随机数的最大值
 */
function random(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * 计算两点之间距离
 * @param {int} x1 
 * @param {int} x2 
 * @param {int} y1 
 * @param {int} y2 
 */
function calculateDistance(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

/**
 * 制造爆炸音效
 */
function boom() {
    var audio = document.createElement('audio');
    audio.src = "boom.mp3";
    audio.play();
}

/**
 * 倒计时
 */
function countTime() {
    var targetTime = new Date(2023, 1, 21, 0, 0, 0, 0).getTime();
    var currentTime = new Date().getTime();
    var millies = targetTime - currentTime;

    $("#hour").html(Math.floor(millies / 3600000));
    millies %= 3600000;
    $("#minute").html(Math.floor(millies / 60000));
    millies %= 60000;
    $("#second").html(Math.floor(millies / 1000));
}

setInterval(countTime, 1000);