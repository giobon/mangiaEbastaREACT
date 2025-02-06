import SidManager from "../services/SidManager"; // Assicurati che il percorso sia corretto

export default class CommunicationController {
  static BASE_URL = "https://develop.ewlab.di.unimi.it/mc/2425/";

  // Metodo generico per richieste API
  static async genericRequest(endpoint, verb, queryParams = {}, bodyParams = null) {
    try {
      const sid = SidManager.getSid(); // Recupera il SID da AsyncStorage

      if (!sid) {
        throw new Error("SID is null or undefined. Ensure SidManager is initialized correctly.");
      }

      // Aggiungi il sid ai queryParams
      queryParams.sid = sid;

      const queryParamsFormatted = new URLSearchParams(queryParams).toString();
      const url = `${this.BASE_URL}${endpoint}?${queryParamsFormatted}`;

      const fetchData = {
        method: verb,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      if (verb !== "GET" && bodyParams) {
        fetchData.body = JSON.stringify(bodyParams);
      }

      //console.log(`Sending ${verb} request to: ${url}`);

      const httpResponse = await fetch(url, fetchData);
      const status = httpResponse.status;

      if (status === 200) {
        return await httpResponse.json();
      } else if (status === 204) {
        return null; // Nessun contenuto
      } else {
        const message = await httpResponse.text();
        throw new Error(`Server error: HTTP ${status} - ${message}`);
      }
    } catch (error) {
      //console.error(`Error in genericRequest: ${error.message}`);
      throw error;
    }
  }

  // Metodo per richieste GET
  static async genericGetRequest(endpoint, queryParams) {
    return await this.genericRequest(endpoint, "GET", queryParams);
  }

  // Metodi legati agli utenti

  // Metodo per creare un nuovo utente senza SID
  static async createUserWithoutSid() {
    try {
      const url = `${this.BASE_URL}user`;
      console.log(`Sending POST request to: ${url}`);

      const fetchData = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const httpResponse = await fetch(url, fetchData);
      const status = httpResponse.status;

      if (status === 200) {
        return await httpResponse.json(); // Utente creato con successo
      } else {
        const message = await httpResponse.text();
        throw new Error(`Server error during user creation: HTTP ${status} - ${message}`);
      }
    } catch (error) {
      console.error(`Error in createUserWithoutSid: ${error.message}`);
      throw error;
    }
  }

  // Metodo per creare un nuovo utente
  static async newUser() {
    console.log("newUser called");
    // Usa il metodo dedicato per creare un utente senza SID
    return await this.createUserWithoutSid();
  }

  // Metodo per ottenere l'utente corrente
  static async getUser(uid) {
    const endpoint = `user/${uid}`;
    const queryParams = { sid: SidManager.getSid() };
    //console.log("getUser called with:", endpoint);
    return await this.genericGetRequest(endpoint, queryParams);
  }

  // Metodo per modificare i dati dell'utente corrente
  static async saveUser(user) {
    const endpoint = `user/${user.uid}`;
    const queryParams = { sid: SidManager.getSid() };
    //console.log("saveUser called with:", endpoint);
    return await this.genericRequest(endpoint, "PUT", queryParams, user);
  }

  // Metodi legati ai menu

  // Metodo per ottenere le informazioni dettagliate di un menu
  static async getMenuItem(mid, lat, lng) {
    const endpoint = `menu/${mid}`;
    const queryParams = { lat, lng };
    //console.log("getMenuItem called with:", endpoint, queryParams);
    return await this.genericGetRequest(endpoint, queryParams);
  }

  // Metodo per ottenere tutti i menu vicini
  static async getAllMenu(lat, lng) {
    const endpoint = `menu`;
    const queryParams = { lat, lng };
    //console.log("getAllMenu called with:", endpoint, queryParams);
    return await this.genericGetRequest(endpoint, queryParams);
  }

  // Metodo per ottenere l'immagine di un menu
  static async getMenuImage(mid) {
    const endpoint = `menu/${mid}/image`;
    console.log("getMenuImage called with:", endpoint);
    return await this.genericGetRequest(endpoint);
  }

  // Metodi legati agli ordini

  // Metodo per ottenere le informazioni di un ordine
  static async getOrder(oid) {
    const endpoint = `order/${oid}`;
    //console.log("getOrder called with:", endpoint);
    return await this.genericGetRequest(endpoint);
  }

  // Metodo per comprare un menu e fare partire un ordine
  static async orderMenu(mid, bodyParams) {
    const endpoint = `menu/${mid}/buy`;
    console.log("orderMenu called with:", endpoint);
    try {
      return await this.genericRequest(endpoint, "POST", {}, bodyParams);
    } catch (error) {
      if (error.message.includes("HTTP 403")) {
        return {
          type: "error",
          message: "Informazioni utente incomplete. Controlla il tuo profilo.",
          action: "Vai al profilo",
          navigateTo: "Profilo", // Suggerisce alla vista di navigare
        };
      } else if (error.message.includes("HTTP 409")) {
        return {
          type: "error",
          message: "L'utente ha già un ordine in corso.",
          action: "Vai all'ordine",
          navigateTo: "Ordine", // Suggerisce alla vista di navigare
        };
      }
      throw error; // Rilancia altri errori
    }
  }

  // Metodo per eliminare un ordine
  static async deleteOrder() {
    const endpoint = `order`;
    console.log("deleteOrder called with:", endpoint);
    return await this.genericRequest(endpoint, "DELETE");
  }
}