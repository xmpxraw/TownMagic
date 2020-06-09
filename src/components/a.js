import '../styles/index.less';

const a = (function () {
    return {
        a: 1111,
        init: function () {
            console.log(this.a)
        }
    }
})()
a.init()