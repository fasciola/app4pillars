import { useState } from 'react';
import { portfolioConfig, projects } from '../config';
import { ExternalLink, Eye } from 'lucide-react';

export default function Portfolio() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="portfolio" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground tracking-tight mb-6">
            {portfolioConfig.title}
          </h2>
          <p className="text-dim max-w-2xl mx-auto leading-relaxed">
            {portfolioConfig.subtitle}
          </p>
        </div>

        {/* Projects Grid - Masonry style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative overflow-hidden rounded-2xl liquid-glass cursor-pointer ${
                index === 0 || index === 3 ? 'md:row-span-2' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Project Image */}
              <div className={`relative overflow-hidden ${
                index === 0 || index === 3 ? 'aspect-[3/4]' : 'aspect-[16/10]'
              }`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-500" />

                {/* Hover content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  {/* Category badge */}
                  <span className="relative z-10 inline-block self-start text-[10px] uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full mb-3">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="relative z-10 text-2xl sm:text-3xl font-light text-foreground tracking-tight mb-1">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className="relative z-10 text-sm text-dim mb-4">
                    {project.tagline}
                  </p>

                  {/* View button - appears on hover */}
                  <div
                    className={`relative z-10 flex items-center gap-3 transition-all duration-500 ${
                      hoveredIndex === index
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/20 text-accent text-xs font-medium hover:bg-accent/30 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Live Site
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border border-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-3 h-3 text-white/50" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
