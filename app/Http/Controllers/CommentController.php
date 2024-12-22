<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\CommentResource;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display comments for a specific task.
     */
    public function index($taskId)
{
    $task = Task::findOrFail($taskId);
    $comments = Comment::where('task_id', $taskId)
        ->with('user')
        ->latest()
        ->get();

    return Inertia::render('Kanban/Index', [
        'task' => $task,
        'comments' => CommentResource::collection($comments),
    ]);
}


    /**
     * Store a new comment for a task.
     */
    public function store(Request $request, $taskId)
{
    $validated = $request->validate([
        'comment' => 'required|string|max:500',
    ]);

    $task = Task::findOrFail($taskId);

    // Menyimpan komentar baru
    $comment = $task->comments()->create([
        'user_id' => Auth::id(),
        'comment' => $validated['comment'],
    ]);

    // Mengembalikan response JSON dengan komentar baru
    return response()->json(new CommentResource($comment), 201);
}


    /**
     * Delete a comment.
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        // Ensure the user can only delete their own comments
        if (Auth::id() !== $comment->user_id) {
            abort(403, 'Unauthorized to delete this comment.');
        }

        $comment->delete();

        return back()->with('success', 'Comment deleted successfully.');
    }
}
