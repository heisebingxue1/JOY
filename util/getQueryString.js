/*
    getQueryString is used to retrieve the variable values in the HTTP query string.
*/

(function(global){
    function getQueryString(){
      var m,
          result = {},
          queryString = global.location.search.substring(1),
          re = /([^&=]+)=([^&]*)/g;

      while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }

      return result;
    }

    global.JOY || (global.JOY = {});
    global.JOY.getQueryString = getQueryString;
}(this));
