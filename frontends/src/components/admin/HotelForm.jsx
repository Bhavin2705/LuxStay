import React from 'react';

const HotelForm = ({ editingHotel, formData, setFormData, handleSubmit, onCancel }) => {
  return (
    <div className="bg-gray-700 rounded-xl p-4 sm:p-6 mb-6">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
        {editingHotel ? `Edit Hotel: ${editingHotel.name}` : 'Add New Hotel'}
      </h3>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Hotel Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white text-sm"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white text-sm"
          required
        />
        <input
          type="number"
          placeholder="Price per night"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white text-sm"
          required
        />
        <input
          type="number"
          placeholder="Number of rooms"
          value={formData.rooms}
          onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
          className="bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white text-sm sm:col-span-2"
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white sm:col-span-2 text-sm"
          required
        />
        {formData.image && (
          <div className="sm:col-span-2">
            <p className="text-gray-400 text-sm mb-2">Image Preview:</p>
            <img 
              src={formData.image} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-lg border border-gray-600"
              onError={(e) => { e.target.src = '/placeholder.svg'; }}
            />
          </div>
        )}
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-gray-600 border border-gray-500 rounded-lg px-4 py-2 text-white sm:col-span-2 h-24 text-sm"
          required
        />
        {editingHotel && (
          <div className="sm:col-span-2 bg-gray-600 rounded-lg px-4 py-2 border border-gray-500">
            <p className="text-gray-400 text-sm">Current Rating: <span className="text-yellow-400 font-semibold">{editingHotel.rating} ⭐</span></p>
            <p className="text-gray-500 text-xs mt-1">Note: Ratings are set by customer reviews and cannot be modified by admins</p>
          </div>
        )}
        <div className="sm:col-span-2 flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
          >
            {editingHotel ? 'Update Hotel' : 'Add Hotel'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelForm;
