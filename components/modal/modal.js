/**********************************
    Global Modal Spec
**********************************/

var modal = {
  _spec: new ReactiveDict(),
  _onConfirm: null
};

function setModal(spec) {
  _.each(spec, function (val, key) {
    if (key !== 'onConfirm') {
      modal._spec.set(key, val);
    } else if (val instanceof Function) {
      modal._onConfirm = val;
      modal._spec.set(key, true);
    }
  });
  _.each(modal._spec.keys, function (val, key) {
    if (!(key in spec)) {
      modal._spec.set(key, null);
      if (key === 'onConfirm') {
        modal._onConfirm = null;
      }
    }
  });
  if (!('show' in spec)) {
    modal._spec.set('show', true);
  }
}
modal.set = setModal;

function showModal () {
  if (modal._spec) {
    modal._spec.set('show', true);
  }
}
modal.hide = hideModal;

function hideModal() {
  if (modal._spec) {
    modal._spec.set('show', false);
  }
}
modal.hide = hideModal;

MDL.modal = modal;



/**********************************
    Template logic
**********************************/


function mdlModalClasses (data) {
  var classes = ['mdl-modal'];
  if (data.show) {
    classes.push('is-visible');
  }
  if (data.error) {
    classes.push('is-error');
  }
  return classes;
}

Template.mdlModal.helpers({
  atts: function () {
    var modalData = {
      show: modal._spec.get('show'),
      error: modal._spec.get('error')
    };
    var data = _.extend(Template.currentData() || {}, modalData);
    var atts = MDL.filterAtts('div', data);
    atts.class = (atts.class ? [atts.class] : []).concat(mdlModalClasses(data)).join(' ');
    return atts;
  },
  message: function () {
    return modal._spec.get('message') || modal._spec.get('error');
  },
  confirm: function () {
    return !!modal._spec.get('onConfirm');
  },
  template: function () {
    return modal._spec.get('template');
  },
  templateData: function () {
    return modal._spec.get('templateData');
  }
});



Template.mdlModal.events({
  'click .mdl-modal__close-btn': function () {
    modal._spec.set('show', false);
  },
  'click .mdl-modal__cancel-btn': function () {
    modal._spec.set('show', false);
  },
  'click .mdl-modal__confirm-btn': function () {
    modal._spec.set('show', false);
    if (modal._onConfirm) { modal._onConfirm(); }
  }
});
