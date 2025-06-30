import React, {createContext, useEffect, useState} from "react";
type User = {
    email: string;
    name: string;
    profileImg: string;
}

const AuthContext = createContext<{
    user: User | null;
    loading: boolean;
}> ({user: null, loading: true});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://ominous-goggles-g5wrvrxwxx63vxgr-3000.app.github.dev/auth/check', {
            method: 'GET',
            credentials: 'include',
        })
        .then((res) => {
            if(!res.ok){
                throw new Error('Not logged in');
            } 
                return res.json();
        })
        .then((data) => setUser(data.user))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }, []);
    return ( <AuthContext.Provider value={{user, loading}}>
        {children}
    </AuthContext.Provider>
    );
}


