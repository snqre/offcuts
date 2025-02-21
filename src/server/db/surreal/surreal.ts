import {
    type Database 
} from "@server";
import {
    AppData 
} from "@common";
import { initializeApp } from "firebase/app";

export async function Firebase(): Promise<Database> {
    const config = {
        apiKey: process.env?.["FIREBASE_API_KEY"]!,
        authDomain: "offcut-61d2b.firebaseapp.com",
        projectId: "offcut-61d2b",
        storageBucket: "offcut-61d2b.firebasestorage.app",
        messagingSenderId: "888767606623",
        appId: "1:888767606623:web:40b266fbe6dc542c3910ea",
        measurementId: "G-HVQTWMQ051"
    };
    const app = initializeApp(config);
    
}

Firebase();