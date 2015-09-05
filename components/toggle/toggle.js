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

Template.mdlToggle.helpers({
  atts: function (){
    var data = Template.currentData() || {};
    var atts = Material.filterAtts('label', data);
    atts.class = (atts.class ? [atts.class] : [])
                 .concat(mdlToggleClasses(data)).join(' ');
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

    atts.type = this.toggle === 'radio' ? 'radio' : 'checkbox';
    atts.class = (atts.class ? atts.class+' ' : '') + (inputClass[this.toggle] || 'mdl-checkbox__input');
    atts.id = atts.id || 'mdl-tgl-'+Math.floor(Math.random()*5).toString();

    atts = Material.filterAtts('input', atts);

    return atts;
  },
  labelClass: function () {
    return labelClass[this.toggle] || 'mdl-checkbox__label';
  }
});