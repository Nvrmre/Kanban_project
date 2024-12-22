<?php

namespace App\Http\Controllers;


use App\Models\Task;
use App\Models\Board;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Menampilkan daftar tugas berdasarkan board dan status.
     */
    public function index()
{
    $boardId = request('board_id');
    $status = request('status');

    // Get boards based on some condition (e.g., project or board ID)
    $boards = Board::when($boardId, fn($query) => $query->where('id', $boardId))->get();

    $tasks = Task::when($boardId, fn($query) => $query->whereIn('board_id', $boards->pluck('id')))


        // ->when($status, fn($query) => $query->where('status', $status))
        ->orderBy('priority', 'desc')
        ->paginate(10)
        ->withQueryString();

    $board = Board::find($boardId);

    return inertia('Kanban/Index', [
        'tasks' => $tasks,
        'boardId' => $boardId,
        'status' => $status,
        'board' => $board,
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
    $data['assigned_id'] = Auth::id();
    $data['status'] = $data['status'] ?? 'to_do';
    $data['priority'] = strtolower($data['priority']);

    Task::create($data);

    return redirect()->route('kanban.index')
        ->with('success', 'Task created successfully');
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

    public function report() {
        $taskData = Task::selectRaw('
            SUM(CASE WHEN status = "done" THEN 1 ELSE 0 END) AS complete,
            SUM(CASE WHEN status = "to_do" THEN 1 ELSE 0 END) AS to_do,
            SUM(CASE WHEN status = "in_progress" THEN 1 ELSE 0 END) AS in_progress
        ')->first();
    
        $taskDistribution = [
            'complete' => $taskData->complete ?? 0,
            'overdue' => $taskData->to_do ?? 0
        ];
    
        return Inertia::render('Laporan/Index', [
            'taskData' => $taskData,
            'taskDistribution' => $taskDistribution,
        ]);
    }
    
}