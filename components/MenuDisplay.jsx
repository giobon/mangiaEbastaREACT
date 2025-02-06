import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/styles";

const MenuDisplay = ({ menu, handleShowDetails }) => {
  if (!menu) return null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleShowDetails(menu)}
    >
      <Image
        source={{ uri: `data:image/png;base64,${menu.image}` }}
        style={styles.cardImage}
      />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{menu.name}</Text>
        <View style={styles.cardInfoRow}>
          <View style={styles.cardLeft}>
            <Text style={styles.cardDesc}>{menu.shortDescription}</Text>
            <View style={styles.cardTimeContainer}>
              <Ionicons name="time-outline" size={16} color="#555" />
              <Text style={styles.cardTime}>{menu.deliveryTime} min</Text>
            </View>
          </View>
          <Text style={styles.cardPrice}>{menu.price}€</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuDisplay;