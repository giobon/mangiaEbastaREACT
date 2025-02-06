import CommunicationController from "../model/CommunicationController";

// Recupera i dettagli di un utente
export async function fetchUser(uid) {
    try {
        return await CommunicationController.getUser(uid);
    } catch (error) {
        console.error("Errore durante il recupero dell'utente:", error);
        return "Error fetching user data.";
    }
}

// Crea un nuovo utente
export async function fetchNewUser() {
    try {
        return await CommunicationController.newUser();
    } catch (error) {
        console.error("Errore durante la creazione di un nuovo utente:", error);
        return "Error creating new user.";
    }
}

// Salva i dati di un utente
export async function handleSave(user) {
    try {
        await CommunicationController.saveUser(user);
    } catch (error) {
        console.error("Errore durante il salvataggio dell'utente:", error);
    }
}

// Elimina l'ultimo menu ordinato
export async function handleDeleteOrder(oid) {
    try {
        await CommunicationController.deleteOrder();
    } catch (error) {
        console.error("Errore durante l'eliminazione dell'ordine:", error);
    }
}

// Recupera un menu specifico
export async function handleGetMenu(mid, lat, lng) {
    try {
        return await CommunicationController.getMenuItem(mid, lat, lng);
    } catch (error) {
        console.error("Errore durante il recupero del menu:", error);
        return "Error fetching menu.";
    }
}

// Recupera l'immagine di un menu
export async function handleGetImageMenu(mid) {
    try {
        return await CommunicationController.getMenuImage(mid);
    } catch (error) {
        console.error("Errore durante il recupero dell'immagine del menu:", error);
        return "Error fetching menu image.";
    }
}

// Recupera tutti i menu
export async function handleGetAllMenu(lat, lng) {
    try {
        return await CommunicationController.getAllMenu(lat, lng);
    } catch (error) {
        console.error("Errore durante il recupero di tutti i menu:", error);
        return "Error fetching all menus.";
    }
}

// Ordina un menu
export async function handleOrderMenu(mid, bodyParams) {
    try {
      const result = await CommunicationController.orderMenu(mid, bodyParams);
  
      if (result?.type === "error") {
        return result; // Restituisci l'oggetto di errore
      }
      return result; // Restituisci i dettagli dell'ordine se tutto va bene
    } catch (error) {
      console.error("Errore durante l'ordine del menu:", error);
      return {
        type: "error",
        message: "Si è verificato un errore imprevisto. Riprova più tardi.",
      };
    }
  }

// Recupera le informazioni di un ordine
export async function fetchOrder(oid) {
    try {
        return await CommunicationController.getOrder(oid);
    } catch (error) {
        console.error("Errore durante il recupero dell'ordine:", error);
        return "Error fetching order.";
    }
}