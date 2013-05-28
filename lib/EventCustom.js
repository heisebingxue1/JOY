/*
  JOY.EventCustom

	It has 3 methods:
		on(), register an event handler for a given type of event,
		fire(), fire an event for a given type of event, or fire all events if no parameters are passed.
		off(), unregister an event for a given type of event, or unregister all events if no parameters are passed.

*/

(function(global){
	var slice = Array.prototype.slice;
	
	function EventCustom(){
		this.register = {};
	}
	
	EventCustom.prototype = {
		constructor: EventCustom,
		/*
			Register an event.
			Put it in a handler array, making one if it doesn't yet exist for this event.
		*/
		on: function(event, method, para){
			var handler = {
				method: method,
				para: slice.apply(arguments, [2])
			};
			if(this.register.hasOwnProperty(event)){
				this.register[event].push(handler);
			}else{
				this.register[event] = [handler];
			}
		},
		
		/*
			Fire an event on an object.
			The event is a string containing the name of the event.
		*/
		fire: function(event){
			var args = arguments,
			    register = this.register;

			var exec = function(){
				if(!register.hasOwnProperty(event)) { return;}
				
				var i, len, handler,
					handlers = register[event];
				
				for(i = 0, len = handlers.length; i < len; i++){
					handler = handlers[i];
					handler.method.apply(this, handler.para.concat(slice.apply(arguments, [0])));
				}
			};

			if(args.length === 0){
				for(event in register){
					exec.apply(this);
				}
			}
			else if(typeof event === 'string'){
				exec.apply(this, slice.apply(args, [1]));
			}
		  
			return this;
		},
		
		/*
			Unregisters an event.
			You can pass no para, it will unregister all the event handler,
			or you can indicate the special event and method.
		*/
		off: function(event, method){
			var i, len, arr,
				argLen = arguments.length,
				register = this.register;
			
			/*
				If there is no parameter,
				then delete all the	properies by reseting this.register to {}.		
			*/
			if(argLen === 0){
				this.register = {};
			}
			else if(register.hasOwnProperty(event)){
				if(argLen === 1){
					delete register[event];
				}
				else if(typeof method === 'function'){
					arr = register[event];
					for(i = 0, len = arr.length; i < len; i++){
						if(arr[i].method === method){
							arr.splice(i, 1);
							i--;
							len--;
						}
					}
				}
			}
			
			return this;
		}
	}
	
	global.JOY || (global.JOY = {});
	global.JOY.EventCustom = EventCustom;
	
}(this));
