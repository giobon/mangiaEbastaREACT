import React from "react";
import { View, FlatList, Text } from "react-native";
import MenuDisplay from "./MenuDisplay";
import styles from "../styles/styles";

const MenuList = ({ menus, handleShowDetails }) => {
  // Se la lista è vuota, mostra un messaggio di avviso
  if (!menus || menus.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nessun menù disponibile</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={menus} // Dati da visualizzare nella lista
      renderItem={({ item }) => (
        <MenuDisplay
          menu={item} // Passa l'elemento del menu al componente MenuDisplay
          handleShowDetails={handleShowDetails} // Passa la funzione per mostrare i dettagli
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default MenuList;