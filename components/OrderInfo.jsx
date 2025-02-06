import React, { useRef, useState, useCallback } from "react";
import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchOrder, handleGetMenu } from "../viewmodel/AppViewModel";
import SidManager from "../services/SidManager";
import styles from "../styles/styles";

const OrderInfo = () => {
    const intervalId = useRef(null);
    const [isArrived, setIsArrived] = useState(false);
    const [menu, setMenu] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [activeOrderId, setActiveOrderId] = useState(null);

    // Inizializza l'ordine attivo con il menu e i dettagli dell'ordine
    const initializeOrder = async () => {
        setIsArrived(false);
        const orderId = await SidManager.getOid();
        if (!orderId) {
            return;
        }
        setActiveOrderId(orderId);
        const order = await fetchOrder(orderId);
        setOrderDetails(order);
        const fetchedMenu = await handleGetMenu(order.mid, order.deliveryLocation.lat, order.deliveryLocation.lng);
        setMenu(fetchedMenu);
    };


    // Aggiorna lo stato dell'ordine
    const updateOrderStatus = async () => {
        if (!activeOrderId) return;
        const order = await fetchOrder(activeOrderId);
        setOrderDetails(order);
        if (order.status === "COMPLETED") {
            setIsArrived(true);
            clearInterval(intervalId.current);
        }
    };

    // Esegui l'inizializzazione dell'ordine e aggiorna lo stato dell'ordine ogni 5 secondi
    useFocusEffect(
        useCallback(() => {
            initializeOrder();
            intervalId.current = setInterval(() => {
                updateOrderStatus();
            }, 5000);
            return () => clearInterval(intervalId.current);
        }, [activeOrderId])
    );

    if (!activeOrderId) {
        return (
            <View style={styles.textContainer}>
                <Text style={styles.text}>No order available. Please place an order.</Text>
            </View>
        );
    }

    if (!orderDetails || !menu) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Caricamento informazioni ordine...</Text>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.textContainer}>
            <Text style={styles.userCardText}>Hai ordinato: {menu.name}</Text>
            <Text style={styles.userCardText}>
                {isArrived
                    ? orderDetails.deliveryTimestamp
                        ? `Consegnato il: ${new Date(orderDetails.deliveryTimestamp).toLocaleString()}`
                        : "Caricamento dati..."
                    : orderDetails.expectedDeliveryTimestamp
                        ? `Arriverà il: ${new Date(orderDetails.expectedDeliveryTimestamp).toLocaleString()}`
                        : "Caricamento dati..."
                }
            </Text>
        </View>
    );
};

export default OrderInfo;