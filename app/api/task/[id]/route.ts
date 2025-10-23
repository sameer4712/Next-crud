// app/api/task/[id]/route.ts
import dbcon from "@/app/lib/db";
import taskmodel from "@/app/model/task";
import { Task } from "@/types/task";
import { NextResponse } from "next/server";



// UPDATE TASK
export async function PUT(req: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    await dbcon();

    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    const body: Task = await req.json();

    const task = await taskmodel.findByIdAndUpdate(id, body, { new: true });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task updated successfully", task }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/task/[id] error:", err);
    return NextResponse.json({ message: "Internal server error", error: String(err) }, { status: 500 });
  }
}

// DELETE TASK
export async function DELETE(req: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    await dbcon();

    // If params might be a Promise, await it
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    console.log("Deleting task with id:", id);

    const task = await taskmodel.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully", task }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/task/[id] error:", err);
    return NextResponse.json({ message: "Internal server error", error: String(err) }, { status: 500 });
  }
}

