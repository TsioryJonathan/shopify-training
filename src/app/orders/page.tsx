"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Package, Clock, CheckCircle2, XCircle, Truck } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
  trackingNumber?: string;
}

const statusConfig = {
  pending: {
    label: "En attente",
    icon: Clock,
    color: "text-yellow-600 bg-yellow-50",
  },
  processing: {
    label: "En cours",
    icon: Package,
    color: "text-blue-600 bg-blue-50",
  },
  shipped: {
    label: "Expédiée",
    icon: Truck,
    color: "text-purple-600 bg-purple-50",
  },
  delivered: {
    label: "Livrée",
    icon: CheckCircle2,
    color: "text-green-600 bg-green-50",
  },
  cancelled: {
    label: "Annulée",
    icon: XCircle,
    color: "text-red-600 bg-red-50",
  },
};

export default function OrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  // Mock orders data
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: new Date(2024, 9, 15),
      status: "delivered",
      total: 219800,
      items: 3,
      trackingNumber: "TRK123456789",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: new Date(2024, 9, 18),
      status: "shipped",
      total: 89900,
      items: 1,
      trackingNumber: "TRK987654321",
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      date: new Date(2024, 9, 20),
      status: "processing",
      total: 159900,
      items: 2,
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-[90px] transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">Mes Commandes</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Suivez l'état de vos commandes et votre historique d'achats</p>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;

              return (
                <div key={order.id} className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{order.orderNumber}</h3>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${status.color} shadow-sm border border-current/20`}>
                          <StatusIcon className="h-4 w-4" />
                          {status.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600 mb-1">Date</div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {order.date.toLocaleDateString("fr-FR")}
                          </div>
                        </div>

                        <div>
                          <div className="text-gray-600 mb-1">Articles</div>
                          <div className="font-medium text-gray-900 dark:text-white">{order.items} article(s)</div>
                        </div>

                        <div>
                          <div className="text-gray-600 mb-1">Total</div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {order.total.toLocaleString("fr-FR")} Ar
                          </div>
                        </div>

                        {order.trackingNumber && (
                          <div>
                            <div className="text-gray-600 mb-1">Suivi</div>
                            <div className="font-medium text-gray-900 dark:text-white">{order.trackingNumber}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button className="px-5 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:border-gray-300 dark:hover:border-gray-600">
                        Détails
                      </button>
                      {order.status === "delivered" && (
                        <button className="px-5 py-2.5 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-600 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                          Racheter
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-16 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 mb-6 shadow-lg">
              <Package className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Aucune commande</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Vous n'avez pas encore passé de commande</p>
            <button
              onClick={() => router.push("/products")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-xl font-semibold hover:from-[#5B21B6] hover:to-[#7C3AED] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Découvrir nos produits
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

