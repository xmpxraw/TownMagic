import {
    $
} from './common';

class Index {
    constructor() {
        this.lock = true
        this.idx = 0;
        this.init()
    }

    init() {
        this.bindEvent()
    }

    bindEvent() {
        //这里不用根据不同的浏览器进行判断，这是因为事件添加了如果浏览器不认识，不报错了
        //给ie，chrome添加事件
        document.onmousewheel = (e) => {
            this.mousewheelhandler(e)
        };
        try {
            //给火狐添加事件
            document.addEventListener("DOMMouseScroll", (e) => {
                this.mousewheehandler(e)
            }, false);
        } catch (err) {
            console.log(err)
        }
        // pagenation click
        const liAll = document.querySelectorAll('#circles .circles_item')
        console.log(liAll)
        for (let i = 0; i < liAll.length; i++) {
            liAll[i].onclick = () => {
                this.handleClickpageNationItem(i)
            }
        }
    }

    mousewheelhandler(event) {
        //函数节流防止化的太快, 事件处理函数
        event = event || window.event;
        // 节流
        if (!this.lock) {
            return;
        }
        //阻止默认事件
        // event.preventDefault ? event.preventDefault() : event.returnValue = false;
        //chrome,ie用的是event。wheeldelta;
        let direction = null
        if (event.wheelDelta) {
            direction = event.wheelDelta > 0 ? 1 : -1;
        }
        if (event.detail) {
            //火狐用的是event.detail;
            direction = event.detail > 0 ? -1 : 1;
        }
        if (direction === null) return;
        //滚轮往下滚，-(-1) 就是加一
        this.idx = this.idx - direction;
        if (this.idx < 0) {
            this.idx = 0;
        }
        if (this.idx > 4) {
            this.idx = 4;
        }
        this.handleTogglePage(this.idx)
    }

    handleTogglePage(pageIndex) {
        const container = document.getElementById("container");
        //获取所有的焦点
        const circles = document.getElementById("circles").children;
        //设置小圆点
        //将所有的小圆点清空
        for (let i = 0; i < circles.length; i++) {
            circles[i].className = 'circles_item';
        }
        //将制定的小圆点的名字，让其背景颜色
        circles[pageIndex].className = "circles_item pointActive";
        container.style.top = -pageIndex * 100 + "%";
        //上锁
        this.lock = false;
        //模拟等待1.5秒后开锁，才可以继续滚动
        setTimeout(() => {
            //解锁
            this.lock = true;
        }, 1000)
    }

    handleClickpageNationItem (i) {
        console.log(i)
        console.log(this.idx)
    }
}
new Index()