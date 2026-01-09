import { useState } from 'react';

export default function Summary({ messages, qslMessages, myLocation }) {
    const [copied, setCopied] = useState(false);

    const generateQslReplies = () => {
        if (!myLocation.trim()) {
            return 'Please set your location first';
        }

        return messages.map(msg =>
            `QSL, ${msg.callsign}, ${msg.hops} hops, ${myLocation}`
        ).join('\n');
    };

    const generateSummary = () => {
        const grouped = messages.reduce((acc, msg) => {
            if (!acc[msg.callsign]) {
                acc[msg.callsign] = {
                    callsign: msg.callsign,
                    location: msg.location,
                    hops: []
                };
            }
            acc[msg.callsign].hops.push(msg.hops);
            return acc;
        }, {});

        let summary = myLocation ? `My location: ${myLocation}\n\n` : '';
        summary += '=== Received Messages ===\n';

        Object.values(grouped).forEach(radio => {
            summary += `${radio.callsign} (${radio.location}): ${radio.hops.join(', ')} hops\n`;
        });

        if (qslMessages.length > 0) {
            summary += '\n=== Observed QSL Messages ===\n';
            qslMessages.forEach(qsl => {
                summary += `${qsl.from} → ${qsl.to}, ${qsl.hops} hops, ${qsl.location}\n`;
            });
        }

        summary += '\n=== My QSL Replies ===\n';
        summary += generateQslReplies();

        return summary;
    };

    const copyToClipboard = () => {
        const text = generateSummary();
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (messages.length === 0 && qslMessages.length === 0) {
        return null;
    }

    return (
        <div className="p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                    {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
            </div>
            <pre className="bg-white p-4 rounded-lg text-sm overflow-x-auto border border-indigo-200 whitespace-pre-wrap">
                {generateSummary()}
            </pre>
        </div>
    );
}