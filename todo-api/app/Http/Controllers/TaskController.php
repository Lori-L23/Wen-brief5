<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()
            ->tasks()
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task = $request->user()->tasks()->create($validated);

        return response()->json($task, 201);
    }
    public function update(Request $request, Task $task)
    {
        if ($request->user()->id !== $task->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'sometimes|boolean',
        ]);
    
        $task->update($validated);
    
        return response()->json($task);
    }
    public function destroy(Request $request, Task $task)
    {
        // Vérification manuelle que l'utilisateur est propriétaire de la tâche
        if ($request->user()->id !== $task->user_id) {
            return response()->json([
                'message' => 'Unauthorized: You can only delete your own tasks'
            ], 403);
        }
    
        $task->delete();
    
        return response()->noContent();
    }

    public function toggleComplete(Request $request, Task $task)
    {
        // Vérification manuelle que l'utilisateur est propriétaire de la tâche
        if ($request->user()->id !== $task->user_id) {
            return response()->json([
                'message' => 'Unauthorized: You can only toggle your own tasks'
            ], 403);
        }
    
        $task->update(['completed' => !$task->completed]);
    
        return response()->json($task);
    }
}