/*
  JOY.Observer

*/

(function(global){

  function Observer(){
		this.fns = [];
	}
	
	Observer.prototype = {
		constructor: Observer,
		subscribe: function(fn){
			if(typeof fn === 'function'){
				this.fns.push(fn);
			}
			
			return this;
		},
		unsubscribe: function(fn){
			if(typeof fn !== 'function'){
				return;
			}
			
			var fns = this.fns;
			for(var i = 0, len = fns.length; i < len; i++){
				if(fns[i] === fn){
					fns.splice(i, 1);
					i--;
				}
			}
			
			return this;
		},
		fire: function(){
			var fns = this.fns;
			for(var i = 0, len = fns.length; i < len; i++){
				fns[i].apply(null, arguments);
			}
			
			return this;
		}
	}


	global.JOY || (global.JOY = {});
	global.JOY.Observer = Observer;

}(this));
