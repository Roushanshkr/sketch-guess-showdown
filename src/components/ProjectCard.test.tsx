import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ProjectCard from './ProjectCard';
import type { ProjectCardProps } from './ProjectCard.types';

// Mock window.open for testing external links
const mockWindowOpen = jest.fn();
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
});

// Default test props
const defaultProps: ProjectCardProps = {
  title: 'Test Project',
  description: 'This is a test project description',
  image: '/test-image.jpg',
  technologies: ['React', 'TypeScript', 'Jest'],
  demoUrl: 'https://demo.example.com',
  sourceUrl: 'https://github.com/test/project',
};

describe('ProjectCard', () => {
  beforeEach(() => {
    mockWindowOpen.mockClear();
  });

  describe('Rendering', () => {
    it('renders all required elements', () => {
      render(<ProjectCard {...defaultProps} />);
      
      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('This is a test project description')).toBeInTheDocument();
      expect(screen.getByAltText('Screenshot of Test Project project')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Jest')).toBeInTheDocument();
    });

    it('renders demo and source buttons when URLs provided', () => {
      render(<ProjectCard {...defaultProps} />);
      
      expect(screen.getByLabelText('View live demo of Test Project')).toBeInTheDocument();
      expect(screen.getByLabelText('View source code of Test Project')).toBeInTheDocument();
    });

    it('does not render demo button when demoUrl is not provided', () => {
      const props = { ...defaultProps, demoUrl: undefined };
      render(<ProjectCard {...props} />);
      
      expect(screen.queryByLabelText('View live demo of Test Project')).not.toBeInTheDocument();
      expect(screen.getByLabelText('View source code of Test Project')).toBeInTheDocument();
    });

    it('does not render source button when sourceUrl is not provided', () => {
      const props = { ...defaultProps, sourceUrl: undefined };
      render(<ProjectCard {...props} />);
      
      expect(screen.getByLabelText('View live demo of Test Project')).toBeInTheDocument();
      expect(screen.queryByLabelText('View source code of Test Project')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ProjectCard {...defaultProps} className="custom-class" />
      );
      
      expect(container.firstChild).toHaveClass('project-card', 'custom-class');
    });
  });

  describe('Image Handling', () => {
    it('shows loading placeholder initially', () => {
      render(<ProjectCard {...defaultProps} />);
      
      expect(screen.getByRole('img')).not.toHaveClass('loaded');
    });

    it('shows loaded image after load event', async () => {
      render(<ProjectCard {...defaultProps} />);
      
      const image = screen.getByAltText('Screenshot of Test Project project');
      fireEvent.load(image);
      
      await waitFor(() => {
        expect(image).toHaveClass('loaded');
      });
    });

    it('shows fallback UI when image fails to load', async () => {
      render(<ProjectCard {...defaultProps} />);
      
      const image = screen.getByAltText('Screenshot of Test Project project');
      fireEvent.error(image);
      
      await waitFor(() => {
        expect(screen.getByText('Preview Unavailable')).toBeInTheDocument();
      });
    });

    it('sets correct loading attribute', () => {
      render(<ProjectCard {...defaultProps} loading="eager" />);
      
      const image = screen.getByAltText('Screenshot of Test Project project');
      expect(image).toHaveAttribute('loading', 'eager');
    });
  });

  describe('Interactions', () => {
    it('opens demo URL when demo button is clicked', async () => {
      const user = userEvent.setup();
      render(<ProjectCard {...defaultProps} />);
      
      const demoButton = screen.getByLabelText('View live demo of Test Project');
      await user.click(demoButton);
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://demo.example.com',
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('opens source URL when source button is clicked', async () => {
      const user = userEvent.setup();
      render(<ProjectCard {...defaultProps} />);
      
      const sourceButton = screen.getByLabelText('View source code of Test Project');
      await user.click(sourceButton);
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://github.com/test/project',
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('handles keyboard navigation for demo button', async () => {
      const user = userEvent.setup();
      render(<ProjectCard {...defaultProps} />);
      
      const demoButton = screen.getByLabelText('View live demo of Test Project');
      demoButton.focus();
      await user.keyboard('{Enter}');
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://demo.example.com',
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('handles space key for button activation', async () => {
      const user = userEvent.setup();
      render(<ProjectCard {...defaultProps} />);
      
      const sourceButton = screen.getByLabelText('View source code of Test Project');
      sourceButton.focus();
      await user.keyboard(' ');
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://github.com/test/project',
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<ProjectCard {...defaultProps} />);
      
      expect(screen.getByRole('article')).toHaveAttribute(
        'aria-labelledby',
        'project-title-test-project'
      );
      expect(screen.getByRole('list', { name: 'Technologies used' })).toBeInTheDocument();
    });

    it('has proper heading structure', () => {
      render(<ProjectCard {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Test Project');
      expect(heading).toHaveAttribute('id', 'project-title-test-project');
    });

    it('has proper button roles and labels', () => {
      render(<ProjectCard {...defaultProps} />);
      
      const demoButton = screen.getByRole('button', { name: /view live demo/i });
      const sourceButton = screen.getByRole('button', { name: /view source code/i });
      
      expect(demoButton).toBeInTheDocument();
      expect(sourceButton).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('does not re-render when props are the same', () => {
      const { rerender } = render(<ProjectCard {...defaultProps} />);
      const initialRender = screen.getByText('Test Project');
      
      rerender(<ProjectCard {...defaultProps} />);
      const afterRerender = screen.getByText('Test Project');
      
      expect(initialRender).toBe(afterRerender);
    });

    it('sets fetchPriority when priority is true', () => {
      render(<ProjectCard {...defaultProps} priority={true} />);
      
      const image = screen.getByAltText('Screenshot of Test Project project');
      expect(image).toHaveAttribute('fetchpriority', 'high');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty technologies array', () => {
      const props = { ...defaultProps, technologies: [] };
      render(<ProjectCard {...props} />);
      
      expect(screen.queryByRole('list', { name: 'Technologies used' })).not.toBeInTheDocument();
    });

    it('handles very long titles and descriptions', () => {
      const props = {
        ...defaultProps,
        title: 'A'.repeat(100),
        description: 'B'.repeat(500),
      };
      
      render(<ProjectCard {...props} />);
      
      expect(screen.getByText('A'.repeat(100))).toBeInTheDocument();
      expect(screen.getByText('B'.repeat(500))).toBeInTheDocument();
    });

    it('handles special characters in title', () => {
      const props = {
        ...defaultProps,
        title: 'Project with "Special" & <Characters>',
      };
      
      render(<ProjectCard {...props} />);
      
      expect(screen.getByText('Project with "Special" & <Characters>')).toBeInTheDocument();
    });
  });
});
