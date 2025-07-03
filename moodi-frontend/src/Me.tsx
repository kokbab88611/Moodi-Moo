import React, {useState} from 'react';

interface User{
    id: string;
    email: string;
    name: string;
    profilePicture: string;
}

function Me() {
    const [user,setUser] = useState<User | null>(null);

}