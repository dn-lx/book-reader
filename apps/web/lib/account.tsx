"use client";
import { createContext, useContext } from "react";
import type { ReaderAccount } from "@leaf/core";
import type { ReaderStorage } from "./storage";
export const AccountContext = createContext<{
  account: ReaderAccount;
  storage: ReaderStorage;
  logout: () => Promise<void>;
  syncMessage: string;
  keepLocalChanges: () => Promise<void>;
} | null>(null);
export function useAccount() {
  const value = useContext(AccountContext);
  if (!value) throw Error("Please sign in first.");
  return value;
}
