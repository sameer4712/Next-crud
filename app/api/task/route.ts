import dbcon from "@/app/lib/db";
import taskmodel from "@/app/model/task";


export async function POST(request: Request) {
    try {
        await dbcon();
        const { title, description } = await request.json();
        const newTask = await taskmodel.create({ title, description });
        return Response.json({ message: "task created successfully", task: newTask }, { status: 201 });
    }
    catch (err) {
        return Response.json({ message: "internal server error", error: err }, { status: 500 });
    }
}


export async function GET(req: Request) {
    try {
        await dbcon();
        const tasks = await taskmodel.find().sort({ createdAt: -1 });
        return Response.json({ message: "tasks fetched successfully", tasks }, { status: 200 });
    }
    catch (err) {
        return Response.json({ message: "internal server error", error: err }, { status: 500 });
    }
}


