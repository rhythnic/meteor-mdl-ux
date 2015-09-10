MDL = {upgrade: upgradeElements};

/**
 * componentHandler is an object in material.js (script for the Material Design Light framework)
 * element is jquery element set or array, not a nodeList
 */
function upgradeElements(elements) {
  if (!Array.isArray(elements)) {
    elements = elements.toArray();
  }
  componentHandler.upgradeElements(elements);
}

/**
 * Build an array of elements that are the siblings of firstNode
 * filters out non-HTMLElements
 * componentHandler.upgrade/downgrade handles child elements, so we only need top level
 */
function assembleNodes(firstNode) {
  var nodes = [];
  var node = firstNode;
  while(node) {
    if (node instanceof HTMLElement) nodes.push(node);
    node = node.nextSibling;
  }
  return nodes;
}

/**********************************
    Universal MDL Wrapping Template
**********************************/

Template.MDL.rendered = function () {
  upgradeElements(assembleNodes(this.firstNode), true);
};
