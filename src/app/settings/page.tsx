"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useThemeStore, Theme } from "@/stores/useThemeStore";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  Globe,
  CreditCard,
  Shield,
  LogOut,
  Save,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, updateProfile, logout } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    country: "Madagascar",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    } else if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        street: user.address?.street || "",
        city: user.address?.city || "",
        postalCode: user.address?.postalCode || "",
        country: user.address?.country || "Madagascar",
      });
    }
  }, [isAuthenticated, router, user]);

  if (!user) {
    return null;
  }

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
    });
    alert("Profil mis à jour avec succès!");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Préférences", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-[136px]">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Réglages</h1>
          <p className="text-gray-600 dark:text-gray-300">Gérez vos informations et préférences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sticky top-[152px]">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-[#FF6347] text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-900"
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}

                <hr className="my-4" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Se déconnecter</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Informations du profil</h2>

                  <div className="space-y-6">
                    {/* Personal Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informations personnelles</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nom complet
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none"
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Téléphone
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none"
                              placeholder="+261 34 00 000 00"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Adresse de livraison</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Rue
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              value={formData.street}
                              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                              className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none"
                              placeholder="123 Avenue de l'Indépendance"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Ville
                            </label>
                            <input
                              type="text"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none"
                              placeholder="Antananarivo"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Code postal
                            </label>
                            <input
                              type="text"
                              value={formData.postalCode}
                              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none"
                              placeholder="101"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Pays
                          </label>
                          <select
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none"
                          >
                            <option>Madagascar</option>
                            <option>France</option>
                            <option>Maurice</option>
                            <option>Réunion</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-3 bg-[#FF6347] text-white rounded-lg font-semibold hover:bg-[#E55347] transition-colors"
                      >
                        <Save className="h-5 w-5" />
                        Enregistrer les modifications
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Sécurité</h2>

                  <div className="space-y-6">
                    {/* Change Password */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Changer le mot de passe</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Mot de passe actuel
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="password"
                              className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nouveau mot de passe
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="password"
                              className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirmer le nouveau mot de passe
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="password"
                              className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>

                        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                          Mettre à jour le mot de passe
                        </button>
                      </div>
                    </div>

                    {/* Two-Factor Auth */}
                    <div className="pt-6 border-t">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Authentification à deux facteurs</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white mb-1">Protection supplémentaire</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            Activez l'authentification à deux facteurs pour sécuriser votre compte
                          </div>
                        </div>
                        <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-white transition-colors">
                          Activer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h2>

                  <div className="space-y-4">
                    {[
                      { label: "Notifications par email", description: "Recevez des emails pour les commandes et offres" },
                      { label: "Notifications push", description: "Recevez des notifications sur votre navigateur" },
                      { label: "Nouveautés", description: "Soyez informé des nouveaux produits" },
                      { label: "Promotions", description: "Recevez les offres spéciales et codes promo" },
                      { label: "Commandes", description: "Mises à jour sur l'état de vos commandes" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white mb-1">{item.label}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{item.description}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF6347]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6347]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Préférences</h2>

                  <div className="space-y-6">
                    {/* Language */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Langue</h3>
                      <select className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none">
                        <option>Français</option>
                        <option>English</option>
                        <option>Malagasy</option>
                      </select>
                    </div>

                    {/* Currency */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Devise</h3>
                      <select className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none">
                        <option>Ariary (Ar)</option>
                        <option>Euro (€)</option>
                        <option>Dollar ($)</option>
                      </select>
                    </div>

                    {/* Theme */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:text-white mb-4">Apparence</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => setTheme("light")}
                          className={`p-4 rounded-lg text-left transition-all ${
                            theme === "light"
                              ? "border-2 border-[#FF6347] bg-[#FF6347]/5"
                              : "border border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Sun className="h-5 w-5 text-yellow-500" />
                            <div className="font-medium text-gray-900 dark:text-white dark:text-white">Clair</div>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400">Thème lumineux</div>
                        </button>
                        
                        <button
                          onClick={() => setTheme("dark")}
                          className={`p-4 rounded-lg text-left transition-all ${
                            theme === "dark"
                              ? "border-2 border-[#FF6347] bg-[#FF6347]/5"
                              : "border border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Moon className="h-5 w-5 text-blue-500" />
                            <div className="font-medium text-gray-900 dark:text-white dark:text-white">Sombre</div>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400">Thème sombre</div>
                        </button>

                        <button
                          onClick={() => setTheme("system")}
                          className={`p-4 rounded-lg text-left transition-all ${
                            theme === "system"
                              ? "border-2 border-[#FF6347] bg-[#FF6347]/5"
                              : "border border-gray-200 dark:border-gray-700 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Monitor className="h-5 w-5 text-gray-500" />
                            <div className="font-medium text-gray-900 dark:text-white dark:text-white">Système</div>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300 dark:text-gray-400">Automatique</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

