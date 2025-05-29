# Ring Offset Width

## ​Basic usage

### ​Setting the ring offset width

Use utilities like ring-offset-2 and ring-offset-4 to simulate an offset by adding solid white box-shadow and increasing the thickness of the accompanying outline ring to accommodate the offset.

`ring-offset-2``ring-offset-4`ring-offset-0

ring-offset-2

ring-offset-4

```
<button class="... ring ring-pink-500 ring-offset-0">Button A</button>
<button class="... ring ring-pink-500 ring-offset-2">Button B</button>
<button class="... ring ring-pink-500 ring-offset-4">Button C</button>
```

### ​Changing the offset color

You can’t actually offset a box-shadow in CSS, so we have to fake it using a solid color shadow that matches the parent background color. We use white by default, but if you are adding a ring offset over a different background color, use the ring offset color utilities, like ring-offset-slate-50, to match the parent background color:

`ring-offset-slate-50`ring-offset-slate-50
dark:ring-offset-slate-900

```
<button class="ring ring-pink-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 ...">
  Save Changes
</button>
```

For more information, see the ring offset color documentation.

## ​Applying conditionally

### ​Hover, focus, and other states

Tailwind lets you conditionally apply utility classes in different states using variant modifiers. For example, use hover:ring-offset-4 to only apply the ring-offset-4 utility on hover.

`hover:ring-offset-4``ring-offset-4````
<button class="ring-2 ring-offset-2 hover:ring-offset-4">
  <!-- ... -->
</button>
```

For a complete list of all available state modifiers, check out the Hover, Focus, & Other States documentation.

### ​Breakpoints and media queries

You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:ring-offset-4 to apply the ring-offset-4 utility at only medium screen sizes and above.

`md:ring-offset-4``ring-offset-4````
<button class="ring-2 ring-offset-2 md:ring-offset-4">
  <!-- ... -->
</button>
```

To learn more, check out the documentation on Responsive Design, Dark Mode and other media query modifiers.

## ​Using custom values

### ​Customizing your theme

To customize which ring offset width utilities are generated, add your custom values under ringOffsetWidth key in the theme section of your tailwind.config.js file.

`ringOffsetWidth``theme``tailwind.config.js````
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      ringOffsetWidth: {
        '3': '3px',
        '6': '6px',
        '10': '10px',
      }
    }
  }
}
```

Learn more about customizing the default theme in the theme customization documentation.

### ​Arbitrary values

If you need to use a one-off ring-offset value that doesn’t make sense to include in your theme, use square brackets to generate a property on the fly using any arbitrary value.

`ring-offset````
<div class="ring-offset-[3px]">
  <!-- ... -->
</div>
```

Learn more about arbitrary value support in the arbitrary values documentation.

