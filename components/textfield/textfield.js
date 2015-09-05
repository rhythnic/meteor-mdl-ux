function mdlTextfieldClasses(data) {
  var classes = ['mdl-textfield', 'mdl-js-textfield'];
  if (data.floating) {
    classes.push('mdl-textfield--floating-label');
  }
  if (data.expandable) {
    classes.push('mdl-textfield--expandable');
  }
  return classes;
}

Template.mdlTextfield.helpers({
  atts: function (){
    var data = Template.currentData() || {};
    var atts = Material.filterAtts((data.href ? 'a' : 'div'), data);
    atts.class = (atts.class ? [atts.class] : [])
                 .concat(mdlTextfieldClasses(data)).join(' ');
    return atts;
  },
  inputAtts: function () {
    var atts = this.input ? JSON.parse(this.input) : {};

    // copy input attributes from parent scope
    _.each(this, function (val, key) {
      if (!(key in atts)) {
        atts[key] = val;
      }
    }, this);

    atts.type = atts.type || 'text';
    atts.class = (atts.class ? atts.class+' ' : '') + 'mdl-textfield__input';
    atts.id = atts.id || 'mdl-tf-'+Math.floor(Math.random()*5).toString();

    atts = Material.filterAtts(atts.rows ? 'textarea' : 'input', atts);

    return atts;
  },
  isTextarea: function () {
    return this.rows && !Template.parentData(1).expandable;
  }
});