/*
	'TimerScript' method: time the script execution, return time difference(in milliseconds).
*/

(function(global){
	var TimerScript = {
		_data: {},
		start: function(name){
			TimerScript._data[name] = new Date();
		},
		stop: function(name){
			var data = TimerScript._data,
				time = data[name];
			if(time){
				data[name] = new Date() - time;
			};
		},
		getTime: function(name){
			return TimerScript._data[name];
		}
	}

	global.JOY || (global.JOY = {});
	global.JOY.TimerScript = TimerScript;
})(window);
