(function(global){
    function getQueryString(){
      var m,
          result = {},
          queryString = window.location.search.substring(1),
          re = /([^&=]+)=([^&]*)/g;

      while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }

      return result;
    }

    global.JOY || (global.JOY = {});
    global.JOY.getQueryString = getQueryString;
}(this));
