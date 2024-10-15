"use client"
import JobCard from "./component/Card";
import { useState, useEffect } from "react";
import EditModal from "./component/EditModal";
import DeleteModal from "./component/DeleteModal";
import AddModal from "./component/AddModal"; 
import {  Job } from "@prisma/client";
import { toast } from "react-toastify";


export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      setJobs(data.data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setIsEditModalOpen(true);
  };

  const handleDelete = (job: Job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  };

  const saveJob = async (updatedJob: { title: string; description: string }) => {
    if (!selectedJob) return; 
    
    const formData = new FormData();
    formData.append('title', updatedJob.title);
    formData.append('description', updatedJob.description);


   try {
      const url = `api/jobs/${selectedJob.id}`;
      const method ='PUT';

      const response = await fetch(url, {
        method,
        body: formData,
      });
      if (response.ok) {
        setIsEditModalOpen(false);
        toast.success("Task saved successfully !!!");
        fetchJobs();
      } else {
        toast.error("Failed to save Task");
      }
    } catch (error) {
      console.error('Error saving Task:', error);
      toast.error("Error saving Task");
    }
  };

  const deleteJob = async () => {
    if (selectedJob) {
      try {
        await fetch(`/api/jobs/${selectedJob.id}`, {
          method: "DELETE",
        });
        setIsDeleteModalOpen(false);
        toast.success("Task telah dihapus ")
        fetchJobs(); 
      } catch (error) {
        toast.error("Task gagal di hapus")
        console.error(error);
      }
      
    }
  };

  const addJob = async (newJob: { title: string; description: string }) => {
    const formData = new FormData();
    formData.append('title', newJob.title);
    formData.append('description', newJob.description);
  
    try {
      const url = `/api/jobs`;
      const method = 'POST';
  
      const response = await fetch(url, {
        method,
        body: formData, 
      });
  
      if (response.ok) {
        setIsAddModalOpen(false); 
        toast.success("Task posted successfully !!!");
        fetchJobs(); 
      } else {
        toast.error("Failed to add Task");
      }
    } catch (error) {
      console.error('Error adding Task:', error);
      toast.error("Error adding Task");
    }
  };
  
  

  return (
    <div className=" px-12 flex flex-col gap-4 py-12 justify-center items-center">
      <h1 className="text-6xl text-white font-bold">To-Do List</h1>
      <div className="bg-slate-50 bg-opacity-30 p-8 flex flex-col gap-10 rounded-xl w-full">
        <div className="flex justify-end">
          <button 
          onClick={() => setIsAddModalOpen(true)} 
          className="text-white text-2xl hover:bg-green-800 bg-green-700 font-semibold px-4 py-1 rounded-lg">
            Add +
          </button>
        </div>
        <div className="flex flex-wrap justify-start gap-x-11 px-[75px] gap-4 flex-row">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={() => handleEdit(job)}
            onDelete={() => handleDelete(job)}
          />
        ))}
        </div>

        {selectedJob && (
          <EditModal
            job={selectedJob}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={saveJob}
          />
        )}

        {selectedJob && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={deleteJob}
          />
        )}

        <AddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)} 
          onSubmit={addJob} 
        />
      </div>
    </div>
  );
}
