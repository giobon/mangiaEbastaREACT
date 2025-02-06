import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./AppNavigator";
import SidManager from "./services/SidManager";

export default function App() {
  useEffect(() => {
    // Funzione asincrona per inizializzare il SID e UID
    const initializeApp = async () => {
      await SidManager.initialize(); // Inizializza il SID
      console.log("SID and UID initialized");
    };
    initializeApp();
  }, []); // L'effetto viene eseguito solo una volta

  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}