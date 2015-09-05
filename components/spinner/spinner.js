function mdlSpinnerClasses(data) {
  var classes = ['mdl-spinner', 'mdl-js-spinner'];
  if (data.color === "single") {
    classes.push('mdl-spinner--single-color');
  }
  if (data.active) {
    classes.push('is-active');
  }
  return classes;
}


Template.mdlSpinner.helpers({
  atts: function (){
    var data = Template.currentData() || {};
    var atts = Material.filterAtts('div', data);
    atts.class = (atts.class ? [atts.class] : [])
                 .concat(mdlSpinnerClasses(data)).join(' ');
    return atts;
  }
});