import mongoose, { Schema, Model } from "mongoose";
import { Task } from "@/types/task";


const TaskSchema = new Schema<Task>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    },
    { timestamps: true }
);

const taskmodel: Model<Task> = mongoose.models.Task || mongoose.model<Task>('Task', TaskSchema);
export default taskmodel;