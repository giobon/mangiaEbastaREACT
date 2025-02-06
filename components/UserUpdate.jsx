import React, { useState } from "react";
import { View, Text, TextInput, Button, StatusBar, ScrollView, Alert } from "react-native";
import { handleSave } from "../viewmodel/AppViewModel";
import SidManager from "../services/SidManager";
import styles from "../styles/styles";

const UserUpdate = ({ route, navigation }) => {
  const { user } = route.params;
  const [updatedUser, setUpdatedUser] = useState(user);
  const [errors, setErrors] = useState({});

  // Funzione per validare i campi
  const validateField = (field, value) => {
    let errorMessage = "";

    switch (field) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          errorMessage = "Questo campo non può essere vuoto.";
        } else if (value.length > 15) {
          errorMessage = "Massimo 15 caratteri consentiti.";
        }
        break;

      case "cardNumber":
        if (!/^\d{16}$/.test(value)) {
          errorMessage = "Inserisci un numero carta valido (16 cifre).";
        } 
        break;

      case "cardCVV":
        if (!/^\d{3}$/.test(value)) {
          errorMessage = "Il CVV deve essere composto da 3 cifre.";
        }
        break;

      case "cardExpireMonth":
        if (!/^(0[1-9]|1[0-2])$/.test(value)) {
          errorMessage = "Inserisci un mese valido (01-12).";
        }
        break;

      case "cardExpireYear":
        if (!/^\d{4}$/.test(value)) {
          errorMessage = "Inserisci un anno valido (4 cifre).";
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const handleChange = (field, value) => {
    setUpdatedUser({
      ...updatedUser,
      [field]: value,
    });

    // Valida il campo ogni volta che cambia
    validateField(field, value);
  };

  const handleSavePress = () => {
    // Controlla che non ci siano errori
    const validationErrors = Object.values(errors).filter((err) => err);
    if (validationErrors.length > 0) {
      Alert.alert("Errore", "Correggi i campi evidenziati prima di salvare.");
      return;
    }

    // Aggiorna il campo cardFullName e aggiungi il SID
    let newUser = {
      ...updatedUser,
      cardFullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
      sid: SidManager.getSid(),
    };

    // Salva l'utente e torna indietro
    handleSave(newUser);
    navigation.popTo("User", { user: newUser });
  };

  return (
    <ScrollView contentContainerStyle={styles.containerProfile}>
      <View>
        <Text style={styles.textUpdate}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.firstName}
          onChangeText={(value) => handleChange("firstName", value)}
          placeholder="Inserisci il nome"
        />
        {errors.firstName && <Text style={styles.textError}>{errors.firstName}</Text>}
      </View>

      <View>
        <Text style={styles.textUpdate}>Cognome:</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.lastName}
          onChangeText={(value) => handleChange("lastName", value)}
          placeholder="Inserisci il cognome"
        />
        {errors.lastName && <Text style={styles.textError}>{errors.lastName}</Text>}
      </View>

      <View>
        <Text style={styles.textUpdate}>Numero Carta:</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.cardNumber}
          onChangeText={(value) => handleChange("cardNumber", value)}
          placeholder="Inserisci il numero carta"
          keyboardType="numeric"
        />
        {errors.cardNumber && <Text style={styles.textError}>{errors.cardNumber}</Text>}
      </View>

      <View>
        <Text style={styles.textUpdate}>CVV:</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.cardCVV}
          onChangeText={(value) => handleChange("cardCVV", value)}
          placeholder="Inserisci CVV"
          keyboardType="numeric"
          secureTextEntry
        />
        {errors.cardCVV && <Text style={styles.textError}>{errors.cardCVV}</Text>}
      </View>

      <View>
        <Text style={styles.textUpdate}>Mese di Scadenza:</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.cardExpireMonth ? String(updatedUser.cardExpireMonth) : ""}
          onChangeText={(value) => handleChange("cardExpireMonth", value)}
          placeholder="Inserisci il mese di scadenza"
          keyboardType="numeric"
        />
        {errors.cardExpireMonth && <Text style={styles.textError}>{errors.cardExpireMonth}</Text>}
      </View>

      <View>
        <Text style={styles.textUpdate}>Anno di Scadenza:</Text>
        <TextInput
          style={styles.input}
          value={updatedUser.cardExpireYear ? String(updatedUser.cardExpireYear) : ""}
          onChangeText={(value) => handleChange("cardExpireYear", value)}
          placeholder="Inserisci l'anno di scadenza"
          keyboardType="numeric"
        />
        {errors.cardExpireYear && <Text style={styles.textError}>{errors.cardExpireYear}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Annulla" onPress={() => navigation.goBack()} />
        <Button title="Salva" onPress={handleSavePress} />
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

export default UserUpdate;