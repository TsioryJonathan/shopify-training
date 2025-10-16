import React from "react";

export default function SectionWrapper({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`w-full py-10 px-4 md:px-8 ${className}`}>
      <div className="flex flex-col items-center justify-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center tracking-tight relative">
          {title}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-black rounded-full"></span>
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
