/**********************************
    Attributes
    Standard attributes for HTML elements
    Used in filtering attributes out of the data object
**********************************/

var attributes = {
  global: ['accesskey', 'class', 'contenteditable', 'contextmenu', 'dir', 'draggable', 'dropzone',
           'hidden', 'id', 'lang', 'spellcheck', 'style', 'tabindex', 'title', 'translate'],
  a: ['download', 'href', 'hreflang', 'media', 'ping', 'rel', 'target', 'type'],
  button: ['autofocus', 'autocomplete', 'disabled', 'form', 'formaction', 'formenctype',
           'formmethod', 'formnovalidate', 'formtarget', 'name', 'type', 'value'],
  label: ['accesskey', 'for', 'form'],
  input: ['type', 'accept', 'accesskey', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus',
          'autosave', 'checked', 'disabled', 'form', 'formaction', 'formenctype', 'formmethod', 'formnovalidate',
          'formtarget', 'height', 'incremental', 'inputmode', 'list', 'max', 'maxlength', 'min', 'minlength',
          'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'results', 'selectionDirection',
          'size', 'spellcheck', 'src', 'step', 'usemap', 'value', 'width'],
  textarea: ['autocapitalize', 'autocomplete', 'autofocus', 'cols', 'disabled', 'form', 'maxlength', 'minlength',
             'name', 'placeholder', 'readonly', 'required', 'rows', 'selectionDirection', 'selectionEnd', 'selectionStart',
             'spellcheck', 'wrap']
};

/**
 * Get standard attributes available for tag
 */
function getTagAttributes(tag) {
  var tagAtts = attributes[tag] || [];
  return tagAtts.concat(attributes.global);
}

/**
 *  Filter a data object so that it contains only standard attributes for a tag
 */
function filter(tag, data) {
  var stdAtts = getTagAttributes(tag);
  var result = {};
  _.each(data, function (val, key) {
    if (stdAtts.indexOf(key) > -1 || /^data-/.test(key)) {
      result[key] = val;
    }
  });
  return result;
}

Material.filterAtts = filter;