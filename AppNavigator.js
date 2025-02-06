import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import HomePage from "./components/HomePage";
import MenuDetails from "./components/MenuDetails";
import UserItem from "./components/UserItem";
import UserDetails from "./components/UserUpdate";
import OrderDetails from "./components/OrderDetails";
import { SafeAreaView, ActivityIndicator, Text } from "react-native";
import styles from "./styles/styles";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack per Home e Details
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomePage} />
      <Stack.Screen name="Details" component={MenuDetails} />
    </Stack.Navigator>
  );
}

// Stack per UserItem e UserUpdate
function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={UserItem} />
      <Stack.Screen name="UserUpdate" component={UserDetails} />
    </Stack.Navigator>
  );
}

// Stack per Order
function OrderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Order" component={OrderDetails} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const [initialNavigationState, setInitialNavigationState] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadNavigationState = async () => {
      try {
        const savedState = await AsyncStorage.getItem("navigationState");
        if (savedState) {
          setInitialNavigationState(JSON.parse(savedState));
          // console.log("Stato di navigazione recuperato: ", savedState);
        }
      } catch (error) {
        console.error("Errore nel recupero dello stato di navigazione: ", error);
      } finally {
        setIsReady(true);
      }
    };

    loadNavigationState();
  }, []);

  const handleStateChange = async (state) => {
    try {
      await AsyncStorage.setItem("navigationState", JSON.stringify(state));
      // console.log("Stato di navigazione salvato: ", JSON.stringify(state));
    } catch (error) {
      console.error("Errore nel salvataggio dello stato di navigazione: ", error);
    }
  };

  if (!isReady) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading Map...</Text>
      </SafeAreaView>
    );
  }

  return (
      <NavigationContainer
        initialState={initialNavigationState}
        onStateChange={handleStateChange}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                Home: focused ? "home" : "home-outline",
                Ordine: focused ? "receipt" : "receipt-outline",
                Profilo: focused ? "person" : "person-outline",
              };
              return <Icon name={icons[route.name]} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#2C3E50",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Ordine" component={OrderStack} />
          <Tab.Screen name="Profilo" component={UserStack} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}