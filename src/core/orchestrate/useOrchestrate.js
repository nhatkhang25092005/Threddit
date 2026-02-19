import { useContext } from "react";

import { OrchestrateContext } from "./context";
export function useOrchestrate() {
  const context = useContext(OrchestrateContext);
  if (!context) {
    throw new Error("useOrchestrate must be used in OrchestrateProvider");
  }
  return context;
}