
/*
  JOY.EventCustom

	It has 3 methods:
		on(), register an event handler for a given type of event,
		fire(), fire an event for a given type of event, or fire all events if no parameters are passed.
		off(), unregister an event for a given type of event, or unregister all events if no parameters are passed.

*/

(function(global){
	
	function EventCustom(){
		this.register = {};
	}
	
	EventCustom.prototype = {
		constructor: EventCustom,
		/*
			Register an event.
			Put it in a handler array, making one if it doesn't yet exist for this type.
		*/
		on: function(type, method, para){
			var handler = {
				method: method,
				para: para
			};
			if(this.register.hasOwnProperty(type)){
				this.register[type].push(handler);
			}else{
				this.register[type] = [handler];
			}
		},
		
		/*
			Fire an event on an object.
			The event can be either a string containing the name of the event
			or an object containing a type property containing the name of the event.
		*/
		fire: function(event){
			var type, i, len, handler, arr, method,
          self = this,
          register = this.register;

			var exec = function(){
				if(register.hasOwnProperty(type)){
					arr = register[type];
					for(i = 0, len = arr.length; i < len; i++){
						handler = arr[i];
						method = handler.method;
						if(typeof method === 'string'){
							method = self[method];
						}
						method.apply(self, handler.para || [event]);
					}
				}
			};

			if(arguments.length === 0){
				for(type in register){
					if(!register.hasOwnProperty(type)) { continue;}
					exec();
				}
			}
			else {
        type = typeof event === 'string' ? 
               event : event.type;
        exec();
			}
		  
			return this;
		},
		
		/*
			Unregisters an event handler for an event type.
			You can pass no para, it will unregister all the event handler,
			or you can indicate the special type and method.
		*/
		off: function(type, method){
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
			else if(register.hasOwnProperty(type)){
				if(argLen === 1){
					delete register[type];
				}
				else if(typeof method === 'function'){
					arr = register[type];
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
