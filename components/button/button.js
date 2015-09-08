function mdlButtonClasses(data) {
  var classes = ['mdl-button', 'mdl-js-button'];
  switch(data.effect) {
    case 'fab':
      classes.push('mdl-button--fab');
      break;
    case 'miniFab':
      classes.push('mdl-button--fab mdl-button--mini-fab');
      break;
    case 'icon':
      classes.push('mdl-button--icon');
      break;
  }
  if ((!data.effect || data.effect === 'default') && data.raised) {
    classes.push('mdl-button--raised');
  }
  if (data.ripple) {
    classes.push('mdl-js-ripple-effect');
  }
  if (data.color) {
    if (data.color === 'accent') {
      classes.push('mdl-button--accent');
    } else if ((!data.effect || data.effect === 'default') && !data.raised) {
      classes.push('mdl-button--primary');
    } else {
      classes.push('mdl-button--colored');
    }
  }
  return classes;
}

Template.mdlButton.helpers({
  atts: function (){
    var data = Template.currentData() || {};
    var atts = Material.filterAtts(('href' in data ? 'a' : (data.for ? 'label' : 'button')), data);
    atts.class = (atts.class ? [atts.class] : [])
                 .concat(mdlButtonClasses(data)).join(' ');
    return atts;
  },
  isLink: function () {
    return 'href' in this;
  }
});


