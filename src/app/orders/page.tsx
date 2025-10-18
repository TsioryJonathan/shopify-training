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
    <div className="min-h-screen bg-gray-50 pt-[136px]">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Commandes</h1>
          <p className="text-gray-600">Suivez l'état de vos commandes et votre historique d'achats</p>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;

              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                          <StatusIcon className="h-4 w-4" />
                          {status.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600 mb-1">Date</div>
                          <div className="font-medium text-gray-900">
                            {order.date.toLocaleDateString("fr-FR")}
                          </div>
                        </div>

                        <div>
                          <div className="text-gray-600 mb-1">Articles</div>
                          <div className="font-medium text-gray-900">{order.items} article(s)</div>
                        </div>

                        <div>
                          <div className="text-gray-600 mb-1">Total</div>
                          <div className="font-medium text-gray-900">
                            {order.total.toLocaleString("fr-FR")} Ar
                          </div>
                        </div>

                        {order.trackingNumber && (
                          <div>
                            <div className="text-gray-600 mb-1">Suivi</div>
                            <div className="font-medium text-gray-900">{order.trackingNumber}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Détails
                      </button>
                      {order.status === "delivered" && (
                        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
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
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Aucune commande</h2>
            <p className="text-gray-600 mb-6">Vous n'avez pas encore passé de commande</p>
            <button
              onClick={() => router.push("/products")}
              className="inline-block px-6 py-3 bg-[#FF6347] text-white rounded-lg font-semibold hover:bg-[#E55347] transition-colors"
            >
              Découvrir nos produits
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

