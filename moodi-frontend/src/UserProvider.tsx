import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import type { User } from '../../types';
import axios from 'axios';


export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        axios.get('https://ominous-goggles-g5wrvrxwxx63vxgr-3000.app.github.dev/auth/me', {withCredentials: true})
        .then(response => {
            setUser(response.data as User ?? null)
        })
        .catch(() => {
            setUser(null);
        }) 
        .finally(() => {
        setIsLoading(false);
    });
    }, [])

    return (
        <UserContext.Provider value={{user, setUser, isLoading, setIsLoading}}>
            {children}
        </UserContext.Provider>
    )
}
