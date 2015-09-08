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

function getInputData() {
  this.input = this.input || {};
  if (typeof this.input === 'string') {
    this.input = JSON.parse(this.input);
  }
  if (!this.input.id) {
    this.input.id = 'mdl-tf-'+Math.floor(Math.random()*10000);
  }
  return this.input;
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
    // start with attribute set not used by parent
    var data = Template.currentData();
    var atts = Material.filterAtts((data.href ? 'a' : 'div'), data, true);
    // extend with input-specific attributes
    _.extend(atts, getInputData.bind(this)());

    atts.type = atts.type || 'text';
    atts.class = (atts.class ? atts.class+' ' : '') + 'mdl-textfield__input';

    // filter out non-input attributes
    atts = Material.filterAtts(atts.rows ? 'textarea' : 'input', atts);

    return atts;
  },
  isTextarea: function () {
    var inputData = getInputData.bind(this)();
    return (this.rows || inputData.rows) && !this.expandable;
  },
  inputId: function () {
    var inputData = getInputData.bind(this)();
    return inputData.id;
  }
});
