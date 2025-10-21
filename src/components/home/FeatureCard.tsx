"use client";

import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function FeatureCard({ icon: Icon, title, description }: Props) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group">
      <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

