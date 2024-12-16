<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Board;
use App\Models\Task;
use App\Models\Project;
use App\Http\Requests\StoreBoardRequest;
use App\Http\Requests\UpdateBoardRequest;

class BoardController extends Controller
{
    /**
     * Display a listing of the boards with optional project filter.
     */

        public function index()
{
    $status = request('status'); // Status filter (to_do, in_progress, done)
    $projectId = request('project_id'); // Project ID untuk filter

    // Fetch boards with filters
    $boards = Board::when($projectId, fn($query) => $query->where('project_id', $projectId))
        ->with('project') // Sertakan data project untuk setiap board
        ->get();

    // Ambil board_id dari board pertama jika ada
    $boardId = $boards->isNotEmpty() ? $boards->first()->id : null;

    // Fetch tasks with filters, menggunakan board_id yang diambil dari data boards
    $tasks = Task::when($boardId, fn($query) => $query->where('board_id', $boardId))
        ->when($status, fn($query) => $query->where('status', $status))
        ->orderBy('priority', 'desc') // Sorting berdasarkan prioritas
        ->paginate(10)
        ->withQueryString();

    // Return Inertia view with both tasks and boards data
    return inertia('Kanban/Index', [
        'tasks' => $tasks,
        'boardId' => $boardId, // Pass the boardId to frontend
        'status' => $status,
        'boards' => $boards,
        'projects' => Project::all(), // Untuk filter project di frontend
        'id' => $projectId, // Untuk menyimpan project_id yang dipilih
    ]);
}



    /**
     * Show the form for creating a new board.
     */
    public function create()
    {
        return Inertia::render('Boards/Create', [
            'projects' => Project::all(), // Data project untuk dropdown pilihan
        ]);
    }

    /**
     * Store a newly created board in storage.
     */
    public function store(StoreBoardRequest $request)
    {
        $board = Board::create($request->validated());

        return redirect()->route('boards.index', ['project_id' => $board->project_id])
            ->with('success', 'Board created successfully.');
    }

    /**
     * Display the specified board along with its tasks.
     */
    public function show(Board $board)
    {
        $tasks = Task::where('board_id', $board->id)
            ->orderBy('priority', 'desc') // Sorting berdasarkan prioritas
            ->get();

        return Inertia::render('Boards/Show', [
            'board' => $board->load('project'), // Sertakan data project
            'tasks' => $tasks, // Daftar tugas yang terkait dengan board ini
            'statusOptions' => ['to_do', 'in_progress', 'done'],
            'priorityOptions' => ['low', 'medium', 'high'],
        ]);
    }

    /**
     * Show the form for editing the specified board.
     */
    public function edit(Board $board)
    {
        return Inertia::render('Boards/Edit', [
            'board' => $board,
            'projects' => Project::all(), // Semua project untuk dropdown pilihan
        ]);
    }

    /**
     * Update the specified board in storage.
     */
    public function update(UpdateBoardRequest $request, Board $board)
    {
        $board->update($request->validated());

        return redirect()->route('boards.index', ['project_id' => $board->project_id])
            ->with('success', 'Board updated successfully.');
    }

    /**
     * Remove the specified board from storage.
     */
    public function destroy(Board $board)
    {
        $projectId = $board->project_id; // Simpan project_id untuk redirect
        $board->delete();

        return redirect()->route('boards.index', ['project_id' => $projectId])
            ->with('success', 'Board deleted successfully.');
    }
}
