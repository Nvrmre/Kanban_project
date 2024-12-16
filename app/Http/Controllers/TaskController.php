<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Menampilkan daftar tugas berdasarkan board dan status.
     */
    public function index()
    {
        $boardId = request('board_id'); // Board ID untuk filter
        $status = request('status'); // Status filter (to_do, in_progress, done)

        $tasks = Task::when($boardId, fn($query) => $query->where('board_id', $boardId))
            ->when($status, fn($query) => $query->where('status', $status))
            ->orderBy('priority', 'desc') // Sorting berdasarkan prioritas
            ->paginate(10)
            ->withQueryString();

        return inertia('Task/Index', [
            'tasks' => $tasks,
            'statusOptions' => ['to_do', 'in_progress', 'done'],
            'priorityOptions' => ['low', 'medium', 'high'],
        ]);
    }

    /**
     * Menampilkan form untuk membuat tugas baru di board tertentu.
     */
    public function create()
    {
        return inertia('Task/Create', [
            'statusOptions' => ['to_do', 'in_progress', 'done'],
            'priorityOptions' => ['low', 'medium', 'high'],
            'notificationDurations' => ['6 hours', '12 hours', '1 day', '3 days', '5 days', '7 days'],
        ]);
    }

    /**
     * Menyimpan tugas baru.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['assigned_id'] = Auth::id(); // Assign ke user yang sedang login

        Task::create($data);

        return redirect()->route('task.index', ['board_id' => $data['board_id']])
            ->with('success', 'Tugas berhasil dibuat.');
    }

    /**
     * Menampilkan detail tugas.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => $task,
        ]);
    }

    /**
     * Menampilkan form untuk mengedit tugas.
     */
    public function edit(Task $task)
    {
        return inertia('Task/Edit', [
            'task' => $task,
            'statusOptions' => ['to_do', 'in_progress', 'done'],
            'priorityOptions' => ['low', 'medium', 'high'],
            'notificationDurations' => ['6 hours', '12 hours', '1 day', '3 days', '5 days', '7 days'],
        ]);
    }

    /**
     * Memperbarui tugas yang ada.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $task->update($data);

        return redirect()->route('task.index', ['board_id' => $task->board_id])
            ->with('success', 'Tugas berhasil diperbarui.');
    }

    /**
     * Menghapus tugas.
     */
    public function destroy(Task $task)
    {
        $boardId = $task->board_id; // Simpan board ID untuk redirect
        $task->delete();

        return redirect()->route('task.index', ['board_id' => $boardId])
            ->with('success', 'Tugas berhasil dihapus.');
    }
}
