/*
  'parseJSON' copy from JQuery 1.7.1

  require method 'String.prototype.trim'
*/

(function(global){
    	var rvalidchars = /^[\],:{}\s]*$/,
				rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
				rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
			
			function parseJSON( data ) {
				if ( typeof data !== "string" || !data ) {
					return null;
				}

				// Make sure leading/trailing whitespace is removed (IE can't handle it)
				data = data.trim();

				// Attempt to parse using the native JSON parser first
				if ( window.JSON && window.JSON.parse ) {
					return window.JSON.parse( data );
				}

				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();

				}

			}
      
      global.JOY || (global.JOY = {});
      global.JOY.parseJSON = parseJSON;
})(window);

