import * as SQLite from 'expo-sqlite';
import { handleGetImageMenu } from '../viewmodel/AppViewModel';

export default class DBController {
    constructor() {
        this.db = null;
    }

    // Crea il database o apre una connessione con esso
    async openDB() {
        this.db = await SQLite.openDatabaseAsync('menuBD');
        // const query1 = "DROP TABLE Menu"
        // await this.db.execAsync(query1);
        const query = "CREATE TABLE IF NOT EXISTS Menu (ID INTEGER PRIMARY KEY, VERSION INTEGER, IMAGE TEXT);";
        await this.db.execAsync(query);
    }

    // Inserisce un menu nel database
    async saveMenu(mid, version, image) {
        // console.log('Saving menu into saveMenu');
        // const query = "CREATE TABLE IF NOT EXISTS Menu (ID INTEGER PRIMARY KEY, VERSION INTEGER, IMAGE TEXT);
        const query = "INSERT INTO Menu (ID, VERSION, IMAGE) VALUES (?, ?, ?);";
        try {
            // console.log("mid, version, image:", mid, version, image.substring(0, 10));
            await this.db.runAsync(query, mid, version, image);
            // const query = "SELECT * FROM Menu";
            // const result = await this.db.getAllAsync(query);
            // console.log("RESULT",result);
        } catch (e) {
            console.log(e);
        }
    }

    // Salva tutti i menu nel database
    async saveAllMenu(menus, sid) {
        // console.log('Saving menu into saveAllMenu');
        for (let i = 0; i < menus.length; i++) {
            // Controlla se il menu è già presente nel database
            let menuExist = await this.menuMatch(menus[i].mid);
            // console.log("Prova",menus[i].mid, " ", menus[i].imageVersion);
            if (menuExist === false) {
                // Se il menu non è presente, lo salva
                let im = await handleGetImageMenu(menus[i].mid, sid);
                await this.saveMenu(menus[i].mid, menus[i].imageVersion, im.base64);
                // console.log("menu ",i," saved");
            } else {
                // Se il menu è presente, controlla se la versione è la stessa
                let imageMatch = await this.imageVersionMatch(menus[i].mid, menus[i].imageVersion);
                if (imageMatch === false) {
                    // Se la versione è diversa, aggiorna l'immagine
                    let im = await handleGetImageMenu(menus[i].mid, sid);
                    await this.updateImage(menus[i].mid, menus[i].imageVersion, im.base64);
                } else {
                    // Se la versione è la stessa, non fa nulla
                    // console.log("menu already in db with the same version");
                }
            }
        }
    }

    async getAllMenu() {
        const query = "SELECT * FROM Menu";
        const result = await this.db.getAllAsync(query);
        // console.log("RESULT",result);
        result.forEach((element) => {
            if (element.IMAGE === null) {
            } else {
                element.IMAGE = element.IMAGE.substring(0, 3);
            }
        });
        return result;
    }

    // Controlla se il menu è già presente nel database
    async menuMatch(id) {
        const query = "SELECT * FROM Menu WHERE ID = ?;";
        const result = await this.db.getAllAsync(query, id);
        if (result.length === 0) {
            // console.log("menu not in db");
            return false;
        }
        return true;
    }

    // Controlla se la versione dell'immagine è la stessa
    async imageVersionMatch(id, version) {
        const query = "SELECT * FROM Menu WHERE ID = ? AND VERSION = ?;";
        const result = await this.db.getAllAsync(query, id, version);
        if (result.length === 0) {
            return false;
        }
        return true;
    }

    // Aggiorna l'immagine di un menu
    async updateImage(id, version, image) {
        //aggiorna il record con la nuova immagine e la version +1
        const query = "UPDATE Menu SET IMAGE = ?, VERSION = ? WHERE ID = ?;";
        await this.db.getAllAsync(query, image, version, id);
    }

    // Ritorna l'immagine di un menu
    async returnImage(id, version) {
        //ritorna l'immagine base64 corrispondente all'id e alla versione
        const query = "SELECT IMAGE FROM Menu WHERE ID = ? AND VERSION = ?;";
        const result = await this.db.getAllAsync(query, id, version);
        return result[0].IMAGE;
    }

    // Cancella tutti i menu dal database
    async deleteAllTable() {
        //droppa tutte le tabelle
        const query = "DROP TABLE Menu";
        await this.db.execAsync(query);
        const query2 = "CREATE TABLE IF NOT EXISTS Menu (ID INTEGER PRIMARY KEY, VERSION INTEGER, IMAGE TEXT);";
        await this.db.execAsync(query2);
    }

    // Stampa tutte le tabelle del database
    async allTable() {
        //stampa tutte le tabelle
        const query = "SELECT name FROM sqlite_master WHERE type='table';";
        const result = await this.db.getAllAsync(query);
        console.log(result);
    }
}