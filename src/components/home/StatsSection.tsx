"use client";

import { TrendingUp, Users, ShoppingBag, Award, Package, Heart } from "lucide-react";

const stats = [
  {
    icon: Package,
    value: "10K+",
    label: "Produits disponibles",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    value: "50K+",
    label: "Clients satisfaits",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: ShoppingBag,
    value: "100K+",
    label: "Commandes livrées",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Award,
    value: "4.8/5",
    label: "Note moyenne",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Taux de satisfaction",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Heart,
    value: "500+",
    label: "Marques partenaires",
    color: "from-pink-500 to-rose-500"
  }
];

export default function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative group"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all hover:shadow-xl">
            {/* Gradient Border on Hover */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-sm`} />
            
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} mb-4`}>
              <stat.icon className="w-7 h-7 text-white" />
            </div>

            {/* Value */}
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </div>

            {/* Label */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

