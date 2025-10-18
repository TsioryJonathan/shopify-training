import React from "react";

type Props = {
  id?: string;
  title?: string;
  description?: string;
  rightSlot?: React.ReactNode; // boutons / filtres rapides
  children: React.ReactNode;
  className?: string; // wrapper externe
  containerClassName?: string; // conteneur intérieur
  compact?: boolean; // réduit les espacements verticaux
  divider?: boolean; // ajoute un séparateur sous l'entête
};

export default function SectionWrapper({
  id,
  title,
  description,
  rightSlot,
  children,
  className = "",
  containerClassName = "",
  compact = false,
  divider = false,
}: Props) {
  const headerPadding = compact ? "py-4" : "py-6";
  const sectionGap = compact ? "gap-6" : "gap-8";

  const titleId = title ? `${id || "section"}-title` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`w-full ${className}`}
    >
      <div className={`flex flex-col ${sectionGap} ${containerClassName}`}>
        {(title || description || rightSlot) && (
          <header className={`${headerPadding} px-6 lg:px-8`}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                {title && (
                  <h2
                    id={titleId}
                    className="text-2xl font-bold text-gray-900 tracking-tight"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-2 text-sm text-gray-600">{description}</p>
                )}
              </div>
              {rightSlot && (
                <div className="shrink-0 flex items-center gap-3">
                  {rightSlot}
                </div>
              )}
            </div>
            {divider && <div className="mt-4 border-b border-gray-100" />}
          </header>
        )}

        <div className="min-w-0 px-6 lg:px-8">{children}</div>
      </div>
    </section>
  );
}
