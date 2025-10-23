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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      {/* Go Back Button */}
      <Link href="/" className="absolute top-5 left-5">
        <button
          disabled={loading}
          className={`font-semibold px-4 py-2 rounded-2xl text-white shadow-md text-sm sm:text-base transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          }`}
        >
          {loading ? "Loading..." : "← Go Back"}
        </button>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col items-center gap-6 transition-all"
      >
        <h1 className="font-extrabold font-mono text-2xl sm:text-3xl md:text-4xl text-gray-800 text-center mb-2">
          Add New Task
        </h1>

        {/* Task Name */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm sm:text-base font-semibold text-gray-700">
            Task
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task name..."
            className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-purple-300 focus:outline-none shadow-sm placeholder-gray-400 transition-all"
          />
        </div>

        {/* Task Description */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm sm:text-base font-semibold text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the task..."
            className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 h-28 sm:h-32 resize-none text-sm sm:text-base focus:ring-2 focus:ring-purple-300 focus:outline-none shadow-sm placeholder-gray-400 transition-all"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 w-full py-3 sm:py-4 rounded-xl text-white font-semibold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          }`}
        >
          {loading && (
            <span className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}
