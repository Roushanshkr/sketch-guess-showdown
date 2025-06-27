import React, { useState, useCallback, memo } from 'react';
import './ProjectCard.css';

// TypeScript interface for component props
export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  sourceUrl?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

// Memoized ProjectCard component for performance optimization
const ProjectCard: React.FC<ProjectCardProps> = memo(({
  title,
  description,
  image,
  technologies,
  demoUrl,
  sourceUrl,
  className = '',
  loading = 'lazy',
  priority = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Optimized image load handler
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Image error handler with fallback
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  // Keyboard navigation handler for accessibility
  const handleKeyPress = useCallback((
    event: React.KeyboardEvent,
    url: string | undefined
  ) => {
    if ((event.key === 'Enter' || event.key === ' ') && url) {
      event.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  // Safe external link handler
  const handleLinkClick = useCallback((url: string | undefined) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <article 
      className={`project-card ${className}`}
      role="article"
      aria-labelledby={`project-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Project Image Container */}
      <div className="project-card__image-container">
        {!imageError ? (
          <>
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div 
                className="project-card__image-placeholder"
                aria-hidden="true"
              >
                <div className="project-card__loading-spinner" />
              </div>
            )}
            
            {/* Main project image */}
            <img
              src={image}
              alt={`Screenshot of ${title} project`}
              className={`project-card__image ${imageLoaded ? 'loaded' : ''}`}
              loading={loading}
              onLoad={handleImageLoad}
              onError={handleImageError}
              decoding="async"
              fetchPriority={priority ? 'high' : 'auto'}
            />
          </>
        ) : (
          /* Fallback when image fails to load */
          <div 
            className="project-card__image-fallback"
            aria-label={`${title} project preview unavailable`}
          >
            <svg 
              className="project-card__fallback-icon"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
            <span className="project-card__fallback-text">Preview Unavailable</span>
          </div>
        )}

        {/* Overlay with action buttons */}
        <div className="project-card__overlay">
          <div className="project-card__actions">
            {demoUrl && (
              <button
                className="project-card__action-btn project-card__action-btn--primary"
                onClick={() => handleLinkClick(demoUrl)}
                onKeyPress={(e) => handleKeyPress(e, demoUrl)}
                aria-label={`View live demo of ${title}`}
                type="button"
              >
                <svg className="project-card__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15,3 21,3 21,9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Live Demo
              </button>
            )}
            
            {sourceUrl && (
              <button
                className="project-card__action-btn project-card__action-btn--secondary"
                onClick={() => handleLinkClick(sourceUrl)}
                onKeyPress={(e) => handleKeyPress(e, sourceUrl)}
                aria-label={`View source code of ${title}`}
                type="button"
              >
                <svg className="project-card__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="16,18 22,12 16,6"/>
                  <polyline points="8,6 2,12 8,18"/>
                </svg>
                Source Code
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="project-card__content">
        <header className="project-card__header">
          <h3 
            id={`project-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="project-card__title"
          >
            {title}
          </h3>
        </header>

        <p className="project-card__description">
          {description}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="project-card__technologies" role="list" aria-label="Technologies used">
            {technologies.map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="project-card__tech-tag"
                role="listitem"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
});

// Display name for debugging
ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
