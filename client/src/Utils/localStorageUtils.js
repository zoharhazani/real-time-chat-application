// Save string to local storage
export const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving string to local storage:', error);
    }
  };
  
  // Retrieve string from local storage
  export const getFromLocalStorage = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error retrieving string from local storage:', error);
      return null;
    }
  };