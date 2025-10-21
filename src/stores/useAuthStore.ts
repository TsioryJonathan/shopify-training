"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  wallet?: {
    balance: number;
    currency: string;
  };
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addFunds: (amount: number) => void;
  deductFunds: (amount: number) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock user data
        const mockUser: User = {
          id: "user-" + Date.now(),
          email,
          name: email.split("@")[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          phone: "+261 34 00 000 00",
          address: {
            street: "123 Avenue de l'Indépendance",
            city: "Antananarivo",
            postalCode: "101",
            country: "Madagascar",
          },
          wallet: {
            balance: 500000,
            currency: "Ar",
          },
          createdAt: new Date(),
        };

        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: "user-" + Date.now(),
          email,
          name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          phone: "",
          wallet: {
            balance: 0,
            currency: "Ar",
          },
          createdAt: new Date(),
        };

        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateProfile: (data: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              ...data,
            },
          });
        }
      },

      addFunds: (amount: number) => {
        const { user } = get();
        if (user && user.wallet) {
          set({
            user: {
              ...user,
              wallet: {
                ...user.wallet,
                balance: user.wallet.balance + amount,
              },
            },
          });
        }
      },

      deductFunds: (amount: number) => {
        const { user } = get();
        if (user && user.wallet) {
          if (user.wallet.balance >= amount) {
            set({
              user: {
                ...user,
                wallet: {
                  ...user.wallet,
                  balance: user.wallet.balance - amount,
                },
              },
            });
            return true;
          }
          return false;
        }
        return false;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

