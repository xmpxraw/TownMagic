import b from './b';

class Point {
    constructor(x, y) {
        // super(1,2)
        // this.init2 = super.init2
        this.init()
    }

    init() {
        this.bindEvent()
    }

    bindEvent() {
        this.initGgp()
    }

    initGgp() {
        var container = document.getElementById("container");
        //获取所有的焦点
        var circles = document.getElementById("circles").children;
        //信号量
        var idx = 0;
        //函数节流防止化的太快
        var lock = true;
        //事件处理函数；
        function mousewheelhandler(event) {
            event = event || window.event;
            //节流：
            if (!lock) {
                return;
            }
            //阻止默认事件
            // if (event.preventDefault) {
            //     event.preventDefault();
            // } else {
            //     event.returnValue = false;
            // }
            //chrome,ie用的是event。wheeldelta;
            if (event.wheelDelta) {
                var direction = event.wheelDelta > 0 ? 1 : -1;
            } else if (event.detail) {
                //火狐用的是event.detail;
                var direction = event.detail > 0 ? -1 : 1;
            }
            //滚轮往下滚，-(-1) 就是加一；
            idx -= direction;
            if (idx < 0) {
                idx = 0;
            } else if (idx > 4) {
                idx = 4;
            }
            //设置小圆点

            //将所有的小圆点清空
            for (var i = 0; i < circles.length; i++) {
                circles[i].className = '';
            }

            //将制定的小圆点的名字，让其背景颜色
            circles[idx].className = "cur";
            container.style.top = -idx * 100 + "%";
            //上锁
            lock = false;
            //模拟等待1.5秒后开锁，才可以继续滚动
            setTimeout(function () {
                //解锁
                lock = true;
            }, 1000)
        }
        //这里不用根据不同的浏览器进行判断，这是因为事件添加了如果浏览器不认识，不报错了
        //给ie，chrome添加事件
        document.onmousewheel = mousewheelhandler;
        try {

            //给火狐添加事件
            document.addEventListener("DOMMouseScroll", mousewheehandler, false);

        } catch (err) {

        }
    }
}
new Point(2, 4)