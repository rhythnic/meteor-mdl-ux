/**
 * Test that DOM element attributes are filtered from the data object
 */
Tinytest.add('filter attributes', function (test) {
  var data = { title: 'My title', name: 'input name', invalidAtt: 'whatever' };
  var atts = Attributes.filter('div', data);
  test.equal(atts.title, 'My title');
  test.isUndefined(atts.name);
  test.isUndefined(atts.invalidAtt);
  atts = Attributes.filter('input', data);
  test.equal(atts.title, 'My title');
  test.equal(atts.name, 'input name');
  test.isUndefined(atts.invalidAtt);
});

/**
 * Test that Material.refresh upgrades the element
 */
Tinytest.add('refresh element', function (test) {
  var el = $(document.createElement('div')).addClass('mdl-js-tabs');
  Material.refresh(el);
  Meteor.setTimeout(function () {
    test.isTrue(el.hasClass('is-upgraded'));
    test.equal(el.data('upgraded'), ',MaterialTabs');
  }, 10);
});
