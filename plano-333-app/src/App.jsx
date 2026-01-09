import { useState, useEffect } from 'react';
import LocationInput from './components/LocationInput';
import ReceivedMessages from './components/ReceivedMessages';
import ObservedQSL from './components/ObservedQSL';
import Summary from './components/Summary';
import {
  loadFromStorage,
  saveToStorage,
  getUniqueCallsigns,
  getUniqueLocations
} from './utils/storage';

export default function App() {
  const [myLocation, setMyLocation] = useState('');
  const [messages, setMessages] = useState([]);
  const [qslMessages, setQslMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('received');

  // Load data on mount
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      setMyLocation(saved.myLocation || '');
      setMessages(saved.messages || []);
      setQslMessages(saved.qslMessages || []);
    }
  }, []);

  // Save whenever data changes
  useEffect(() => {
    saveToStorage({ myLocation, messages, qslMessages });
  }, [myLocation, messages, qslMessages]);

  const callsignSuggestions = getUniqueCallsigns(messages, qslMessages);
  const locationSuggestions = getUniqueLocations(messages, qslMessages, myLocation);

  const handleAddMessage = (message) => {
    setMessages([...messages, message]);
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleAddQSL = (qsl) => {
    setQslMessages([...qslMessages, qsl]);
  };

  const handleDeleteQSL = (id) => {
    setQslMessages(qslMessages.filter(q => q.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-indigo-900 mb-2">Plano 3-3-3</h1>
        <p className="text-gray-600 mb-6">Meshtastic Portugal - Message Manager</p>

        <LocationInput value={myLocation} onChange={setMyLocation} />

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('received')}
            className={`flex-1 py-3 px-4 font-medium ${activeTab === 'received'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Received CQ
          </button>
          <button
            onClick={() => setActiveTab('observed')}
            className={`flex-1 py-3 px-4 font-medium ${activeTab === 'observed'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Observed QSL
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'received' ? (
          <ReceivedMessages
            messages={messages}
            onAddMessage={handleAddMessage}
            onDeleteMessage={handleDeleteMessage}
            callsignSuggestions={callsignSuggestions}
            locationSuggestions={locationSuggestions}
          />
        ) : (
          <ObservedQSL
            qslMessages={qslMessages}
            onAddQSL={handleAddQSL}
            onDeleteQSL={handleDeleteQSL}
            callsignSuggestions={callsignSuggestions}
            locationSuggestions={locationSuggestions}
          />
        )}

        <Summary
          messages={messages}
          qslMessages={qslMessages}
          myLocation={myLocation}
        />

        {messages.length === 0 && qslMessages.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No messages yet. Start adding received CQ messages or observed QSL replies!</p>
          </div>
        )}
      </div>
    </div>
  );
}