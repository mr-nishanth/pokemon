// // utils/indexedDBStorage.ts

import { get, set, del } from 'idb-keyval'; // IndexedDB helper
import { PersistStorage } from 'zustand/middleware'; // Required for Zustand's persist middleware

// Custom IndexedDB storage for Zustand's persist middleware
export const indexedDBStorage: PersistStorage<any> = {
  // Fetch item from IndexedDB and parse as JSON if it exists
  getItem: async (name: string): Promise<any | null> => {
    const data = await get(name); // Retrieve the item from IndexedDB
    return data ? JSON.parse(JSON.stringify(data)) : null; // Safely parse the data and return it
  },

  // Save item to IndexedDB, stringify value before storing
  setItem: async (name: string, value: any) => {
    // Ensure that the value is serializable by converting it to a JSON string and parsing it back into an object
    const serializableValue = JSON.parse(JSON.stringify(value)); // Deep clone and serialize the object
    await set(name, serializableValue); // Store the object in IndexedDB
  },

  // Remove item from IndexedDB
  removeItem: async (name: string) => {
    await del(name); // Delete the item from IndexedDB
  },
};
