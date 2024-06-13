import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const todoModel = mongoose.model("todos",todoSchema);

export default todoModel;