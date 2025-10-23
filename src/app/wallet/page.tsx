"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  TrendingUp,
  Send,
  Download,
  Eye,
  EyeOff,
  History,
  Star,
  Zap,
  Shield,
  ChevronRight,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: Date;
  status: "completed" | "pending";
  category?: string;
}

export default function WalletPage() {
  const router = useRouter();
  const { user, isAuthenticated, addFunds } = useAuthStore();
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState("");
  const [showBalance, setShowBalance] = useState(true);

  // Mock transactions
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "debit",
      amount: 89900,
      description: "Sneakers Sport Confort",
      date: new Date(2024, 9, 15),
      status: "completed",
      category: "Shopping",
    },
    {
      id: "2",
      type: "credit",
      amount: 200000,
      description: "Rechargement",
      date: new Date(2024, 9, 14),
      status: "completed",
      category: "Dépôt",
    },
    {
      id: "3",
      type: "debit",
      amount: 129900,
      description: "Sac à main cuir",
      date: new Date(2024, 9, 12),
      status: "completed",
      category: "Shopping",
    },
    {
      id: "4",
      type: "credit",
      amount: 100000,
      description: "Remboursement",
      date: new Date(2024, 9, 10),
      status: "completed",
      category: "Remboursement",
    },
    {
      id: "5",
      type: "debit",
      amount: 45000,
      description: "T-shirt premium",
      date: new Date(2024, 9, 8),
      status: "completed",
      category: "Shopping",
    },
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  if (!user || !user.wallet) {
    return null;
  }

  const handleAddFunds = () => {
    const amountNum = parseFloat(amount);
    if (amountNum > 0) {
      addFunds(amountNum);
      setAmount("");
      setShowAddFunds(false);
    }
  };

  const quickAmounts = [10000, 25000, 50000, 100000];
  
  const totalSpent = transactions
    .filter(t => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalReceived = transactions
    .filter(t => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-black dark:via-neutral-900 dark:to-black pt-[90px]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            Mon Portefeuille
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card - Modern Design */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#10b981] via-[#059669] to-emerald-700 rounded-3xl p-6 md:p-8 text-white">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium opacity-90">Solde disponible</span>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {showBalance ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-semibold">+12%</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {showBalance ? `${user.wallet.balance.toLocaleString("fr-FR")} Ar` : "•••••• Ar"}
                  </div>
                  <p className="text-white/80 text-sm">
                    Dernière transaction: Aujourd'hui, 14:30
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setShowAddFunds(true)}
                    className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-4 rounded-2xl transition-all hover:scale-105"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Plus className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-medium">Recharger</span>
                  </button>

                  <button className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-4 rounded-2xl transition-all hover:scale-105">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Send className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-medium">Envoyer</span>
                  </button>

                  <button className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-4 rounded-2xl transition-all hover:scale-105">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Download className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-medium">Retirer</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Dépenses</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalSpent.toLocaleString()} Ar
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Ce mois
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Reçus</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalReceived.toLocaleString()} Ar
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Ce mois
                </div>
              </div>
            </div>

            {/* Add Funds Modal */}
            {showAddFunds && (
              <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recharger le portefeuille</h3>
                  <button
                    onClick={() => setShowAddFunds(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Montant à recharger
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className="w-full px-4 py-4 text-2xl font-bold border-2 border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-black rounded-xl focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                      Ar
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Montants suggérés
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map((qa) => (
                      <button
                        key={qa}
                        onClick={() => setAmount(qa.toString())}
                        className="p-3 border-2 border-gray-200 dark:border-neutral-800 rounded-xl hover:border-[#10b981] hover:bg-[#10b981]/5 transition-all text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        {(qa / 1000)}K
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAddFunds}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="w-full py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  Confirmer le rechargement
                </button>
              </div>
            )}

            {/* Transactions */}
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Transactions récentes
                </h2>
                <button className="text-sm text-[#10b981] font-medium hover:underline">
                  Tout voir
                </button>
              </div>

              <div className="space-y-1">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-black transition-all cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        transaction.type === "credit"
                          ? "bg-green-50 dark:bg-green-900/20"
                          : "bg-gray-100 dark:bg-neutral-800"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowDownLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-white truncate">
                        {transaction.description}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.date.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                        })} • {transaction.category}
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          transaction.type === "credit"
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {transaction.amount.toLocaleString("fr-FR")} Ar
                      </div>
                    </div>

                    <ChevronRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Cartes enregistrées
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-neutral-800 dark:to-neutral-700 rounded-xl text-white">
                  <CreditCard className="h-5 w-5" />
                  <div className="flex-1">
                    <div className="text-xs opacity-80">Carte principale</div>
                    <div className="font-semibold">•••• •••• •••• 4242</div>
                  </div>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>

                <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-xl text-gray-600 dark:text-gray-400 hover:border-[#10b981] hover:text-[#10b981] transition-all">
                  <Plus className="h-4 w-4" />
                  <span className="text-sm font-medium">Ajouter une carte</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Actions rapides</h3>

              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-black transition-all text-left">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Paiement rapide</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-black transition-all text-left">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                    <Download className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Télécharger PDF</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1">
                    100% Sécurisé
                  </h3>
                  <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                    Vos transactions sont protégées par un cryptage de niveau bancaire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
