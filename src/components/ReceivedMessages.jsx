import { useState } from 'react';
import AutocompleteInput from './AutocompleteInput';

export default function ReceivedMessages({
    messages,
    onAddMessage,
    onDeleteMessage,
    callsignSuggestions,
    locationSuggestions
}) {
    const [callsign, setCallsign] = useState('');
    const [location, setLocation] = useState('');
    const [hops, setHops] = useState('');

    const handleAdd = () => {
        if (!callsign.trim() || !location.trim() || !hops.trim()) {
            alert('Please fill all fields');
            return;
        }

        onAddMessage({
            id: Date.now(),
            callsign: callsign.trim().toUpperCase(),
            location: location.trim(),
            hops: parseInt(hops)
        });

        setCallsign('');
        setLocation('');
        setHops('');
    };

    return (
        <>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Add Received Message</h2>

                <div className="space-y-3">
                    <AutocompleteInput
                        value={callsign}
                        onChange={setCallsign}
                        suggestions={callsignSuggestions}
                        placeholder="Callsign (e.g., AA11)"
                    />

                    <AutocompleteInput
                        value={location}
                        onChange={setLocation}
                        suggestions={locationSuggestions}
                        placeholder="Location (e.g., Lisboa)"
                    />

                    <input
                        type="number"
                        value={hops}
                        onChange={(e) => setHops(e.target.value)}
                        placeholder="Hops (e.g., 2)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />

                    <button
                        onClick={handleAdd}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
                    >
                        <span>➕</span> Add Message
                    </button>
                </div>
            </div>

            {messages.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">
                        Received Messages ({messages.length})
                    </h2>
                    <div className="space-y-2">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                            >
                                <div className="flex-1">
                                    <span className="font-semibold text-indigo-600">{msg.callsign}</span>
                                    <span className="text-gray-600"> from </span>
                                    <span className="text-gray-800">{msg.location}</span>
                                    <span className="text-gray-600"> - </span>
                                    <span className="font-medium">{msg.hops} hops</span>
                                </div>
                                <button
                                    onClick={() => onDeleteMessage(msg.id)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}