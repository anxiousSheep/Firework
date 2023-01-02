/**
 * 烟花对象
 * @param {int} startX 起始横坐标
 * @param {int} startY 起始纵坐标
 * @param {int} endX 结束横坐标
 * @param {int} endY 结束纵坐标
 */
function Firework(startX, startY, endX, endY) {
    // 当前坐标
    this.x = startX;
    this.y = startY;

    // 开始坐标
    this.startX = startX;
    this.startY = startY;

    // 结束坐标
    this.endX = endX;
    this.endY = endY;

    // 烟花发射的倾斜角度
    this.angle = Math.atan2(endY - startY, endX - startX);
    // 烟花运动的整体倾斜角度
    this.basicAngle = this.angle;
    // 烟花摆动幅度
    this.shakeAngle = random(0, 0.2);
    // 烟花运动的初速度
    this.speed = random(20, 35);
    // 烟花运动的加速度
    this.a = 1;
    // 烟花的亮度
    this.brightness = random(50, 80);
    // 颜色
    this.hue = random(0, 360);

    // =================================================================

    // 绘制烟花（分三段）
    this.coordinateCount = 3;
    this.coordinates = [];
    for (; this.coordinateCount > 0; this.coordinateCount--) {
        this.coordinates.push([this.x, this.y])
    }
}

/**
 * 使用canvas进行绘图
 */
Firework.prototype.draw = function() {
    // 开启一条路径
    context.beginPath();
    // 在前后两个移动坐标之间连线
    context.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    context.lineTo(this.x, this.y);
    context.strokeStyle = "hsl(" + this.hue + ", 100%, " + this.brightness + "%)";
    context.lineWidth = 2.5;
    context.stroke();
}

/**
 * 更新烟花的位置数据
 * @param {int} index 当前烟花在数组中的位置
 */
Firework.prototype.update = function(index) {
    // 移除位置数组最后一个元素，并将上一个位置加入数组的最前面
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);
    // 更改速度
    this.speed -= this.a;
    // 计算横纵坐标的偏移量
    var vx = this.speed * Math.cos(this.angle);
    var vy = this.speed * Math.sin(this.angle);
    this.angle = this.basicAngle + Math.cos(this.speed) * this.shakeAngle;

    // 如果速度已经降为0，那么使它爆炸
    if (this.speed <= 0) {
        fireworks.splice(index, 1);
        // 爆炸
        createParticles(this.x, this.y, this.hue);
        // var worker = new Worker("js/makeSound.js");
        // worker.onmessage = function(event) {
        //     event.preventDefault();
        // }
    } else {
        this.x += vx;
        this.y += vy;
    }
}

/**
 * 创建一个烟花
 */
function createFirework(endX, endY) {
    fireworks.push(new Firework(screenWidth / 2, screenHeight, endX, endY));
}

function run() {
    for (let index = fireworks.length - 1; index > 0; index--) {
        fireworks[index].draw();
        fireworks[index].update(index);
    }

    // 不断加入半透明蒙层，出现逐渐消失的效果
    context.fillStyle = "rgba(0, 0, 0, 0.6)";
    context.rect(0, 0, screenWidth, screenHeight);
    context.fill();
}

setInterval(run, 20);

setInterval("createFirework(random(screenWidth / 2 - 300, screenWidth / 2 + 300), random(screenHeight / 2 - 200, screenHeight / 2 + 200))", 1200);
$("body").click(function () {
    createFirework(event.pageX, event.pageY);
})