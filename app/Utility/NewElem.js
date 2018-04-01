var NewElem = function(tagName, parentNode){
	
	var elem = document.createElement(tagName);
    if(parentNode){
        parentNode.appendChild(elem);
    }
    return elem;
}

module.exports = NewElem;