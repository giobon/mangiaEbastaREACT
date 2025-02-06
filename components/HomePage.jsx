import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useDBInitialization from "../hooks/useDBInitialization";
import usePosition from "../hooks/usePosition";
import MenuList from "./MenuList";
import { handleGetAllMenu } from "../viewmodel/AppViewModel";
import styles from "../styles/styles";

export default function HomePage({ navigation }) {
  const { dbController } = useDBInitialization();
  const { currentLocation } = usePosition();
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Stato per il caricamento

  const fetchMenus = async () => {
    if (!dbController || !currentLocation) {
      console.error("Database controller o posizione corrente non disponibile.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    // Recupera i menu disponibili vicini alla posizione corrente
    const menuList = await handleGetAllMenu(
      currentLocation.latitude,
      currentLocation.longitude
    );

    await dbController.saveAllMenu(menuList); // Salva i menu nel database e controlla le versioni delle immagini

    for (const menu of menuList) {
      // Aggiungi l'immagine ad ogni menu
      menu.image = await dbController.returnImage(menu.mid, menu.imageVersion);
      //console.log("Immagine del menù ", menu.mid, ": ", menu.image.slice(0, 5));
    }
    setMenus(menuList); // Imposta i menu recuperati nello stato
    setIsLoading(false); // Imposta lo stato di caricamento a false
  }

  useEffect(() => {
    if (currentLocation && dbController) fetchMenus();
  }, [currentLocation]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Caricamento menu in corso...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>Mangia e Basta</Text>
      <MenuList
        menus={menus}
        handleShowDetails={(menu) => navigation.navigate("Details", { menu })} // Naviga alla pagina di dettagli del menu
      />
    </SafeAreaView>
  );
}