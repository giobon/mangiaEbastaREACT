import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchNewUser } from "../viewmodel/AppViewModel";

class SidManager {
  static sid = null;
  static uid = null;
  static oid = null;

  // Inizializza SID e UID
  static async initialize() {
    console.log("Initializing SID...");
    if (!this.sid) {
      try {
        // Recupera SID e UID da AsyncStorage
        const storedSid = await AsyncStorage.getItem("sid");
        const storedUid = await AsyncStorage.getItem("uid");

        // Se non sono presenti SID e UID, crea un nuovo utente
        if (!storedSid || !storedUid) {
          console.log("No stored SID/UID found, creating a new user...");
          const newUser = await fetchNewUser();

          // Se non è stato possibile creare un nuovo utente, lancia un'eccezione
          if (!newUser?.sid || !newUser?.uid) {
            throw new Error("Failed to fetch new SID and UID");
          }

          // Salva SID e UID in AsyncStorage
          await AsyncStorage.setItem("sid", newUser.sid);
          await AsyncStorage.setItem("uid", String(newUser.uid));

          this.sid = newUser.sid;
          this.uid = newUser.uid;

          console.log("New SID created:", this.sid, " with UID:", this.uid);
        } else {
          // Recupera SID e UID da AsyncStorage
          this.sid = storedSid;
          this.uid = storedUid;

          console.log("SID retrieved:", this.sid);
          console.log("UID retrieved:", this.uid);
        }
      } catch (error) {
        console.error("Error during SID initialization:", error);
        throw error;
      }
    }
    return this.sid;
  }

  // Setta OID
  static async setOid(oid) {
    this.oid = oid;
    await AsyncStorage.setItem("oid", String(oid));
    console.log("OID set to:", this.oid);
  }

  // Recupera OID
  static async getOid() {
    return parseInt(await AsyncStorage.getItem("oid"));
  }

  // Recupera SID
  static getSid() {
    if (!this.sid) {
      throw new Error("SID is not initialized. Call SidManager.initialize() first.");
    }
    return this.sid;
  }

  // Recupera UID
  static getUid() {
    if (!this.uid) {
      throw new Error("UID is not initialized. Call SidManager.initialize() first.");
    }
    return this.uid;
  }
}

export default SidManager;