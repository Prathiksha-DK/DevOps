import React, { createContext, useContext, useState, ReactNode } from "react";
import { loginUser, signupUser } from "../../services/api";

/* ================= TYPES ================= */

export interface User {
  role: "worker" | "contractor";
  /* common */
  name: string;
  mobile: string;
  city?: string;
  state?: string;
  location?: string;

  /* worker */
  skill?: string;
  experience?: string;
  workLocation?: string;
  dailyWage?: string;
  workerIdType?: string;
  workerIdNumber?: string;
  languages?: string;

  /* contractor */
  companyName?: string;
  businessType?: string;
  officeAddress?: string;
  contractorExperience?: string;
  contractorIdType?: string;
  contractorIdNumber?: string;
  registrationNumber?: string;
  id?: number;
}

/* ================= CONTEXT TYPE ================= */

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (mobile: string, password: string) => Promise<void>;
  signup: (user: User & { password?: string }) => Promise<void>;
  logout: () => void;
}

/* ================= CREATE ================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  /* LOGIN */
  const login = async (mobile: string, password: string) => {
    try {
      const userData: any = await loginUser(mobile, password);
      // Map backend username to mobile and provide defaults if necessary
      const userObj: User = {
        ...userData,
        mobile: userData.username || userData.mobile || mobile,
        name: userData.name || userData.username || "User",
        role: userData.role || "worker",
      };
      setUser(userObj);
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  /* SIGNUP */
  const signup = async (newUser: User & { password?: string }) => {
    try {
      const { password, dailyWage, ...userDataForApi } = newUser;
      const responseData: any = await signupUser({
        password: password || "password123",
        daily_wage: dailyWage, // Map to backend format
        ...userDataForApi
      });
      // Map response data
      const userObj: User = {
        ...responseData,
        mobile: responseData.username || responseData.mobile || newUser.mobile,
        name: responseData.name || responseData.username || newUser.name,
        role: responseData.role || newUser.role,
      };
      setUser(userObj);
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  /* LOGOUT */
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be inside AuthProvider");
  }
  return context;
};
