import * as React from "react";

export const MOCK_PROTOCOL_CODE = "TM-LGPD-2026-0001";

export type MockUser = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  documentType: string;
  documentNumber: string;
  phoneCountryCode: string;
  phone: string;
  gender: string;
};

export type PrivacyRequest = {
  protocol: string;
  onBehalf: string;
  hasAccount: string;
  requestType: string;
  firstName: string;
  lastName: string;
  email: string;
  details: string;
  submittedAt: string;
};

type MockAuthContextValue = {
  isLoggedIn: boolean;
  user: MockUser | null;
  lastGuestPrivacyRequest: PrivacyRequest | null;
  login: () => void;
  logout: () => void;
  saveGuestPrivacyRequest: (request: Omit<PrivacyRequest, "protocol" | "submittedAt">) => PrivacyRequest;
};

const MOCK_USER: MockUser = {
  firstName: "João",
  lastName: "Silva",
  email: "joaosilva@email.com",
  country: "Brasil",
  documentType: "CPF",
  documentNumber: "480.710.410-17",
  phoneCountryCode: "+55",
  phone: "8723986733",
  gender: "Masculino",
};

const MockAuthContext = React.createContext<MockAuthContextValue | null>(null);

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<MockUser | null>(null);
  const [lastGuestPrivacyRequest, setLastGuestPrivacyRequest] =
    React.useState<PrivacyRequest | null>(null);

  const login = React.useCallback(() => {
    setUser(MOCK_USER);
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
  }, []);

  const saveGuestPrivacyRequest = React.useCallback(
    (request: Omit<PrivacyRequest, "protocol" | "submittedAt">) => {
      const savedRequest = {
        ...request,
        protocol: MOCK_PROTOCOL_CODE,
        submittedAt: new Date().toLocaleDateString("pt-BR"),
      };

      setLastGuestPrivacyRequest(savedRequest);
      return savedRequest;
    },
    [],
  );

  const value = React.useMemo(
    () => ({
      isLoggedIn: user !== null,
      user,
      lastGuestPrivacyRequest,
      login,
      logout,
      saveGuestPrivacyRequest,
    }),
    [lastGuestPrivacyRequest, login, logout, saveGuestPrivacyRequest, user],
  );

  return <MockAuthContext.Provider value={value}>{children}</MockAuthContext.Provider>;
}

export function useMockAuth() {
  const context = React.useContext(MockAuthContext);

  if (!context) {
    throw new Error("useMockAuth must be used within MockAuthProvider");
  }

  return context;
}
