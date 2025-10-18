"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { User, Mail, Phone, MapPin, Calendar, ShoppingBag, Heart, Package } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null;
  }

  const stats = [
    {
      label: "Commandes",
      value: "12",
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Panier",
      value: cartItems.length,
      icon: ShoppingBag,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Favoris",
      value: wishlistItems.length,
      icon: Heart,
      color: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-[136px] transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-6 transition-colors">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#FF6347] to-[#FF8C69] flex items-center justify-center text-white text-4xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors">
                <User className="h-4 w-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white mb-2">{user.name}</h1>
              <p className="text-gray-600 dark:text-gray-300 dark:text-gray-300 mb-4">Membre depuis {new Date(user.createdAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 dark:text-gray-300">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 dark:text-gray-300">
                    <Phone className="h-4 w-4" />
                    {user.phone}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/settings")}
                className="px-6 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Modifier le profil
              </button>
              <button
                onClick={() => router.push("/wallet")}
                className="px-6 py-2.5 bg-[#FF6347] text-white rounded-lg font-medium hover:bg-[#E55347] transition-colors"
              >
                Mon portefeuille
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Personal Info */}
          <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white dark:text-white mb-6">Informations personnelles</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom complet
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{user.name}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{user.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Téléphone
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{user.phone || "Non renseigné"}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date d'inscription
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">
                      {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
              </div>

              {user.address && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Adresse de livraison
                  </label>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="text-gray-900 dark:text-white">
                      <div>{user.address.street}</div>
                      <div>{user.address.city}, {user.address.postalCode}</div>
                      <div>{user.address.country}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Actions rapides</h2>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/cart")}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <ShoppingBag className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Mon panier</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{cartItems.length} article(s)</div>
                  </div>
                </button>

                <button
                  onClick={() => router.push("/wishlist")}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <Heart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Mes favoris</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{wishlistItems.length} article(s)</div>
                  </div>
                </button>

                <button
                  onClick={() => router.push("/orders")}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <Package className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Mes commandes</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">12 commande(s)</div>
                  </div>
                </button>
              </div>
            </div>

            {user.wallet && (
              <div className="bg-gradient-to-br from-[#FF6347] to-[#FF8C69] rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Solde du portefeuille</h3>
                <div className="text-3xl font-bold mb-4">
                  {user.wallet.balance.toLocaleString("fr-FR")} {user.wallet.currency}
                </div>
                <button
                  onClick={() => router.push("/wallet")}
                  className="w-full bg-white text-[#FF6347] py-2 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Gérer mon portefeuille
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

