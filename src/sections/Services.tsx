import { servicesConfig } from '../config';
import { Palette, Compass, Zap, Shield, ShoppingBag, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Compass,
  Zap,
  Shield,
  ShoppingBag,
  TrendingUp,
};

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground tracking-tight mb-6">
            {servicesConfig.title}
          </h2>
          <p className="text-dim max-w-2xl mx-auto leading-relaxed">
            {servicesConfig.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesConfig.items.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.title}
                className="liquid-glass rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500 cursor-default"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-500" />
                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-accent/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                    {Icon && <Icon className="w-4 h-4 text-accent" />}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6">
                  <h3 className="text-lg font-medium text-foreground mb-2 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-dim leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
