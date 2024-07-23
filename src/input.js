export default class Radio {

  constructor(options) {
    this.setOptions(options);
    this.inputs = this.getInputs();
    this.init();
  }

  init() {
    let callback;
    if (typeof this.getOption('animation')['onFinished'] === 'function') {
      callback = this.getOption('animation')['onFinished'];
    }

    for (const input of this.inputs) {
      this.hideVendorStyle(input);

      const
          placeholderOuter = document.createElement('span'),
          placeholderInner = document.createElement('span')
      ;
      // Apply styles for outer placeholder element.
      this.setStyles(placeholderOuter, {
        display: 'flex',
        padding: this.getOption('paddedSpace'),
        textAlign: 'center',
        border: this.getOption('border'),
        transition: this.isAnimationKeysSet() ?
            'none' :
            this.getOption('transition'),
        borderRadius: '100%',
        boxShadow: this.getOption('shadow'),
        marginRight: this.getOption('labelSpace'),
        order: -1,
      });
      // Apply styles for inner placeholder element.
      this.setStyles(placeholderInner, {
        transition: this.isAnimationKeysSet() ?
            'none' :
            this.getOption('transition'),
        borderRadius: '100%',
        width: this.getOption('size'),
        height: this.getOption('size'),
        backgroundColor: this.getOption('color'),
      });

      placeholderInner.classList.add('placeholder-inner');

      // Append a child placeholder element.
      placeholderOuter.appendChild(placeholderInner);
      // Get a parent element.
      const parent = input.parentElement;
      // Append a parent placeholder element.
      parent.appendChild(placeholderOuter);

      const
          paddedSpace = parseInt(this.getOption('paddedSpace')),
          size = parseInt(this.getOption('size')),
          lineHeight = paddedSpace > 0 ? size + (paddedSpace * 2) : size;

      if ('LABEL' === parent.nodeName) {
        parent.style.lineHeight = `${lineHeight}px`;
      }
      // Assuming that a target input element isn't placed inside label.
      if ('LABEL' !== parent.nodeName) {
        const labelElement = document.querySelector(`[for="${input.id}"]`);
        labelElement.appendChild(placeholderOuter);
        labelElement.prepend(input);
        // Normalize line height for labels to be used apart.
        labelElement.style.lineHeight = `${lineHeight}px`;
        this.addLabelStyle(labelElement);
      }

      if (input.checked) {
        placeholderInner.style.backgroundColor = this.getOption('colorChecked');
        placeholderOuter.style.border = this.getOption('borderChecked');
      }

      // Check if animation is enabled.
      if (this.isAnimationKeysSet()) {
        // Check if keyframes or options are set.
        if (!this.getOption('animation')['keyframes'] ||
            !this.getOption('animation')['options']) {
          throw new Error(`keyframes and options should be set as in an example below:
          animation: {
            'keyframes: [
              { transform: "skewY(0)" },
              { transform: "skewY(10deg)" },
              { transform: "skewY(0)" },
            ],
            'options': {
              duration: 300,
            },  
          },
        `);
        }
      }

      // Add an event listener on a target input element.
      input.addEventListener('click',
          () => this.statePropertiesHandler(input, placeholderInner));

      // Add another click listener for execution callback when animation will be finished.
      if (typeof this.getOption('animation')['onFinished'] === 'function') {
        input.addEventListener('click',
            () => this.onAnimationComplete(placeholderInner).
                then(() => callback()));
      }
    }
  }

  statePropertiesHandler(input, placeholder) {
    const
        inactiveInputs = Array.from(this.inputs).
            filter(elem => (elem.value !== input.value)),
        outerPlaceholder = placeholder.parentElement,
        animation = this.getOption('animation'),
        keyframes = animation['keyframes'],
        options = animation['options']
    ;

    // Add animation effects for both elements.
    placeholder.animate(keyframes, options);
    outerPlaceholder.animate(keyframes, options);

    // Set options on active placeholder.
    placeholder.style.backgroundColor = this.getOption('colorChecked');
    outerPlaceholder.style.border = this.getOption('borderChecked');

    // Set all other inputs as unchecked and remove active color.
    for (const inactiveInput of inactiveInputs) {
      inactiveInput.checked = false;
      const innerPlaceholder = inactiveInput.parentElement.querySelector(
          '.placeholder-inner');
      innerPlaceholder.style.backgroundColor = this.getOption('color');
      innerPlaceholder.parentElement.style.border = this.getOption('border');
    }
  }

  isAnimationKeysSet() {
    return Object.keys(this.getOption('animation')).length;
  }

  _options = (function() {
    // Default options.
    const defaultOptions = {
      border: '1px solid black',
      borderChecked: '1px solid black',
      color: 'white',
      colorChecked: 'black',
      shadow: '0 0 6px rgba(0, 0, 0, 0.6)',
      size: '20px',
      paddedSpace: '4px',
      transition: 'all 0.4s',
      selector: '.radio-beautify',
      labelSpace: '0.6rem',
      animation: {},
    };
    return {
      setOptions(options) {
        // Overwrite default options.
        for (const key in options) {
          if (defaultOptions.hasOwnProperty(key)) {
            defaultOptions[key] = options[key];
          }
        }
      },
      getOptionValue(key) {
        if (typeof defaultOptions[key] === 'undefined') {
          throw new Error(`
            Cannot find an option [${key}],
             use one of options: ${this.getOptions()}
          `);
        }

        return defaultOptions[key];
      },
      getOptions() {
        return Object.keys(defaultOptions).toString().split(',').join(' | ');
      },
    };
  })();

  setOptions(options) {
    this._options.setOptions(options);
  }

  getOption(key) {
    return this._options.getOptionValue(key);
  }

  /**
   * Returns all available formatted options.
   */
  getOptions() {
    return this._options.getOptions();
  }

  /**
   * Returns input elements by selector.
   */
  getInputs() {
    const
        selector = this.getOption('selector'),
        nodes = document.querySelectorAll(`${selector}`);

    if (0 === nodes.length) {
      throw new Error(
          `Cannot find radio inputs by provided selector: ${selector}`);
    }

    return nodes;
  }

  hideVendorStyle(input) {
    var parent = input.parentElement;

    if ('LABEL' === parent.nodeName) {
      this.addLabelStyle(parent);
    }

    this.setStyles(input, {
      appearance: 'none',
      display: 'none',
      opacity: 0,
      margin: 0,
      padding: 0,
    });
  }

  addLabelStyle(element) {
    this.setStyles(element, {
      display: 'inline-flex',
      cursor: 'pointer',
      userSelect: 'none',
    });
  }

  setStyles(element, styles = {}) {
    Object.assign(element.style, styles);
  }

  onAnimationComplete(element) {
    return Promise.allSettled(
        element.getAnimations().map(animation => animation.finished),
    );
  }

}