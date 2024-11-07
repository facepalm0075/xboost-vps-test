import { useState } from "react";

function useLocalStorage(key: string, initialValue: string | null) {
	// Retrieve item from localStorage or set to initial value if it doesn't exist
	const [storedValue, setStoredValue] = useState(() => {
		if(typeof window !== "undefined"){
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.warn("Error reading localStorage key “" + key + "”: ", error);
        return initialValue;
      }
    }
	});

	// Create a function to update both the state and localStorage
	const setValue = (value: any) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.warn("Error setting localStorage key “" + key + "”: ", error);
		}
	};

	return [storedValue, setValue];
}

export default useLocalStorage;
