# mdl-ux #
Material Design Lite made reactive for Meteor.

## About ##
This repo is a [Meteor](https://www.meteor.com/) package that contains templates for using Material Design Lite reactively.

## MDL ##
[Material Design Lite](http://www.getmdl.io/index.html) (MDL) is a CSS/Javascript framework similar to Bootstrap, but for [Material Design](https://www.google.com/design/spec/material-design/introduction.html).

This MDL package has two advantages.  The first is a universal wrapping template that will initialize all MDL components contained in the wrapper.  This fascilitates initializing any group of components whenever you want.
The second advantage is the convenience templates, which help reduce code size.  Convenience templates also call MDL methods reactively to "refresh" the template.

You can find usage instructions for MDL components on the [MDL website](http://www.getmdl.io/index.html).

## MDL CSS ##
This package doesn't link to the MDL css file.  This is so you can choose any theme.  First, link to the MDL files in a head tag.
```
<head>
  <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.5/material.indigo-pink.min.css">
  <script src="https://storage.googleapis.com/code.getmdl.io/1.0.5/material.min.js"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>
```

## Basic Use ##
Write MDL as instructed by the MDL site, and then wrap the HTML with the MDL template.

```
{{#MDL}}
<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
  <i class="material-icons">add</i>
</button>
{{/MDL}}
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
* effect:  {string} 'default', 'fab', 'miniFab', 'icon'
* ripple: {boolean}
* raised: {boolean}
* color: {string} 'primary'/'accent'
* content: {string} text content (for default effect only)
* icon: {string} icon name

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
* active: {boolean}
* color: {string} 'single'/'multi'




### mdlTextfield ###
```
{{> mdlTextfield label="Name" floating=true name="name"}}
```
Params:
* floating: {boolean}
* expandable: {boolean}
* label: {string}
* input: {object|string} attributes for the input element
* error: {string} error message (only visible if input is in an invalid state)

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
* toggle: {string} 'checkbox', 'radio', 'icon', 'switch'
* ripple: {boolean}
* label: {string}
* input: {object|string} attributes for the input element

mdlToggle passes variables to the input element, just like with mdlTextfield.



### disabled ###
mdlButton, mdlTextfield, and mdlToggle will respond reactively to setting a 'disabled' property on the template data object.  mdlToggle will respond reactively to setting a 'checked' property.


### MDL.upgrade ###
In the event that you can't use the template wrapper, you can call the MDL.upgrade function and pass in the jQuery set.
```
var elements = tmpl.$('mdl-checkbox');
MDL.upgrade(elements);
```


### mdlModal ###
mdlModal is not part of the core of MDL, but it's something added to this package.  mdlModal consists of a global template and methods for manipulating it.

#### template ####
Put the template high enough in the template stack so that it's size won't be constrained.
```
<main class="mdl-layout__content">
  {{> yield}}
  {{> mdlModal}}
</main>
```

#### MDL.modal ####
There are 3 methods on MDL.modal.
* MDL.modal.set()
* MDL.modal.show()
* MDL.modal.hide()

The show and hide methods don't take any parameters.  The set method will reconfigure the modal.  Set will also show the modal by default, unless you set show to false in the options.

MDL.set parameters:
* error {string} : error message, overrides message option
* message {string} : message to display
* onConfirm: {Function} : confirm callback, setting this option will cause "Cancel" and "Confirm" buttons show on the bottom of the modal
* template {string} : name of template to display inside of the modal.  template is overridden by the message and error options.
* templateData {Object}: data context for template option
* show {boolean}: show the modal, defualt is false

