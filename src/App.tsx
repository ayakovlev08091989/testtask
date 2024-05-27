import React from "react";
import styles from "./App.module.scss";
import Leads from "./pages/leads/Leads";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.app}>
        <Leads />
      </div>
    </QueryClientProvider>
  );
}

export default App;
