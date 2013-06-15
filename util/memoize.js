/*
    memoize() accept two arguments: a function to memoize and an optional cache object.
    A shell function is then created that wraps the original(fundamental) and ensures that a new result is caculated only if it has never previously been caculated.
*/

(function(global){
    function memoize(cache, fundamental){
		  cache = cache || {};
  		var shell = function(arg){
  			if(!cache.hasOwnProperty(arg)){
  				cache[arg] = fundamental(shell, arg);
  			}
        return cache[arg];
  		}
    	return shell;
  	}

    global.JOY || (global.JOY = {});
    global.JOY.memoize = memoize;
}(this));
