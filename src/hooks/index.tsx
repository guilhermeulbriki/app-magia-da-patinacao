import React from "react";

import { AuthProvider } from "./Auth";
import { StudentsProvider } from "./Students";

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <StudentsProvider>{children}</StudentsProvider>
  </AuthProvider>
);

export default AppProvider;
