export default function LocationInput({ value, onChange }) {
    return (
        <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                My Location
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="e.g., Tomar"
                className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
        </div>
    );
}