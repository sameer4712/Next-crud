"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill both fields!");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/task", { title, description });
      setTitle("");
      setDescription("");
      router.push("/"); // redirect to home
    } catch (error) {
      alert("Failed to add task!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center my-16 relative">
      {/* Go Back Button */}
      <Link href="/">
        <button
          disabled={loading}
          className={`absolute top-0 left-17 font-semibold px-4 py-2 rounded-2xl text-white shadow-lg transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-400 hover:bg-green-500"
          }`}
        >
          {loading ? "Loading..." : "Go Back"}
        </button>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-linear-to-br from-purple-100 via-blue-50 to-white border border-gray-200 rounded-3xl shadow-xl p-8 flex flex-col items-center gap-6"
      >
        <h1 className="font-extrabold font-mono text-3xl text-gray-800 mb-2">Add New Task</h1>

        {/* Task Name */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Task</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task name..."
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-300 focus:outline-none shadow-sm placeholder-gray-400 transition-all"
          />
        </div>

        {/* Task Description */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the task..."
            className="w-full border border-gray-300 rounded-xl p-3 h-28 resize-none focus:ring-2 focus:ring-purple-300 focus:outline-none shadow-sm placeholder-gray-400 transition-all"
          />
        </div>

        {/* Submit button with spinner */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 w-full py-3 rounded-xl text-white font-semibold shadow-lg transition-all flex items-center justify-center gap-2 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          }`}
        >
          {loading && <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}
