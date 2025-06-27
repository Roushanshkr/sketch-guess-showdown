// Type definitions for ProjectCard component

export interface ProjectCardProps {
  /** The title of the project */
  title: string;
  
  /** A brief description of the project */
  description: string;
  
  /** URL or path to the project image */
  image: string;
  
  /** Array of technologies/frameworks used in the project */
  technologies: string[];
  
  /** Optional URL to the live demo */
  demoUrl?: string;
  
  /** Optional URL to the source code repository */
  sourceUrl?: string;
  
  /** Additional CSS classes to apply */
  className?: string;
  
  /** Image loading strategy */
  loading?: 'lazy' | 'eager';
  
  /** Whether this image should be prioritized for loading */
  priority?: boolean;
}

// Re-export for convenience
export type { ProjectCardProps as ProjectCard };

// Additional utility types
export interface ProjectData {
  id: string | number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
  category?: string;
  completedDate?: Date | string;
}

export interface ProjectCardGridProps {
  projects: ProjectData[];
  columns?: number;
  gap?: string;
  className?: string;
}

// Event handler types
export type ProjectCardClickHandler = (projectId: string | number) => void;
export type ProjectCardLinkHandler = (url: string, type: 'demo' | 'source') => void;
