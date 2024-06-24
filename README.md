# Radio Beautifier

## Beautify radio inputs of your form using browser's compatible and modern css3 styles that will be matched your custom web design.

## It is written in vanilla javascript and completely CSS free without extra dependencies.

#### Browser's compatibility:

- Firefox latest
- Google - latest
- Opera - latest
- IE Edge - latest

#### Initialization with default options.

```html

<form>
    <!-- Input is placed inside label -->
    <label>
        Banana
        <input type="radio" name="fruits" value="banana" class="radio-beautify">
    </label>

    <!-- If you want to use label apart -->
    <label for="mango">Mango</label>
    <input id="mango" type="radio" name="fruits" value="mango" class="radio-beautify">
</form>
```

##### If you are not going to use a bundler like Webpack just put a script tag with a module type at the bottom of html page.

```html

<script type="module">
    // Standard browser' module loader.
    import RadioBeautifier from './src/index.js';

    // Initialization with default options.
    RadioBeautifier.create();

</script>
```

### Add a package using the yarn package manager.

```yarn
$ yarn add radio-beautifier
``` 

##### Webpack bundler usage and import.

```js
import RadioBeautifier from 'radio-beautifier';

// Initialization with default options.
RadioBeautifier.create();

```

### Initialization with custom options.

```html

<script type="module">

    import RadioBeautifier from './src/index.js';

    // Initialization with custom options.
    RadioBeautifier.create({
        selector: '.my-selector',
        size: '30px',
        border: '1px solid #EA8100',
        borderChecked: '1px solid #EA8100',
        paddedSpace: '6px',
        color: 'rgba(234,223,210, 0.5)',
        colorChecked: '#EA8100',
        labelSpace: '0.4rem',
        shadow: 'none'
    });
</script>
```

### Radio `options` is an object literal with the following options:

- `size` — Checkbox size in px, you may set any size you want to match your design style. Default value is set to `20px`

- `color` — Matches checked state of input checkbox, you can apply naming colors like green, red, etc. or hex,
  hsla, rgba `black` or `rgba(0,0,0,1)`. Default value is set to `black` color

- `colorChecked` — Matches checked state of input checkbox, you can apply naming colors. Default value is set to `white` color

- `border` — Checkbox outer border. Default value is set to `1px solid black`

- `borderChecked` — Checkbox css border style when input is checked. Default value is set to `1px solid black`

- `paddedSpace` — This property adds a space between outer border, it is not limited so mostly depends on a size of
  checkbox and your design. Increase or decrease it cautiously by 1px and check how it looks. Default value is set
  to `4px`

- `labelSpace` — This property adds a space between outer border and a label text. Default value is set to `0.6rem`

- `shadow` — Add a shadow from the outer box, To disable shadow just set a value to `none`. Default value
  is set to `0 0 4px rgba(0, 200, 0, 0.4)`

- `transition` — Add css transition between checked/unchecked states. Default value is set to `all 0.4s`

- `selector` — If you want to use custom selector, set value to `.your-custom-selector`. Default value is set
  to `.radio-beautify`

### Helper method `getOptions()`

```html

<script type="module">

    import CheckboxBeautifier from './src/index.js';

    const radioBeautifier = CheckboxBeautifier.create();

    // Returns all possible options that can be modified.
    radioBeautifier.getOptions();

</script>
```