"use client";
import React, { useState } from "react";

interface TaskCardProps {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  onDelete: (_id: string) => void;
  onUpdate: (_id: string, updated: { title: string; description: string; status: string }) => void;
}

export default function TaskCard({ _id, title, createdAt, description, status, onDelete, onUpdate }: TaskCardProps) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);
  const [editStatus, setEditStatus] = useState(status);

  const handleSave = () => {
    onUpdate(_id, { title: editTitle, description: editDesc, status: editStatus });
    setEditing(false);
  };

  const statusColors = {
    pending: "bg-gray-100 text-gray-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  };

  // Format time from createdAt
  const timeString = new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-gray-100 rounded-3xl p-6 hover:shadow-xl transition-shadow transform hover:-translate-y-2 hover:scale-105 duration-300">
      {editing ? (
        <div className="flex flex-col gap-3">
          <input className="border p-3 rounded outline-none" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <textarea className="border p-3 rounded" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
          <select className="border p- rounded" value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In-progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex gap-2 mt-2">
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">Save</button>
            <button onClick={() => setEditing(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-all">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="font-semibold font-serif text-xl mb-2 text-gray-800">{title}</h2>
          <p className="text-gray-600 font-mono font-light mb-2">{description}</p>
          <p className="text-gray-400 mb-4 text-sm">Created at: {timeString}</p>
          <div className="flex justify-between items-center">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusColors[status as keyof typeof statusColors]}`}>
              {status}
            </span>
            <div className="flex gap-3">
              <button onClick={() => setEditing(true)} className="text-blue-500 hover:underline font-semibold">Edit</button>
              <button onClick={() => onDelete(_id)} className="text-red-500 font-semibold hover:underline">Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
