function mdlToggleClasses(data) {
  var classes = [];
  switch(data.toggle) {
    case 'radio':
      classes.push('mdl-radio mdl-js-radio');
      break;
    case 'icon':
      classes.push('mdl-icon-toggle mdl-js-icon-toggle');
      break;
    case 'switch':
      classes.push('mdl-switch mdl-js-switch');
      break;
    default:
      classes.push('mdl-checkbox mdl-js-checkbox');
  }
  if (data.ripple) {
    classes.push('mdl-js-ripple-effect');
  }
  return classes;
}

var inputClass = {
  'radio': 'mdl-radio__button',
  'icon': 'mdl-icon-toggle__input',
  'switch': 'mdl-switch__input'
};

var labelClass = {
  'radio': 'mdl-radio__label',
  'switch': 'mdl-switch__label'
};

function getLabelAtts(data) {
  var atts = MDL.filterAtts('label', data);
  atts.class = (atts.class ? [atts.class] : [])
               .concat(mdlToggleClasses(data)).join(' ');
  return atts;
}

function getInputAtts(data) {
  //input atts
  var atts = data.input ? (typeof data.input === 'string' ? JSON.parse(data.input) : data.input) : {};

  // copy input attributes from parent scope
  _.each(data, function (val, key) {
    if (!(key in atts) && key !== 'input'){
      atts[key] = val;
    }
  });

  atts.type = data.toggle === 'radio' ? 'radio' : 'checkbox';
  atts.class = (atts.class ? atts.class+' ' : '') + (inputClass[data.toggle] || 'mdl-checkbox__input');
  atts.id = atts.id || 'mdl-tgl-'+Math.floor(Math.random()*5).toString();

  atts = MDL.filterAtts('input', atts);
  return atts;
}

Template.mdlToggle.helpers({
  labelAtts: function (){
    return Template.instance().state.get('labelAtts');
  },
  inputAtts: function () {
    return Template.instance().state.get('inputAtts');
  },
  labelClass: function () {
    return labelClass[this.toggle] || 'mdl-checkbox__label';
  }
});

Template.mdlToggle.created = function () {
  var tmpl = this;
  tmpl.state = new ReactiveDict();
  tmpl.autorun(function () {
    // atts
    var data = Template.currentData();
    tmpl.state.set('labelAtts', getLabelAtts(data));

    var inputAtts = getInputAtts(data);
    tmpl.state.set('inputAtts', inputAtts);


    if (!tmpl.lastNode) return;

    var elem = tmpl.$('label')[0];

    switch(data.toggle) {
      case 'radio':
        elem.MaterialRadio['disabled' in inputAtts ? 'disable' : 'enable']();
        elem.MaterialRadio['checked' in inputAtts ? 'check' : 'uncheck']();
        break;
      case 'switch':
        elem.MaterialSwitch['disabled' in inputAtts ? 'disable' : 'enable']();
        elem.MaterialSwitch['checked' in inputAtts ? 'on' : 'off']();
        break;
      case 'icon':
        elem.MaterialIconToggle['disabled' in inputAtts ? 'disable' : 'enable']();
        elem.MaterialIconToggle['checked' in inputAtts ? 'check' : 'uncheck']();
        break;
      default:
        elem.MaterialCheckbox['disabled' in inputAtts ? 'disable' : 'enable']();
        elem.MaterialCheckbox['checked' in inputAtts ? 'check' : 'uncheck']();
    }
  });
};