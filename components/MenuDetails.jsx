import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Button, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { handleGetMenu, handleOrderMenu } from "../viewmodel/AppViewModel";
import usePosition from "../hooks/usePosition";
import styles from "../styles/styles";
import SidManager from "../services/SidManager";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const MenuDetails = ({ route }) => {
  const { menu } = route.params;
  const { currentLocation } = usePosition();
  const [longDesc, setLongDesc] = useState(menu.longDescription || "Descrizione in caricamento...");
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true); // Stato per il caricamento

  const handleOrder = async () => {
    console.log("Ordering menu...");
    if (!currentLocation) {
      Alert.alert("Errore", "Impossibile determinare la tua posizione attuale.");
      return;
    }

    // Parametri da inviare per l'ordine: il SID e la posizione di consegna
    const bodyParams = {
      sid: SidManager.getSid(),
      deliveryLocation: {
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
      },
    };

    // Esegui l'ordine del menu
    const result = await handleOrderMenu(menu.mid, bodyParams);

    // Gestisci i risultati
    if (result.type === "error") {
      Alert.alert(
        "Errore",
        result.message,
        [
          { text: "Annulla", style: "cancel" },
          {
            text: result.action,
            onPress: () => navigation.navigate(result.navigateTo),
          },
        ]
      );
    } else if (result.oid) {
      console.log("Order placed successfully. With oid:", result.oid);
      // Salva l'OID nel AsyncStorage e naviga alla pagina dell'ordine
      await SidManager.setOid(result.oid);
      navigation.navigate("Ordine");
    }
  };

  useEffect(() => {
    // Funzione per ottenere i dettagli del menu
    const fetchMenuDetails = async () => {
      if (currentLocation) {
        const menuDetails = await handleGetMenu(
          menu.mid,
          currentLocation.latitude,
          currentLocation.longitude
        );
        setLongDesc(menuDetails.longDescription || "Descrizione non disponibile");
      }
      setIsLoading(false); // Fine del caricamento
    };
    fetchMenuDetails();
  }, [currentLocation, menu.mid]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          source={{ uri: `data:image/png;base64,${menu.image}` }}
          style={styles.menuHeaderImage}
        />
        <View style={styles.menuDetailsContent}>
          <Text style={styles.menuTitle}>{menu.name}</Text>
          <Text style={styles.menuLongDesc}>{longDesc}</Text>
          <View style={styles.menuInfoRow}>
            <View style={styles.menuTimeContainer}>
              <Ionicons name="time-outline" size={20} color="#555" />
              <Text style={styles.menuTime}>{menu.deliveryTime} min</Text>
            </View>
            <Text style={styles.menuPrice}>{menu.price}€</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Button title="Ordina Ora!" onPress={handleOrder} />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuDetails;