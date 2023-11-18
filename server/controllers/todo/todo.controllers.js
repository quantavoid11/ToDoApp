import asyncHandler from 'express-async-handler';
import Todo from "../../models/todo/todo.models.js";
import mongoose from 'mongoose';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';



export const createTodo = asyncHandler(async (req, res) => {
    const { title, subTodos } = req.body;
    const todo = await Todo.create({
        title: title,
        createdBy: new mongoose.Types.ObjectId(req.user._id),
        subTodos: subTodos
    });
    return res
        .status(201)
        .json(new ApiResponse(201, todo, "Todo created successfully"));
});

export const getAllTodos=asyncHandler(async(req,res)=>{

});

export const getTodoById = asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId);
    if (!todo) {
        throw new ApiError(404, "Todo does not exist");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, todo, "Todo fetched successfully"));
});

export const updateTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    const { title } = req.body;
    const todo = await Todo.findByIdAndUpdate(todoId,
        {
            $set: {
                title
            }
        },
        { new: true }
    );
    if (!todo) {
        throw new ApiError(404, "Todo does not exist");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, todo, "Todo updated successfully"));
});

export const deleteTodo = asyncHandler(async (req, res) => {
    const { todoId } = rew.params;
    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo) {
        throw new ApiError(404, "Todo does not exist");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, { deletedTodo: todo }, "Todo deleted successfully"));
});

export const toggleTodoStatus = asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    const todo = await Todo.findById();
    if (!todo) {
        throw new ApiError(404, "Todo does not exist");
    }
    todo.complete = !todo.complete;
    return res
        .status(200)
        .json(new ApiResponse(200, todo, "Todo marked " + todo.complete ? "completed" : "not completed"));
})



