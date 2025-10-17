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
  const headerPadding = compact ? "py-3" : "py-4";
  const sectionGap = compact ? "gap-4" : "gap-6";

  const titleId = title ? `${id || "section"}-title` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`w-full ${className}`}
    >
      <div className={`flex flex-col ${sectionGap} ${containerClassName}`}>
        {(title || description || rightSlot) && (
          <header className={`${headerPadding}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                {title && (
                  <h2
                    id={titleId}
                    className="truncate text-2xl font-semibold tracking-tight"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
              </div>
              {rightSlot && (
                <div className="shrink-0 flex items-center gap-2">
                  {rightSlot}
                </div>
              )}
            </div>
            {divider && <div className="mt-3 border-b" />}
          </header>
        )}

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
