#mdl-ux
Material Design Lite made reactive for Meteor.

## About ##
This repo is a [Meteor](https://www.meteor.com/) package that contains templates for using Material Design Lite reactively.

## MDL ##
[Material Design Lite](http://www.getmdl.io/index.html) (MDL) is a CSS/Javascript framework similar to Bootstrap, but for [Material Design](https://www.google.com/design/spec/material-design/introduction.html).

The issue with using MDL in Meteor is that the MDL components are configured on page load, but then they don't adapt to reactive changes in Blaze, Meteor's templating engine.

These templates fix that by listening for changes and calling the appropriate methods inside of MDL to re-initialize the component.

## Components ##
MDL consists of many css classes and about a dozen JavaScript components.
* MaterialLayout
* MaterialButton
* MaterialCheckbox
* MaterialIconToggle
* MaterialMenu
* MaterialProgress
* MaterialRadio
* MaterialSlider
* MaterialSpinner
* MaterialSwitch
* MaterialTabs
* MaterialTextfield
* MaterialTooltip
* MaterialDataTable

You can find usage instructions for these components on the [MDL website](http://www.getmdl.io/index.html).

## MDL CSS ##
This package doesn't link to the MDL css file.  This is so you can choose any theme.  First, link to the CSS file in a head tag.
```
<head>
  <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.4/material.blue_grey-blue.min.css" />
</head>
```


## Basic Use ##
Write MDL as instructed by the MDL site, and then wrap the HTML with the appropriate template.

```
{{#MaterialButton}}
<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
  <i class="material-icons">add</i>
</button>
{{/MaterialButton}}
```

This will cause the component DOM to be initialized, but not yet reactive.
Attach a data context to the template to make it reactive.

```
{{#MaterialTabs items=items}}
<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
  <div class="mdl-tabs__tab-bar">
    {{#each items}}
      <a href="#{{titleToId}}" class="mdl-tabs__tab">{{title}}</a>
    {{/each}}
  </div>
  {{#each items}}
  <div class="mdl-tabs__panel" id="{{titleToId}}">
    <p>{{content}}</p>
  </div>
  {{/each}}
</div>
{{/MaterialTabs}}
```

## Univeral Refresh Template ##
There's a less efficient, but functional univeral template.  This is the same as above, but works with any component.
The MaterialRefresh template will upgrade only the parent DOM element inside of the template.

```
{{#MaterialRefresh data=data}}
  <!-- MDL code -->
{{/MaterialRefresh}}
```

## Convenience templates ##
Because writing all of the CSS classes can become a bit much, there are 4 templates that try to reduce that.
It doesn't make sense to have convenience templates for things like tabs, where a lot of code is custom, but for things like buttons
it's nice not to have to write the CSS classes all the time.  Those templates are inside of the components folder.
* mdlButton
* mdlSpinner
* mdlTextfield
* mdlToggle (checkbox, radio, icon-toggle, and switch)


### mdlButton ###
```
{{> mdlButton effect="miniFab" icon="search" id="search-btn"}}
```
Params:
* effect:  default, fab, miniFab, icon
* ripple: true/false
* raised: true/false
* color: primary/accent
* content: text content (for default effect only)
* icon: icon name

On mdlButton, if you set an 'href' variable, a link element will be rendered.  If you set a 'for' variable, a label will be rendered. Otherwise a button will be rendered.

For all of the convenience templates, you can set other variables to have them available on the data object of the template.  It won't affect the DOM.  The template filters out variables that are not standard or data attributes.  For instance, if I need the document '_id' available on 'this' inside of the click handler, I can pass it to the button.
```
{{> mdlButton effect="icon" icon="more_vert" class="options-btn" _id=this._id }}
```


### mdlSpinner ###
```
{{> mdlSpinner active=true color="single" }}
```
Params:
* active: true/false
* color: single/multi


### mdlTextfield ###
```
{{> mdlTextfield label="Name" floating=true name="name"}}
```
Params:
* floating: true/false
* expandable: true/false
* label: text content
* input: serialized JSON (attributes for the input element)

On mdlTextfield, any variable set that is not a standard HTML5 global variable will be passed along to the input element.  If the variable is not a valid input attribute, it will be available only on the data object.  If you want to pass a global variable, like id, to the input element, use serialized JSON.

```
{{> mdlTextfield input='{"id":"password", "class": "login-field"}' placeholder="Password" type="password"}}
```
In this instance, we could have put type and placeholder either inside or outside of the input JSON string.

Usually, the input element needs an 'id' attribute to match the 'for' attribute of the label.  If you don't provide an id, a random one is generated.

To cause a textarea to be rendered, include a 'rows' variable.  If expandable is set to true, rows will be ignored.


### mdlToggle ###
```
{{> mdlToggle toggle="switch" ripple=true label="notifications"}}
```
Params:
* toggle: checkbox, radio, icon, switch
* ripple: true/false
* label: text content
* input: serialized JSON (attributes for the input element)

mdlToggle passes variables to the input element, just like with mdlTextfield.


## Material.refresh ##
If you need to refresh an element from within your JavaScript code, use Material.refresh
```
var elements = tmpl.$('.mdl-js-tabs');
Material.refresh(elements);
```
Material.refresh(elements, [delay, componentName]);
Params:
* elements: a jQuery set
* delay: milliseconds to wait before refreshing
* componentName: e.g. 'MaterialTabs', makes the refresh function a bit more efficient

Currently, refresh is the only variable on the global Material object.