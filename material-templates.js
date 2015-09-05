/**********************************
    Exported Global var Material
**********************************/
Material = {refresh: refreshElement};

/**********************************
    MDL Components
**********************************/

var components = {
  layout:       { jsClass: 'MaterialLayout',     cssClass: 'mdl-js-layout' },
  button:       { jsClass: 'MaterialButton',     cssClass: 'mdl-js-button' },
  checkbox:     { jsClass: 'MaterialCheckbox',   cssClass: 'mdl-js-checkbox' },
  iconToggle:   { jsClass: 'MaterialIconToggle', cssClass: 'mdl-js-icon-toggle' },
  menu:         { jsClass: 'MaterialMenu',       cssClass: 'mdl-js-menu' },
  progress:     { jsClass: 'MaterialProgress',   cssClass: 'mdl-js-progress' },
  radio:        { jsClass: 'MaterialRadio',      cssClass: 'mdl-js-radio' },
  slider:       { jsClass: 'MaterialSlider',     cssClass: 'mdl-js-slider' },
  spinner:      { jsClass: 'MaterialSpinner',    cssClass: 'mdl-js-spinner' },
  switch:       { jsClass: 'MaterialSwitch',     cssClass: 'mdl-js-switch' },
  tabs:         { jsClass: 'MaterialTabs',       cssClass: 'mdl-js-tabs' },
  textfield:    { jsClass: 'MaterialTextfield',  cssClass: 'mdl-js-textfield' },
  tooltip:      { jsClass: 'MaterialTooltip',    cssClass: 'mdl-tooltip' },
  dataTable:    { jsClass: 'MaterialDataTable',  cssClass: 'mdl-js-data-table' },
  rippleEffect: { jsClass: 'MaterialRipple',     cssClass: 'mdl-js-ripple-effect' }
};


/**********************************
  Upgrade / Refresh MDL components
**********************************/

/**
 * componentHandler is an object in material.js (script for the Material Design Ligth framework)
 * upgradeElement is a method on componentHandler for modifying the dom of components
 * refreshElement exposes this method in the mdl-ux package, allowing templates to call it reactively
 */

//element is jquery element set
function refreshElement(elements, delay, jsClass) {
  elements.removeAttr('data-upgraded');
  Meteor.setTimeout(function () {
    elements.each(function (i, elem) {
      if (jsClass) {
        componentHandler.upgradeElement(elem, jsClass);
        if (elem.classList.contains(components.rippleEffect.cssClass)) {
          componentHandler.upgradeElement(elem, components.rippleEffect.jsClass);
        }
      } else {
        _.each(components, function (val, key) {
          if (elem.classList.contains(val.cssClass)) {
            componentHandler.upgradeElement(elem, val.jsClass);
          }
        });
      }
    });
  }, delay || 0);
}

/**********************************
    Create callback functions for component templates
    The component template, once rendered, or when the data element changes
    will refresh the DOM.
**********************************/

_.keys(components)
.filter(function (component) { return component !== 'rippleEffect'; })
.forEach(function (component) {
  var classes = components[component];

  Template[classes.jsClass].rendered = function () {
    refreshElement(this.$('.'+classes.cssClass), 0, classes.jsClass);
  };

  Template[classes.jsClass].created = function () {
    var tmpl = this;
    tmpl.autorun(function () {
      var data = Template.currentData();
      if (tmpl.lastNode) {
        refreshElement(tmpl.$('.'+classes.cssClass), 50, classes.jsClass);
      }
    });
  };

});


/**********************************
    Universal Refresh Template
**********************************/

Template.MaterialRefresh.created = function () {
  var tmpl = this;
  tmpl.autorun(function () {
    var data = Template.currentData();
    if (tmpl.lastNode) {
      Material.refresh(tmpl.$('*').eq(0), 50);
    }
  });
};

Template.MaterialRefresh.rendered = function () {
  Material.refresh(this.$('*').eq(0), 0);
};

