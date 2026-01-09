import { useState } from 'react';
import AutocompleteInput from './AutocompleteInput';

export default function ObservedQSL({
    qslMessages,
    onAddQSL,
    onDeleteQSL,
    callsignSuggestions,
    locationSuggestions
}) {
    const [qslFrom, setQslFrom] = useState('');
    const [qslTo, setQslTo] = useState('');
    const [qslHops, setQslHops] = useState('');
    const [qslLocation, setQslLocation] = useState('');

    const handleAdd = () => {
        if (!qslFrom.trim() || !qslTo.trim() || !qslHops.trim() || !qslLocation.trim()) {
            alert('Please fill all fields');
            return;
        }

        onAddQSL({
            id: Date.now(),
            from: qslFrom.trim().toUpperCase(),
            to: qslTo.trim().toUpperCase(),
            hops: parseInt(qslHops),
            location: qslLocation.trim()
        });

        setQslFrom('');
        setQslTo('');
        setQslHops('');
        setQslLocation('');
    };

    return (
        <>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Add Observed QSL</h2>

                <div className="space-y-3">
                    <AutocompleteInput
                        value={qslFrom}
                        onChange={setQslFrom}
                        suggestions={callsignSuggestions}
                        placeholder="From (e.g., AA11)"
                    />

                    <AutocompleteInput
                        value={qslTo}
                        onChange={setQslTo}
                        suggestions={callsignSuggestions}
                        placeholder="To (e.g., BB22)"
                    />

                    <input
                        type="number"
                        value={qslHops}
                        onChange={(e) => setQslHops(e.target.value)}
                        placeholder="Hops (e.g., 3)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />

                    <AutocompleteInput
                        value={qslLocation}
                        onChange={setQslLocation}
                        suggestions={locationSuggestions}
                        placeholder="Location (e.g., Porto)"
                    />

                    <button
                        onClick={handleAdd}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                        <span>➕</span> Add QSL
                    </button>
                </div>
            </div>

            {qslMessages.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">
                        Observed QSL Messages ({qslMessages.length})
                    </h2>
                    <div className="space-y-2">
                        {qslMessages.map((qsl) => (
                            <div
                                key={qsl.id}
                                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                            >
                                <div className="flex-1">
                                    <span className="font-semibold text-green-600">{qsl.from}</span>
                                    <span className="text-gray-600"> → </span>
                                    <span className="font-semibold text-blue-600">{qsl.to}</span>
                                    <span className="text-gray-600"> - </span>
                                    <span className="font-medium">{qsl.hops} hops</span>
                                    <span className="text-gray-600"> - </span>
                                    <span className="text-gray-800">{qsl.location}</span>
                                </div>
                                <button
                                    onClick={() => onDeleteQSL(qsl.id)}
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