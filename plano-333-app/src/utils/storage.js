// Storage utilities for persisting data
export const loadFromStorage = () => {
    try {
        const data = localStorage.getItem('plano333-data');
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Failed to load data:', e);
        return null;
    }
};

export const saveToStorage = (data) => {
    try {
        localStorage.setItem('plano333-data', JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save data:', e);
    }
};

export const getUniqueCallsigns = (messages, qslMessages) => {
    const allCallsigns = [
        ...messages.map(m => m.callsign),
        ...qslMessages.map(m => m.from),
        ...qslMessages.map(m => m.to)
    ];
    return [...new Set(allCallsigns)].filter(Boolean);
};

export const getUniqueLocations = (messages, qslMessages, myLocation) => {
    const allLocations = [
        ...messages.map(m => m.location),
        ...qslMessages.map(m => m.location),
        myLocation
    ];
    return [...new Set(allLocations)].filter(Boolean);
};