"use client"
import JobCard from "./component/Card";
import { useState, useEffect } from "react";
import EditModal from "./component/EditModal";
import DeleteModal from "./component/DeleteModal";
import { PrismaClient, Job } from "@prisma/client";

const prisma = new PrismaClient();

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fungsi untuk mengambil data dari database
  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      setJobs(data.data);
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  // Memuat data saat komponen dimuat pertama kali
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

  const saveJob = async (updatedJob: Job) => {
    await fetch(`/api/jobs/${updatedJob.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });
    setIsEditModalOpen(false);
    fetchJobs(); // Memperbarui daftar pekerjaan setelah penyimpanan
  };

  const deleteJob = async () => {
    if (selectedJob) {
      await fetch(`/api/jobs/${selectedJob.id}`, {
        method: "DELETE",
      });
      setIsDeleteModalOpen(false);
      fetchJobs(); // Memperbarui daftar pekerjaan setelah penghapusan
    }
  };

  return (
    <div className="container flex flex-col gap-4">
      <h1 className="text-2xl font-bold">To-Do List</h1>
      <div>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={() => handleEdit(job)}
            onDelete={() => handleDelete(job)}
          />
        ))}

        {/* Edit Modal */}
        {selectedJob && (
          <EditModal
            job={selectedJob}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={saveJob}
          />
        )}

        {/* Delete Modal */}
        {selectedJob && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={deleteJob}
          />
        )}
      </div>
    </div>
  );
}
