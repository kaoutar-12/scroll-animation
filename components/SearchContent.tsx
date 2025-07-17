"use client";
import React, { createContext, useState } from "react";

type SearchUIContextType = {
  isSearchActive: boolean;
  setIsSearchActive: (value: boolean) => void;
};

const SearchUIContext = createContext<SearchUIContextType | undefined>(undefined);

export const SearchUIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <SearchUIContext.Provider value={{ isSearchActive, setIsSearchActive }}>
      {children}
    </SearchUIContext.Provider>
  );
};

export const useSearchUI = () => {
 
};
