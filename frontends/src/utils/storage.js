export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('localStorageChange', { 
      detail: { key, value } 
    }));
  },
  remove: (key) => {
    localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent('localStorageChange', { 
      detail: { key, value: null } 
    }));
  }
};
