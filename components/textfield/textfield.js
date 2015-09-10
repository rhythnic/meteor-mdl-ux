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

function getDivAtts (data) {
  var atts = MDL.filterAtts((data.href ? 'a' : 'div'), data);
  atts.class = (atts.class ? [atts.class] : [])
                .concat(mdlTextfieldClasses(data)).join(' ');
  return atts;
}

function getInputAtts (data) {
  var atts = Material.filterAtts((data.href ? 'a' : 'div'), data, true);
  // extend with input-specific attributes
  _.extend(atts, getInputData.bind(this)());

  atts.type = atts.type || 'text';
  atts.class = (atts.class ? atts.class+' ' : '') + 'mdl-textfield__input';

  // filter out non-input attributes
  atts = Material.filterAtts(atts.rows ? 'textarea' : 'input', atts);

  return atts;
}

Template.mdlTextfield.helpers({
  divAtts: function (){
    return Template.instance().state.get('divAtts');
  },
  inputAtts: function () {
    return Template.instance().state.get('inputAtts');
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


Template.mdlTextfield.created = function () {
  var tmpl = this;
  tmpl.state = new ReactiveDict();
  tmpl.autorun(function () {

    var data = Template.currentData();
    tmpl.state.set('divAtts', getDivAtts(data));

    var inputAtts = getInputAtts(data);
    tmpl.state.set('inputAtts', inputAtts);

    if (!tmpl.lastNode) return;

    var elem = tmpl.$('div')[0];
    elem.MaterialTextfield[inputAtts.disabled ? 'disable' : 'enable']();
  });
};
