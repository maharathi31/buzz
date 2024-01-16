import * as React from "react";
import {createContext,useContext,useEffect,useState} from "react";
import { getCurrentUser } from "../lib/appwrite/api";
import { IContextType, IUser } from "../types/index";
import {useNavigate} from 'react-router-dom'
export const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
  };
  
  const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
  };
  
  const AuthContext = createContext<IContextType>(INITIAL_STATE);
  
  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const checkAuthUser = async () => {
      setIsLoading(true);
      try {
        const currentAccount = await getCurrentUser();
  
        // console.log(currentAccount);
  
        if (currentAccount !== undefined) {
          setUser({
            id: currentAccount.$id,
            name: currentAccount.name,
            username: currentAccount.username,
            email: currentAccount.email,
            imageUrl: currentAccount.imageUrl,
            bio: currentAccount.bio,
          });
  
          setIsAuthenticated(true);
          return true;
        } else {
          throw Error;
        }
      } catch (error) {
        // console.log("innn error");
        return false;
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      const cookieFallback = localStorage.getItem("cookieFallback");
  
      if (
        cookieFallback === "[]"
      ) {
        navigate("/sign-in");
        // location.reload();
        // return;
      }
  
      checkAuthUser();
    }, []);
  
    const value = {
      user,
      setUser,
      isLoading,
      isAuthenticated,
      setIsAuthenticated,
      checkAuthUser,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
  
  export default AuthProvider;
  
  export const useUserContext = () => useContext(AuthContext);