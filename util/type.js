/*
    'type' method:: return a string that identifies the data type of an expression.
*/

(function(global){
  var i, len, item,
      classType = {},
      arr = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object'],
      toString = Object.prototype.toString;

  /* Lookup tables are a faster alternative to multiple condition evaluation using if-else or switch */
  for(i = 0, len = arr.length; i < len; i++){
    item = arr[i];
    classType['[object ' + item + ']'] = item.toLowerCase();
  }

  function type(obj){
    return obj == null?
      String(obj) : 
      classType[toString.call(obj)] || 'object';
  }


  global.JOY || (global.JOY = {});
  global.JOY.type = type;
})(window);
