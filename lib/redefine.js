if(!Number.prototype.toCurrency){
  Number.prototype.toCurrency = function(a, b, c){
      var a = a || 2,
          b = b || '.',
          c = c || ',',
    	str, arr, len;
      
  	str = this.toFixed(a);
  	if(b){
  		str = str.replace('.', b);
  	}
  	
  	arr = str.split(b);
  	newArr = arr[0].toString().split('');
      len = newArr.length;
  	while((len -= 3) > 0){
  		newArr.splice(len, 0, c);
  	}
  	
  	newArr.push(b);
  	return newArr.concat(arr[1]).join('');
  }
}

if(!String.prototype.trim){
  String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
  };
}

if(!Function.prototype.bind){
  Function.prototype.bind = function(o){
    var self = this,
        slice = Array.prototype.slice,
        args = slice.apply(arguments, [1]);
    return function(){
        return self.apply(o, args.contact(slice.apply(arguments, [0])));
    }
  }
}

if(!Array.prototype.splice){
  Array.prototype.splice = function(start, num){
      var i,
          max = Math.max,
          min = Math.min,
          insertLen = max(arguments.length - 2, 0),
          len = this.length,
          arr = [],
    	start = !isNaN(start = parseInt(start)) ? start : 0,
  		num = !isNaN(num = parseInt(num)) ? num : 0,
          balance,
          sNum,
          sIns,
          loop,
          newLen;
      
      if(start < 0){
           start += len;
      }
      start = min(max(start, 0), len);
      num = max(min(len-start, num), 0);
      
      for(i = 0; i< num; i++){
          arr[i] = this[start + i];
      }
  
      balance = insertLen - num,
  	sNum = start + num,
  	sIns = start + insertLen,
  	loop = len - start - num,
  	newLen = len + balance;
  	
      if(balance < 0){
          for(i = 0; i < loop; i ++){
              this[sIns + i] = this[sNum + i];
          }
          this.length = newLen;
      }
      else if(balance > 0){
          for(i = 0; i < loop; i++){
              this[newLen - i - 1] = this[len - i - 1];
          }
      }
  
      for(i = 0; i < insertLen; i++){
          this[start + i] = arguments[i + 2];
      }
  
      return arr;
  }
}


/* 
  Copy from MDN:

  Array.prototype.forEach
  Array.prototype.some
  Array.prototype.filter
*/

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if ( !Array.prototype.forEach ) {
 
  Array.prototype.forEach = function( callback, thisArg ) {
 
    var T, k;
 
    if ( this == null ) {
      throw new TypeError( " this is null or not defined" );
    }
 
    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);
 
    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0; // Hack to convert O.length to a UInt32
 
    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ( {}.toString.call(callback) != "[object Function]" ) {
      throw new TypeError( callback + " is not a function" );
    }
 
    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if ( thisArg ) {
      T = thisArg;
    }
 
    // 6. Let k be 0
    k = 0;
 
    // 7. Repeat, while k < len
    while( k < len ) {
 
      var kValue;
 
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if ( k in O ) {
 
        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];
 
        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call( T, kValue, k, O );
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}


if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisp */)
  {
    "use strict";
 
    if (this == null)
      throw new TypeError();
 
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();
 
    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t))
          res.push(val);
      }
    }
 
    return res;
  };
}

if (!Array.prototype.some) {
  Array.prototype.some = function(fun /*, thisp */) {
    "use strict";
 
    if (this == null) throw new TypeError();
 
    var t = Object(this),
        len = t.length >>> 0;
 
    if (typeof fun != "function") throw new TypeError();
 
    var thisp = arguments[1];
 
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisp, t[i], i, t))
        return true;
    }
 
    return false;
  };
}
