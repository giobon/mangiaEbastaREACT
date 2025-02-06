import { useEffect, useState } from "react";
import DBController from "../model/DBController";

export default function useDBInitialization() {
  const [dbController, setDbController] = useState(null);

  useEffect(() => {
    const initializeDB = async () => {
      const controller = new DBController();
      try {
        await controller.openDB();
        console.log("Database opened successfully");
        setDbController(controller);
      } catch (error) {
        console.error("Error during database initialization:", error);
      }
    };
    initializeDB();
  }, []);

  return { dbController };
}