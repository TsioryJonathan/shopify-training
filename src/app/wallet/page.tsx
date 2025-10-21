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
  Clock,
  CheckCircle2,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: Date;
  status: "completed" | "pending";
}

export default function WalletPage() {
  const router = useRouter();
  const { user, isAuthenticated, addFunds } = useAuthStore();
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState("");

  // Mock transactions
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "debit",
      amount: 89900,
      description: "Achat - Sneakers Sport Confort",
      date: new Date(2024, 9, 15),
      status: "completed",
    },
    {
      id: "2",
      type: "credit",
      amount: 200000,
      description: "Rechargement par carte bancaire",
      date: new Date(2024, 9, 14),
      status: "completed",
    },
    {
      id: "3",
      type: "debit",
      amount: 129900,
      description: "Achat - Sac à main cuir",
      date: new Date(2024, 9, 12),
      status: "completed",
    },
    {
      id: "4",
      type: "credit",
      amount: 100000,
      description: "Remboursement commande #1234",
      date: new Date(2024, 9, 10),
      status: "completed",
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-[136px]">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mon Portefeuille</h1>
          <p className="text-gray-600 dark:text-gray-300">Gérez votre solde et vos transactions</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-[#FF6347] to-[#FF8C69] rounded-xl shadow-lg p-8 text-white">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="h-6 w-6" />
                    <span className="text-sm font-medium opacity-90">Solde disponible</span>
                  </div>
                  <div className="text-4xl font-bold mb-1">
                    {user.wallet.balance.toLocaleString("fr-FR")} Ar
                  </div>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <TrendingUp className="h-4 w-4" />
                    <span>+12% ce mois</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddFunds(!showAddFunds)}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-lg transition-colors"
                >
                  <Plus className="h-6 w-6" />
                </button>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-white text-[#FF6347] py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                  <ArrowUpRight className="h-5 w-5" />
                  Retirer
                </button>
                <button 
                  onClick={() => setShowAddFunds(true)}
                  className="flex-1 bg-white/20 backdrop-blur-sm text-white py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowDownLeft className="h-5 w-5" />
                  Recharger
                </button>
              </div>
            </div>

            {/* Add Funds Modal */}
            {showAddFunds && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recharger mon portefeuille</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Montant (Ar)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Entrez le montant"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20 outline-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Montants rapides
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {quickAmounts.map((qa) => (
                      <button
                        key={qa}
                        onClick={() => setAmount(qa.toString())}
                        className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#FF6347] hover:bg-[#FF6347]/5 transition-colors text-sm font-medium"
                      >
                        {(qa / 1000).toLocaleString()}K
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddFunds(false)}
                    className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-900 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddFunds}
                    disabled={!amount || parseFloat(amount) <= 0}
                    className="flex-1 px-6 py-3 bg-[#FF6347] text-white rounded-lg font-semibold hover:bg-[#E55347] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            )}

            {/* Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Historique des transactions</h2>
              
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-900 transition-colors"
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        transaction.type === "credit"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowDownLeft className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{transaction.description}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {transaction.date.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          transaction.type === "credit" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {transaction.amount.toLocaleString("fr-FR")} Ar
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        {transaction.status === "completed" ? "Complétée" : "En attente"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Moyens de paiement</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">Carte bancaire</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">•••• 4242</div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:border-[#FF6347] hover:text-[#FF6347] transition-colors">
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">Ajouter une carte</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Statistiques</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Dépenses ce mois</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">219 800 Ar</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Recharges ce mois</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">300 000 Ar</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Sécurisé</h3>
              <p className="text-sm text-blue-800">
                Toutes vos transactions sont cryptées et sécurisées. Nous ne stockons jamais vos informations de paiement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

