const DownTimeMsec = function (time, loopTime, isDelay) {
    this.time = parseInt(time, 10);
    this.loopTime = loopTime || 1000;
    this.timeout = null;
    this.isDelay = isDelay;
}
DownTimeMsec.prototype = {
    constructor: DownTimeMsec,
    _loopTime: function (time, func, callback) {
        var d1 = new Date;
        var loop = function () {
            var d2 = new Date;
            var t = (d2 - d1);
            var timeNow = time - t;
            timeNow = timeNow < 0 ? 0 : timeNow;
            var timeSec = Math.round(timeNow / 1000);
            var funcExec = function () {
                /* 
                    注意!!!
                    若 func 里面执行了 this.stop 则会生效,
                    所以得放在 this.timeout =... 后面执行
                */
                if (typeof func === 'function') {
                    func(timeSec, timeNow);
                }
            }
            if (timeNow > 0) {
                this.stop();
                this.timeout = setTimeout(loop, this.loopTime);
                funcExec();
            } else {
                funcExec();
                if (typeof callback === 'function') {
                    callback();
                }
            }
        }.bind(this);

        if (this.isDelay) {
            this.stop();
            this.timeout = setTimeout(loop, this.loopTime);
        } else {
            loop();
        }
        return this;
    },
    // 开始
    start: function (func, callback) {
        this.stop();
        this.func = func;
        this.callback = callback;
        this._loopTime(this.time, func, callback);
        return this;
    },
    // 设置时间并且重现开始
    setTime: function (time) {
        this.stop();
        this._loopTime(time, this.func, this.callback);
    },
    clear: function () {
        this.stop();
        if (typeof this.func === 'function') {
            this.func(0, 0);
        }
        if (typeof this.callback === 'function') {
            this.callback();
        }
    },
    stop: function () {
        clearTimeout(this.timeout);
        return this;
    }
}
