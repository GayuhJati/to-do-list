// components/JobCard.tsx
import React from 'react';

type Job = {
  id: number;
  title: string;
  description: string;
};

type JobCardProps = {
  job: Job;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-[400px] max-w-[450px]">
      <h3 className="text-xl font-semibold text-slate-500 mb-2">{job.title}</h3>
      <p className="text-black mb-4">{job.description}</p>

      {/* Buttons in the bottom-right corner */}
      <div className=" flex flex-row gap-2 justify-end">
        <button
          onClick={() => onEdit(job.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
