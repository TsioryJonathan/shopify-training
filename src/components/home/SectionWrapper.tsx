import React from "react";

export default function SectionWrapper({
  title,
  children,
  className = "",
  subtitle,
  actionLink,
  actionText = "Voir tout",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
  actionLink?: string;
  actionText?: string;
}) {
  return (
    <section className={`w-full ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        
        {actionLink && (
          <a
            href={actionLink}
            className="text-sm font-semibold text-[#FF6347] hover:text-[#E55347] transition-colors flex items-center gap-1 group"
          >
            {actionText}
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        )}
      </div>

      {/* Section Content */}
      <div className="w-full">{children}</div>
    </section>
  );
}
