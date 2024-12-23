<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Inertia\Inertia;
use App\Http\Resources\CommentResource;
use App\Http\Requests\StoreCommentRequest;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display comments for a specific task.
     */
    public function index($taskId)
{
    $task = Task::with(['comments.user', 'board'])
        ->whereHas('board', fn($query) => $query->where('id', request('board_id')))
        ->findOrFail($taskId);

    return Inertia::render('Kanban/Index', [
        'task' => $task,
        'comments' => CommentResource::collection($task->comments),
    ]);
}


public function show($taskId)
{
    $task = Task::findOrFail($taskId);
    $comments = Comment::where('tasks_id', $taskId)
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
    public function store(StoreCommentRequest $request, $taskId)
{
    $task = Task::whereHas('board', fn($query) => $query->where('id', request('board_id')))
        ->findOrFail($taskId);

    $validated = $request->validated();

    $comment = $task->comments()->create([
        'users_id' => Auth::id(),
        'comment' => $validated['comment'],
    ]);

    return back()->with('success', 'Comment added successfully.');
}



    /**
     * Delete a comment.
     */
    public function destroy($id)
{
    $comment = Comment::with('task.board')->findOrFail($id);

    if ($comment->task->board->id !== request('board_id')) {
        abort(403, 'Unauthorized access.');
    }

    if (Auth::id() !== $comment->users_id) {
        abort(403, 'Unauthorized to delete this comment.');
    }

    $comment->delete();

    return back()->with('success', 'Comment deleted successfully.');
}

}
