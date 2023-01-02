/**
 * 烟花颗粒
 * @param {int} x 当前x坐标
 * @param {int} y 当前y坐标
 * @param {int} hue 烟花本体的颜色
 */
function Particle(x, y, hue, angle, speed) {
    // 当前坐标
    this.x = x;
    this.y = y;

    // 角度
    this.angle = angle;
    // 速度
    this.speed = speed;
    // 摩擦力加速度
    this.f = 0.9;
    // 重力加速度
    this.g = 2;
    // 颜色
    this.hue = random(hue + 20, hue - 20);
    // 亮度
    this.brightness = random(50, 80);
    // 亮度衰变率
    this.decay = random(0.02, 0.035);
    // 透明度
    this.alpha = 1;

    // =================================================================

    // 分5段绘制
    this.coordinates = [];
    this.coordinateCount = 5;
    for (; this.coordinateCount > 0; this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
    }
}

/**
 * 用canvas画烟花颗粒
 */
Particle.prototype.draw = function() {
    // 开启一条路径
    context.beginPath();
    // 在前后两个移动坐标之间连线
    context.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    context.lineTo(this.x, this.y);
    context.strokeStyle = "hsl(" + this.hue + ", 100%, " + this.brightness + "%, " + this.alpha + ")";
    context.stroke();
}

/**
 * 更新烟花颗粒的位置
 * @param {int} index 当前颗粒在数组中的位置 
 */
Particle.prototype.update = function(index) {
    // 移除位置数组最后一个元素，并将上一个位置加入数组的最前面
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);
    // 更改运动状态
    this.speed *= this.f;
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle) + this.g;
    this.alpha -= this.decay;

    // 当完全透明的时候，视为运动完成
    if (this.alpha <= this.decay) {
        particles.splice(index, 1);
    }
}

/**
 * 创建烟花颗粒
 * @param {int} x 烟花横坐标
 * @param {int} y 烟花纵坐标
 * @param {int} hue 烟花颜色
 */
function createParticles(x, y, hue) {
    var shape = Math.floor(random(0, 4));
    switch (shape) {
        case 1:
            var count = 30;
            var slow = random(12, 14);
            var fast = random(20, 24);
            for (let index = 0; index < count; index++) {
                particles.push(new Particle(x, y, hue, index * (2 * Math.PI / count), index % 2 == 0 ? slow : fast));
            }
            boom();
            break;
        case 2:
            var first = [];
            var count = 12;
            var speed = random(18, 26);
            for (let index = 0; index < count; index++) {
                var each = new Particle(x, y, hue, index * (2 * Math.PI / count), speed);
                particles.push(each);
                first.push(each);
            }
            boom();

            setTimeout(function () {
                for (const each of first) {
                    for (let index = 0; index < count; index++) {
                        particles.push(new Particle(each.x, each.y, each.hue, index * (2 * Math.PI / count), speed / 2));
                    }
                }
                boom();
            }, 800);
            break;
        case 3:
            var speed = 3;
            var put = [];
            put.push(new Particle(x, y, hue, Math.atan2(0, -1), speed));
            put.push(new Particle(x, y, hue, Math.atan2(0, 1), speed));
            put.push(new Particle(x, y, hue, Math.atan2(2, -1), speed * Math.sqrt(5)));
            put.push(new Particle(x, y, hue, Math.atan2(2, 1), speed * Math.sqrt(5)));
            put.push(new Particle(x, y, hue, Math.atan2(2, -3), speed * Math.sqrt(13)));
            put.push(new Particle(x, y, hue, Math.atan2(2, 3), speed * Math.sqrt(13)));
            put.push(new Particle(x, y, hue, Math.atan2(4, -1), speed * Math.sqrt(17)));
            put.push(new Particle(x, y, hue, Math.atan2(4, 1), speed * Math.sqrt(17)));
            put.push(new Particle(x, y, hue, Math.atan2(4, -3), speed * Math.sqrt(25)));
            put.push(new Particle(x, y, hue, Math.atan2(4, 3), speed * Math.sqrt(25)));
            put.push(new Particle(x, y, hue, Math.atan2(6, -3), speed * Math.sqrt(45)));
            put.push(new Particle(x, y, hue, Math.atan2(6, 3), speed * Math.sqrt(45)));

            put.push(new Particle(x, y, hue, Math.atan2(-2, -3), speed * Math.sqrt(13)));
            put.push(new Particle(x, y, hue, Math.atan2(-2, 3), speed * Math.sqrt(13)));
            put.push(new Particle(x, y, hue, Math.atan2(-4, -3), speed * Math.sqrt(25)));
            put.push(new Particle(x, y, hue, Math.atan2(-4, 3), speed * Math.sqrt(25)));
            put.push(new Particle(x, y, hue, Math.atan2(-2, -5), speed * Math.sqrt(29)));
            put.push(new Particle(x, y, hue, Math.atan2(-2, 5), speed * Math.sqrt(29)));
            put.push(new Particle(x, y, hue, Math.atan2(-4, -5), speed * Math.sqrt(41)));
            put.push(new Particle(x, y, hue, Math.atan2(-4, 5), speed * Math.sqrt(41)));

            for (const each of put) {
                particles.push(each);
            }
            boom();

            setTimeout(function () {
                for (const each of put) {
                    var s1 = new Particle(each.x + 11, each.y + 11, hue, 0, 0);
                    var s2 = new Particle(each.x + 11, each.y - 11, hue, 0, 0);
                    var s3 = new Particle(each.x - 11, each.y + 11, hue, 0, 0);
                    var s4 = new Particle(each.x - 11, each.y - 11, hue, 0, 0);

                    s1.g = 1;
                    s2.g = 1;
                    s3.g = 1;
                    s4.g = 1;

                    particles.push(s1);
                    particles.push(s2);
                    particles.push(s3);
                    particles.push(s4);
                }
            }, 600);
            break;
        default:
            var count = random(35, 45);
            for (let index = 0; index < count; index++) {
                particles.push(new Particle(x, y, hue, random(0, Math.PI * 2), random(16, 24)));
            }
            boom();
            break;
    }
}

function crack() {
    for (let index = particles.length - 1; index > 0; index--) {
        particles[index].draw();
        particles[index].update(index);
    }
}

setInterval(crack, 30);