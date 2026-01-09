import { useState } from 'react';

export default function AutocompleteInput({
    value,
    onChange,
    suggestions,
    placeholder,
    type = "text"
}) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        onChange(inputValue);

        if (inputValue.length > 0) {
            const filtered = suggestions.filter(s =>
                s.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelect = (suggestion) => {
        onChange(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className="relative">
            <input
                type={type}
                value={value}
                onChange={handleChange}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {showSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {filteredSuggestions.map((suggestion, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleSelect(suggestion)}
                            className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}