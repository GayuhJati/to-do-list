// components/EditJobModal.tsx
import React, { useState } from 'react';

type Job = {
  id: number;
  title: string;
  description: string;
};

type EditJobModalProps = {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedJob: Job) => void;
};

const EditModal: React.FC<EditJobModalProps> = ({ job, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);

  const handleSave = () => {
    const updatedJob: Job = { ...job, title, description};
    onSave(updatedJob);
    onClose(); // Close modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Job</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
