/*
  JOY.Interface

  The ensureImplements function takes at least 2 arguments.
  The first argument is the object you want to check,
  the other arguments are the interfaces that the first object will be compared against.

*/

(function(global){
	
	function Interface(name, method){
		var i, len;
		this.name = name;
		this.methods = [];
		for(i = 0, len = method.length; i < len; i++){
			this.methods.push(method[i]);
		}
	}
	
	Interface.ensureImplements = function(obj){
		var i, j, len, 
			methods, methodsLen, methodItem,
			args = arguments;
		
		for(i = 1, len = args.length; i < len; i++){
			methods = args[i].methods;
			for(j = 0, methodsLen = methods.length; j < methodsLen; j++){
				methodItem = methods[j];
				if(!obj[methodItem] || typeof obj[methodItem] !== 'function'){
					throw new Error("Function JOY.Interface.ensureImplements: object "
						+"does not implement the '" + args[i].name
						+ "' interface. Method '" + methodItem + "' was not found.");
				}
			}
		}
	}
	
	global.JOY || (global.JOY = {});
	global.JOY.Interface = Interface;
	
}(this));
