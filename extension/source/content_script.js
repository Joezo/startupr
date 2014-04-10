var startupr = {};

startupr.walk = function(node)
{
  // I stole this function from here:
  // http://is.gd/Iuv0ya
  // Which stole it from here:
  // http://is.gd/mwZp7E

  var child, next;

  switch ( node.nodeType )
  {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while ( child )
      {
        next = child.nextSibling;
        startupr.walk(child);
        child = next;
      }
      break;

    case 3: // Text node
            if(node.parentElement.tagName.toLowerCase() != "script") {
                startupr.handleText(node);
            }
      break;
  }
};

startupr.handleText = function(textNode) {
  var v = textNode.nodeValue;

  v = v.replace(/\b[A-Za-z]*(er)(\s|\.|\,|$)/g, function(match, p1, offset, string) {
    var s = match.substring(0, match.length - 2);
    return s + 'r';
  });
  textNode.nodeValue = v;
};

startupr.walk(document.body);
