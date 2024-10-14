import React from 'react';

type DeleteJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteModal: React.FC<DeleteJobModalProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Delete Job</h2>
        <p className="mb-4">Are you sure you want to delete this job?</p>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
          <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
