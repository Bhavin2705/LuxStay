import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import HotelForm from './HotelForm';
import DeleteHotelModal from './DeleteHotelModal';

const HotelsTab = ({ 
  hotels, 
  showAddHotel, 
  setShowAddHotel, 
  editingHotel, 
  setEditingHotel,
  formData,
  setFormData,
  handleAddHotel,
  handleEditHotel,
  handleDeleteHotel,
  startEdit,
  resetForm
}) => {
  const [deleteModal, setDeleteModal] = React.useState({ isOpen: false, hotel: null });

  const openDeleteModal = (hotel) => {
    setDeleteModal({ isOpen: true, hotel });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, hotel: null });
  };

  const confirmDelete = () => {
    if (deleteModal.hotel) {
      handleDeleteHotel(deleteModal.hotel._id || deleteModal.hotel.id);
      closeDeleteModal();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-8 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Hotel Management</h2>
          <button
            onClick={() => {
              setShowAddHotel(true);
              setEditingHotel(null);
              resetForm();
            }}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition text-sm"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Add Hotel</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {(showAddHotel || editingHotel) && (
          <HotelForm
            editingHotel={editingHotel}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={editingHotel ? handleEditHotel : handleAddHotel}
            onCancel={() => {
              setShowAddHotel(false);
              setEditingHotel(null);
              resetForm();
            }}
          />
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {hotels.map((hotel) => (
            <div key={hotel._id || hotel.id} className="bg-gray-700 rounded-xl overflow-hidden border border-gray-600">
              <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 truncate">{hotel.name}</h3>
                <p className="text-gray-400 text-sm mb-3 truncate">{hotel.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 font-semibold text-sm sm:text-base">₹{hotel.price.toLocaleString('en-IN')}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(hotel)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(hotel)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {deleteModal.isOpen && (
        <DeleteHotelModal
          hotel={deleteModal.hotel}
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
        />
      )}
    </motion.div>
  );
};

export default HotelsTab;
