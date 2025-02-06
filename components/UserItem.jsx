import React, { useState, useCallback } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { fetchUser } from "../viewmodel/AppViewModel";
import SidManager from "../services/SidManager";
import styles from "../styles/styles";
import OrderInfo from "./OrderInfo";

const UserItem = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useFocusEffect(
    useCallback(() => {
      // Recupera i dati utente
      const getUser = async () => {
        const fetchedUser = await fetchUser(await SidManager.getUid());
        setUser(fetchedUser);
      };
      getUser();
    }, [])
    
  );

  if (!user) {
    return (
      <SafeAreaView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Caricamento dati utente...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Verifica se i dati utente sono incompleti
  const isUserDataIncomplete =
    !user.firstName ||
    !user.lastName ||
    !user.cardFullName ||
    !user.cardNumber ||
    !user.cardExpireMonth ||
    !user.cardExpireYear;


  if (isUserDataIncomplete) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.subtitle}>
          Dati utente non specificati. Si prega di completare le informazioni.
        </Text>
        <Button
          title="Modifica dati"
          onPress={() => navigation.navigate("UserUpdate", { user })}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text style={styles.subtitle}>
        Ciao, {user.firstName} {user.lastName}
      </Text>

      {/* Card per le informazioni della carta di credito */}
      <View style={styles.userCard}>
        <Text style={styles.userCardTitle}>Metodo di Pagamento</Text>
        <Text style={styles.userCardText}>
          Nome Completo: {user.cardFullName || "Not available"}
        </Text>
        <Text style={styles.userCardText}>
          Numero Carta: {"**** **** **** " + (user.cardNumber?.slice(-4) || "****")}
        </Text>
        <Text style={styles.userCardText}>
          Scadenza: {user.cardExpireMonth || "--"}/{user.cardExpireYear || "--"}
        </Text>
        <Button
          title="Modifica dati"
          onPress={() => navigation.navigate("UserUpdate", { user })}
        />
      </View>

      {/* Card per le informazioni dell'ordine */}
      <View style={styles.userCard}>
        <Text style={styles.userCardTitle}>Ultimo Ordine Effettuato</Text>
        <OrderInfo />
      </View>
    </SafeAreaView>
  );
};

export default UserItem;