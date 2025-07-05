import React, { createContext, useState } from "react";
import type { User } from './types';
export const UserContext = createContext<{
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null)

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
