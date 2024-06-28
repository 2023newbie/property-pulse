'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type GlobalContextType = {
    unreadCount: number,
    setUnreadCount: Dispatch<SetStateAction<number>>
}

// Create context
// @ts-ignore
const GlobalContext = createContext<GlobalContextType>();

// Create a provider
export function GlobalProvider({ children }: { children: ReactNode }) {
    const [unreadCount, setUnreadCount] = useState(0);

    return (
        <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
            {children}
        </GlobalContext.Provider>
    );
}

// Create a custom hook to access context
export function useGlobalContext() {
    return useContext(GlobalContext);
}
