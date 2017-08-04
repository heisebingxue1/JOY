// time 倒计时的时候, loopTime 每次循环的时间
var DownTimeMsec = function(time, loopTime){
    this.time = parseInt(time, 10);
    this.loopTime = loopTime || 50;
    this.timeout = null;
}
DownTimeMsec.prototype = {
  constructor: DownTimeMsec,
  _loopTime: function(time, func, callback){
    var self = this;

    var d1 = new Date;
    var loop = function(){
      var d2 = new Date;
      var t = (d2 - d1);
      var timeNow = time - t;
      timeNow = timeNow < 0 ? 0 : timeNow;
      var timeSec  = Math.round(timeNow / 1000);
      if(typeof func === 'function'){
        func(timeNow, timeSec);
      }
      if(timeNow > 0){
        clearTimeout( self.timeout );
        self.timeout = setTimeout(loop, self.loopTime);
      }else{
        if(typeof callback === 'function'){
          callback();
        }
      }
    }
    loop();

    return this;
  },
  // 开始
  start: function(func, callback){
    this.func = func;
    this.callback = callback;
    this._loopTime(this.time, func, callback);
    return this;
  },
  // 设置时间并且重现开始
  setTime: function(time){
    this.stop();
    this._loopTime(time, this.func, this.callback);
  },
  stop: function(){
    clearTimeout( this.timeout );
    return this;
  }
}


// 倒计时启动
var timeIns = new DownTimeMsec(3000, 1000);
timeIns.start( function(t, t2){
    console.log(t); // t 是毫秒
    console.log(t2); // t2 是秒
}.bind(this), function(){
    console.log('倒计时结束');
}.bind(this) );
