# yo-yeah

A simple Custom Element wrapper that places nice with (but does not require) [yo-yo](https://github.com/maxogden/yo-yo).

## Requirements

The example will only run in a browser with Custom Element and ES6 support. (The latest Chrome is a good bet.) If you need it to work in other environments, include a [Web Components polyfill](http://webcomponents.org/polyfills/) and convert your javascript to ES5 using [Babel](http://babeljs.io/) or similar.

## Usage

```javascript
var yeah = require('yo-yeah')
yeah('x-my-element', myElementFunction)
```

Where `myElementFunction` takes a `state` object as the single argument, and returns an HTML element, optionally with an `update` function.

The `state` object can be anything you want. The wrapper will in inject a `children` value into that state object with the child elements.

## Example

index.js

```javascript
var yeah = require('yo-yeah')
var message = require('./message')
yeah('x-message', message)
```

message.js

```javascript
var yo = require('yo-yo')

module.exports = function (state) {
  var el = render(state.message)
  function render (m) {
    if (m === undefined) m = "This is the default message."
    return yo`<div>
      Message is: ${m}
      <button onclick=${reset}>reset</button>
    </div>`
  }
  function reset () {
    yo.update(el, render())
  }
  el.update = function (state) {
    yo.update(el, render(state.message))
  }
  return el
}
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>yo yeah test</title>
    <script src="bundle.js"></script>
  </head>
  <body>
    <x-message id="message" message="Heeeey"></x-message>
    <form id="form">
      <input id="message-input"></input>
      <button type="submit" id="message-button">set message</button>
    </form>
    <script>
      var messageEl = document.getElementById('message')
      var messageInput = document.getElementById('message-input')
      var form = document.getElementById('form')
      form.onsubmit = function(e) {
        e.preventDefault()
        document.getElementById('message').setAttribute('message', messageInput.value)
      }
    </script>
  </body>
</html>
```
