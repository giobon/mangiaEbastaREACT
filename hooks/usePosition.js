import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { BackHandler } from "react-native"; // Import per chiudere l'app

export default function usePosition() {
  const [currentLocation, setCurrentLocation] = useState(null);

  // Funzione per inizializzare il tracciamento della posizione
  const initTrackLocation = async () => {
    // Controlla i permessi attuali
    const { status } = await Location.getForegroundPermissionsAsync();

    // Se i permessi non sono concessi, richiedili
    if (status !== "granted") {
      const permissionResponse = await Location.requestForegroundPermissionsAsync();

      // Se i permessi sono ancora negati, termina l'app
      if (permissionResponse.status !== "granted") {
        console.warn("Permessi negati. L'app verrà chiusa.");
        BackHandler.exitApp(); // Chiude l'app immediatamente
        return;
      }
    }

    // Avvia il monitoraggio della posizione
    await Location.watchPositionAsync(
      {
        timeInterval: 10000, // Aggiorna ogni 10 secondi
        accuracy: Location.Accuracy.Balanced, // Accuratezza bilanciata
        distanceInterval: 10, // Aggiorna se ci si sposta di almeno 10 metri
      },
      (location) => {
        // Aggiorna lo stato con le coordinate della posizione corrente
        setCurrentLocation(location.coords);
      }
    );
  };

  // useEffect per avviare l'inizializzazione quando il componente viene montato
  useEffect(() => {
    initTrackLocation();
  }, []);

  // Restituisce la posizione corrente
  return { currentLocation };
}