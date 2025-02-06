import React, { useState, useRef, useCallback } from "react";
import { ActivityIndicator, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { fetchOrder, handleGetMenu } from "../viewmodel/AppViewModel";
import SidManager from "../services/SidManager";
import OrderInfo from "./OrderInfo";
import droneIcon from "../assets/droneIcon.png";
import paninobirraIcon from "../assets/paninobirraIcon.png";
import styles from "../styles/styles";

const OrderDetails = () => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [deliveryLocation, setDeliveryLocation] = useState(null);
    const [startLocation, setStartLocation] = useState(null);
    const [activeOrderId, setActiveOrderId] = useState(null);
    const intervalId = useRef(null);

    // Inizializza le posizioni di partenza e arrivo
    const initializePositions = async () => {
        const orderId = await SidManager.getOid();
        if (!orderId) {
            return;
        }
        setActiveOrderId(orderId);
        const order = await fetchOrder(orderId);
        setDeliveryLocation(order.deliveryLocation);
        setCurrentPosition(order.currentPosition);

        const menu = await handleGetMenu(order.mid, order.deliveryLocation.lat, order.deliveryLocation.lng);
        setStartLocation(menu.location);
    };

    // Aggiorna la posizione corrente del drone
    const updatePosition = async () => {
        if (!activeOrderId) return;
        const order = await fetchOrder(activeOrderId);
        setCurrentPosition(order.currentPosition);
        if (order.status === "COMPLETED") {
            clearInterval(intervalId.current);
        }
    };

    // Esegui l'inizializzazione delle posizioni e aggiorna la posizione del drone ogni 5 secondi
    useFocusEffect(
        useCallback(() => {
            initializePositions();
            intervalId.current = setInterval(() => {
              updatePosition();
            }, 5000);
            return () => clearInterval(intervalId.current);
        }, [activeOrderId])
    );

    if (!activeOrderId) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Text style={[styles.text, styles.textBold, styles.textCenter]}>
                    Ancora niente ordini!
                </Text>
                <Text style={[styles.text, styles.textCenter]}>
                    Fatti un bel panino!
                </Text>
                <Image source={paninobirraIcon} style={{ width: 250, height: 250 }} />
            </SafeAreaView>
        );
    } else if (currentPosition && deliveryLocation && startLocation) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.title}>Dettagli dell'Ordine</Text>
                <OrderInfo />
                <MapView
                    style={styles.map}
                    showsCompass
                    showsMyLocationButton
                    showsUserLocation
                    zoomControlEnabled
                    loadingEnabled
                    initialRegion={{
                        latitude: currentPosition.lat,
                        longitude: currentPosition.lng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: startLocation.lat,
                            longitude: startLocation.lng,
                        }}
                        title="Partenza!!!"
                        description="Partenza dell'ordine"
                        pinColor="black"
                    />
                    <Marker
                        coordinate={{
                            latitude: currentPosition.lat,
                            longitude: currentPosition.lng,
                        }}
                        title="Posizione del drone"
                    >
                        <Image source={droneIcon} style={{ width: 40, height: 40 }} />
                    </Marker>
                    <Marker
                        coordinate={{
                            latitude: deliveryLocation.lat,
                            longitude: deliveryLocation.lng,
                        }}
                        title="Destinazione consegna"
                        description="Destinazione dell'ordine"
                    />
                    <Polyline
                        coordinates={[
                            { latitude: startLocation.lat, longitude: startLocation.lng },
                            { latitude: deliveryLocation.lat, longitude: deliveryLocation.lng },
                        ]}
                        strokeColor="grey"
                        strokeWidth={2}
                    />
                </MapView>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Caricamento mappa in corso...</Text>
            </SafeAreaView>
        );
    }
};

export default OrderDetails;