# Responsive Design Approach

This document outlines the responsive design approach for the Oceans Exploration project.

## UNDP Design System Breakpoints

We've adopted the breakpoints from the UNDP design system to ensure consistency with their visual language:

| Breakpoint | Size Range | Description |
|------------|------------|-------------|
| `small` | max-width: 767px | Mobile devices |
| `medium` | min-width: 768px | Tablets and up |
| `large` | min-width: 1024px | Desktops |
| `xlarge` | min-width: 1440px | Large desktops |

## Mobile-First Approach

We follow a mobile-first development approach:

1. All base styles are written for mobile devices first
2. Media queries are used to adapt the design for larger screens
3. This ensures better performance and maintainability

## Implementation Example

```scss
.element {
  // Mobile styles (default)
  width: 100%;
  
  // Tablet styles
  @include bp.devicebreak(medium) {
    width: 50%;
  }
  
  // Desktop styles
  @include bp.devicebreak(large) {
    width: 33.33%;
  }
}
```

## Development Tools

- **Breakpoint Visualization**: Toggle `showStyleGuide` in App.vue to see the style guide with breakpoint demo
- **Breakpoint Indicator**: During development, a small indicator shows the current breakpoint in the bottom right corner

## Components Using This Approach

- OceanCards.vue
- SingleOceanCard.vue
- TheNavigation.vue

## Best Practices

1. Always start with mobile styles as the default
2. Use the breakpoint mixins instead of hardcoded media queries
3. Test thoroughly across different screen sizes
4. Use percentage and viewport units where appropriate for fluid layouts
