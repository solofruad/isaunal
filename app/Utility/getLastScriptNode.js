var GetLastScriptNode = function(){

	var n = document;
    while(n && n.nodeName.toLowerCase() != "script") { n = n.lastChild;}
    return n;
}

module.exports = GetLastScriptNode;