<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Menampilkan daftar tugas.
     */
    public function index()
    {
        $tasks = Task::all();

        return inertia('Task/Index', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Menampilkan form untuk membuat tugas baru.
     */
    public function create()
    {
        return inertia('Task/Create');
    }

    /**
     * Menyimpan tugas baru.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['assigned_id'] = Auth::id();
        
        Task::create($data);

        return redirect()->route('task.index')->with('success', 'Tugas berhasil dibuat.');
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
        ]);
    }

    /**
     * Memperbarui tugas yang ada.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return redirect()->route('task.index')->with('success', 'Tugas berhasil diperbarui.');
    }

    /**
     * Menghapus tugas.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('task.index')->with('success', 'Tugas berhasil dihapus.');
    }
}
