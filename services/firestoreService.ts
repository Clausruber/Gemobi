import { collection, addDoc, query, where, getDocs, writeBatch, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { HistoryItem } from '../types';

const HISTORY_COLLECTION = 'history';

export const addUserHistoryItem = async (userId: string, item: Omit<HistoryItem, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, HISTORY_COLLECTION), {
        ...item,
        userId: userId,
    });
    return docRef.id;
};

export const getUserHistory = async (userId: string): Promise<HistoryItem[]> => {
    const q = query(
        collection(db, HISTORY_COLLECTION), 
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    const history: HistoryItem[] = [];
    querySnapshot.forEach((doc) => {
        // Make sure to include the firestore-generated ID
        history.push({ id: doc.id, ...doc.data() } as HistoryItem);
    });
    return history;
};

export const clearUserHistory = async (userId: string): Promise<void> => {
    const q = query(collection(db, HISTORY_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
        return;
    }

    const batch = writeBatch(db);
    querySnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit();
};
