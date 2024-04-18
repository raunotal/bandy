import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { AuthContextProviderProps } from "../../types/context/authContext";

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {

  const signUp = (data: CreateNewUser) => {
    createUserWithEmailAndPassword(auth, email, password);
  }

  return (
    <AuthContext.Provider value={{ singUp }}>
      {children}
    </AuthContext.Provider>
  );
}
