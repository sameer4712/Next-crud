import mongoose from "mongoose";
export interface Task {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    CreatedAt?:Date;
    UpdatedAt?:Date;
}