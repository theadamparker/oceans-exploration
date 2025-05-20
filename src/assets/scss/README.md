# SCSS Utilities

This directory contains shared SCSS utilities for the Oceans Exploration project.

## Breakpoints

The breakpoints are based on the UNDP design system's breakpoint definitions, which follow a mobile-first approach.

### How to use

Import the breakpoints in your component's SCSS:

```scss
@use '@/assets/scss/breakpoints' as bp;
```

Then use them in your SCSS:

```scss
.my-element {
  // Base mobile styles go here
  
  @include bp.devicebreak(medium) {
    // Tablet and up (min-width: 768px)
  }
  
  @include bp.devicebreak(large) {
    // Desktop (min-width: 1024px)
  }
  
  @include bp.devicebreak(xlarge) {
    // Large desktop (min-width: 1440px)
  }
}
```

For mobile-specific styles:

```scss
@include bp.devicebreak(small) {
  // Mobile only (max-width: 767px)
}
```

### Breakpoint values

- `small`: max-width: 47.9375em (767px)
- `mediumonlytab`: max-width: 63.9375em (1023px)
- `medium`: min-width: 48em (768px)
- `large`: min-width: 64em (1024px)
- `xlarge`: min-width: 90em (1440px)
```
