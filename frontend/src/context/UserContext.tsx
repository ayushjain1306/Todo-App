import { useState, createContext } from "react";

interface UserContextType {
    user: object|null,
    setUser: any
}

const UserContext = createContext<UserContextType|null>(null);

function UserProvider({ children }: { children: any }){
    const [ user, setUser ] = useState<object|null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };