# ProjectCard Component

A modern, responsive React component for displaying portfolio project cards with TypeScript support.

## Features

- ✅ **Responsive Design** - Works seamlessly on mobile and desktop
- ✅ **TypeScript Support** - Full type safety and IntelliSense
- ✅ **Accessibility** - WCAG compliant with proper ARIA labels
- ✅ **Performance Optimized** - Lazy loading, memoization, and efficient rendering
- ✅ **Modern Styling** - Clean design with hover effects and animations
- ✅ **Flexible** - Customizable with props and CSS classes
- ✅ **Error Handling** - Graceful fallbacks for failed image loads

## Installation

```bash
# Copy the component files to your project
cp ProjectCard.tsx ProjectCard.css ProjectCard.types.ts your-project/src/components/
```

## Basic Usage

```jsx
import ProjectCard from './components/ProjectCard';

function Portfolio() {
  return (
    <ProjectCard
      title="E-Commerce Website"
      description="A full-featured online store with cart, checkout, and payment processing"
      image="/images/ecommerce.jpg"
      technologies={["React", "Node.js", "MongoDB"]}
      demoUrl="https://example.com"
      sourceUrl="https://github.com/username/project"
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | The project title |
| `description` | `string` | ✅ | - | Project description |
| `image` | `string` | ✅ | - | Image URL or path |
| `technologies` | `string[]` | ✅ | - | Array of tech stack items |
| `demoUrl` | `string` | ❌ | - | Live demo URL |
| `sourceUrl` | `string` | ❌ | - | Source code URL |
| `className` | `string` | ❌ | `''` | Additional CSS classes |
| `loading` | `'lazy' \| 'eager'` | ❌ | `'lazy'` | Image loading strategy |
| `priority` | `boolean` | ❌ | `false` | High priority loading |

## Advanced Usage

### Grid Layout

```jsx
const projects = [
  {
    title: "Project 1",
    description: "Description 1",
    image: "/image1.jpg",
    technologies: ["React", "TypeScript"],
    demoUrl: "https://demo1.com"
  },
  // ... more projects
];

function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          {...project}
          priority={index === 0} // First project loads eagerly
        />
      ))}
    </div>
  );
}
```

### Custom Styling

```jsx
<ProjectCard
  title="Featured Project"
  description="A special project with custom styling"
  image="/featured.jpg"
  technologies={["React", "Three.js"]}
  demoUrl="https://demo.com"
  className="project-card--featured project-card--large"
/>
```

```css
.project-card--featured {
  border: 2px solid #667eea;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.project-card--large {
  max-width: 500px;
}
```

## Accessibility Features

- **Semantic HTML** - Uses proper `article`, `header`, and `role` attributes
- **Keyboard Navigation** - Full keyboard support for interactive elements
- **Screen Reader Support** - Descriptive ARIA labels and alt text
- **Focus Management** - Visible focus indicators and logical tab order
- **Reduced Motion** - Respects `prefers-reduced-motion` setting
- **High Contrast** - Supports `prefers-contrast: high`

## Performance Optimizations

- **React.memo** - Prevents unnecessary re-renders
- **Lazy Loading** - Images load only when needed
- **Optimized Images** - Supports modern loading attributes
- **Efficient Event Handlers** - useCallback for stable references
- **Minimal Bundle Size** - Tree-shakeable and dependency-free

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Customization

### CSS Custom Properties

```css
.project-card {
  --card-border-radius: 16px;
  --card-padding: 20px;
  --card-gap: 12px;
  --primary-color: #667eea;
  --secondary-color: #764ba2;
}
```

### Theme Integration

The component uses CSS custom properties and can be easily integrated with theme systems:

```jsx
<div className="theme-dark">
  <ProjectCard {...props} />
</div>
```

## Error Handling

The component includes robust error handling:

- **Image Load Failures** - Shows fallback UI with icon
- **Missing URLs** - Gracefully hides unavailable buttons
- **Invalid Props** - TypeScript prevents runtime errors

## Testing

```jsx
import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

test('renders project card with title', () => {
  render(
    <ProjectCard
      title="Test Project"
      description="Test description"
      image="/test.jpg"
      technologies={["React"]}
    />
  );
  
  expect(screen.getByText('Test Project')).toBeInTheDocument();
});
```

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new props
3. Include accessibility considerations
4. Test on multiple devices and browsers
5. Update documentation for new features

## License

MIT License - feel free to use in your projects!
