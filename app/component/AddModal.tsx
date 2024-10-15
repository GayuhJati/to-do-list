import { useState } from "react";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: { title: string; description: string }) => void;
}

export default function AddModal({ isOpen, onClose, onSubmit }: AddModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    const newJob = {
      title,
      description,
    };

    onSubmit(newJob); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            required 
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            required 
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
