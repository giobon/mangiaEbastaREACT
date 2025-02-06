import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Contenitore generico
  container: {
    marginTop: 40,
    flex: 1,
    padding: 5,
    backgroundColor: "#FAFBFD",
  },

  containerProfile: {
    marginTop: 50,
    flex: 1,
    padding: 16,
    backgroundColor: "#FAFBFD",
  },

  // Titoli
  title: {
    fontSize: 35,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#2C3E50",
    letterSpacing: 0.7,
    fontFamily: "serif",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#34495E",
    marginBottom: 12,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5D6D7E",
    marginBottom: 8,
    textTransform: "uppercase",
  },

  // Testo generico
  text: {
    fontSize: 16,
    color: "#4A4A4A",
    lineHeight: 24,
    textAlign: "justify",
  },
  textSmall: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  textBold: {
    fontWeight: "700",
    color: "#2C3E50",
  },
  textError: {
    fontSize: 14,
    color: "#E74C3C",
  },
  textContainer: {
    padding: 16,
  },

  // Immagini
  image: {
    width: 140,
    height: 140,
    borderRadius: 5,
    marginBottom: 5,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#D6DBDF",
  },
  largeImage: {
    alignSelf: "center",
    width: 280,
    height: 280,
    borderRadius: 15,
    marginVertical: 16,
    borderWidth: 2,
    borderColor: "#BDC3C7",
  },

  // Stile della card
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden",
    elevation: 3,
    paddingBottom: 16,
  },

  cardContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },

  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  cardTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#333",
    marginTop: 7,
  },

  cardDetails: {
    marginTop: 8,
    marginRight: 16,
    marginLeft: 16,
  },

  cardInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 8,
  },

  cardLeft: {
    flex: 1,
  },

  cardDesc: {
    fontSize: 16,
    color: "#4A4A4A",
    marginBottom: 4,
  },

  cardTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  cardTime: {
    fontSize: 14,
    color: "#555",
    marginLeft: 4,
  },

  cardPrice: {
    fontSize: 24,
    color: "#2C3E50",
    fontWeight: "bold",
    marginLeft: 8,
    paddingRight: 20,
  },

  // Pulsanti e input
  buttonContainer: {
    marginTop: 15,
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "#FDFEFE",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#B3B6B7",
    marginTop: 6,
    width: "100%",
    fontSize: 16,
  },

  // Liste
  listContainer: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: "#FAFBFD",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ECF0F1",
  },
  emptyText: {
    fontSize: 18,
    color: "#BDC3C7",
    fontWeight: "500",
  },

  // Caricamento
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFBFD",
  },

  menuHeaderImage: {
    width: "100%",
    height: 250,
  },

  menuDetailsContent: {
    padding: 16,
  },

  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },

  menuLongDesc: {
    fontSize: 16,
    color: "#4A4A4A",
    lineHeight: 24,
    marginBottom: 16,
  },

  menuInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuTime: {
    fontSize: 16,
    color: "#555",
    marginLeft: 8,
  },

  menuPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
  },

  userCard: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  userCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 8,
  },
  userCardText: {
    fontSize: 16,
    color: "#4A4A4A",
    marginBottom: 4,
  },
  loadingText: {
    fontSize: 18,
    color: "#BDC3C7",
    fontWeight: "500",
    marginBottom: 20,
  },

  textUpdate: {
    fontSize: 16,
    color: "#4A4A4A",
    lineHeight: 24,
    textAlign: "justify",
    marginTop: 10,
  },

  map: {
    flex: 1,
  },

  safe: {
    flex: 1,
    padding: 20,
  },
});

export default styles;