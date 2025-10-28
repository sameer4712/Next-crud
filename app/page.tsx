"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import TaskCard from "@/components/Card";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/task");
      console.log(res);

      const data = res.data.tasks.map((t: any) => ({ ...t, _id: t._id.toString() }));
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/task/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id: string, updated: { title: string; description: string; status: string }) => {
    try {
      await axios.put(`/api/task/${id}`, updated);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, ...updated } : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-extrabold text-5xl text-gray-900 mb-3">Task Tracker</h1>
        <p className="text-gray-600 text-lg">
          Keep track of your <span className="text-blue-500 font-semibold">Habits</span> and daily tasks with ease.
        </p>
      </div>

      {/* Add Task Button */}
      <div className="mb-10 text-center">
        <Link href="/addtask">
          <button className="bg-linear-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all font-medium">
            + Add New Task
          </button>
        </Link>
      </div>

      {/* <Link href='/product'><div>
        <button>click</button>
      </div></Link> */}
      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.length === 0 ? (
          <div className="text-center col-span-full py-20 bg-gray-50 rounded-xl shadow-lg">
            <p className="text-gray-500 text-xl mb-3">No tasks yet!</p>
            <p className="text-gray-400">Start by adding your first task to stay organized.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              _id={task._id.toString()}
              title={task.title}
              description={task.description}
              status={task.status}
              createdAt={task.createdAt}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
}
