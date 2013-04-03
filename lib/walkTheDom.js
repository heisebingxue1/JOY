/*
  JOY.walkTheDom
    
    Traversing and iterating the DOM tree, walk the tree recursively to keep track of the node or build a path.
    
*/


(function(global){
  function walkTheDom(func, node, depth, returnedValue){
		var returnedValue = func(node, depth++, returnedValue);
		node = node.firstChild;
		while(node){
			walkTheDom(func, node, depth, returnedValue);
			node = node.nextSibling;
		}
		return returnedValue;
	}

	global.JOY || (global.JOY = {});
	global.JOY.walkTheDom = walkTheDom;

}(this));
