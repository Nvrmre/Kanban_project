<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Inertia\Inertia;
use App\Http\Resources\CommentResource;
use App\Http\Requests\StoreCommentRequest;
use App\Models\User;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

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
            'users' => User::all(),
            'task' => $task,
            'comments' => CommentResource::collection($task->comments),
           
        ]);
    }


    public function show($taskId)
    {
        $task = Task::findOrFail($taskId);
        $comments = Comment::whereIn('task_id', $task->pluck('id')->flatten())
        ->with('user')
        ->latest()
        ->get();
 

        return Inertia::render('Kanban/Index', [
            'users' => User::all(),
            'task' => $task,
            'comments' => CommentResource::collection($comments),
        ]);
    }

    /**
     * Store a new comment for a task.
     */
    public function store(HttpRequest $request, Task $task)
    {
        $request->validate([
            'comment' => 'required|string',
            'task_id' => 'required|exists:tasks,id', // Memastikan task_id valid
            'user_id' => 'required|exists:users,id', // Memastikan user_id valid Memastikan task_id ada dan valid
        ]);

        // Jika validasi berhasil, lanjutkan untuk menyimpan komentar
        Comment::create([
            'comment' => $request->comment,
            'task_id' => $request->task_id,
            'user_id' =>$request->user_id,
        ]);
        return redirect()->route('kanban.index', $task->id)->with('success', 'Comment added successfully!');
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
