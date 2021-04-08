# drilldown.js
A lightweight, dependency free script to create animated drill down navigation. Inspired by [jquery-drilldown][jquery-drilldown]

## [Documentation & Examples][documentation]

## Getting started
### Include scripts
You can use it with npm `npm i -s drilldown-js` ...
```js
import Drilldown from 'drilldown-js'
```
... or download the `drilldown.min.js` file and include it in your html.
```html
<script src="drilldown.min.js"></script>
```
Otherwise, you have the option to use it with unpkg, jsdeliver or similar services.

### HTML
```html
<div class="drilldown__container">
    <div class="drilldown">
        <div class="drilldown__item">
            <div class="drilldown__parent">
                Parent 1
            </div>
            <div class="drilldown__sub">
                <p class="drilldown__back">
                    Back
                </p>
                <div class="drilldown__item">
                    <a href="#">Child 1</a>
                </div>
                <div class="drilldown__item">
                    <div class="drilldown__parent">
                        Child 2
                    </div>
                    <div class="drilldown__sub" data-drilldown-active>
                        <p class="drilldown__back">
                            Back
                        </p>
                        <div class="drilldown__item">
                            <a href="#">Child 2 1</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="drilldown__item">
            <a href="#">Parent 2</a>
        </div>
    </div>
</div>
```

### SCSS
```scss
.drilldown {
    position: relative;
    width: 100%;
    
    &__container {
        overflow: hidden;
    }
  
    &__sub {
        display: none;
      
        &--active {
            display: block;
            position: absolute;
            width: 100%;
            top: 0;
            margin-left: 100%;
        }
    }
}
```

### JS
Without options
```js
const drilldown = new Drilldown(document.querySelector('.drilldown'))
```
With options
```js
const drilldown = new Drilldown(document.querySelector('.drilldown'), {
  speed: 300
})
```

## Options
You have the possibility to define or override the default options of an instance, according to your needs. To do so, you have to pass an object with the wanted options in it to the constructor as following:

| Option | Description | Default Value |
| --- | --- | --- |
| speed | The transition speed in milliseconds. | `100` |
| deactivated | if the script should be deactivated after initialization. | `false` |
| parentClass | The class of the parent of a sub. It has to be directly before the sub element. | `drilldown__parent` |
| backClass | The class of the back button. | `drilldown__back` |
| subClass | The class of the sub element. It has to be directly after the according parent element. | `drilldown__sub` |
| subActiveClass | The class of the active sub element. | `drilldown__sub--active` |

## Methods

| Method | Parameters | Description |
| --- | --- | --- |
| `deactivate` | | Stop all following and calculating. |
| `activate` | | Initiate the script, get all elements which will follow the cursor and start following. |
| `destroy` | | Prevent any click events and show the highest level of the drilldown. |
| `reset` | `activate: boolean` | Reset the drilldown to the initial position and activate it, if wanted. |
| `up` | `currentSub: HTMLElement` | Navigate up from the given to the next parent sub. |
| `down` | `sub: HTMLElement` | Drill down to the given sub. |

[jquery-drilldown]: https://github.com/Cinamonas/jquery-drilldown
[documentation]: https://jwanner83.github.io/drilldown-js/