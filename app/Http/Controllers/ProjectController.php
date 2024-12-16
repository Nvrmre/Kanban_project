<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers;
use Illuminate\Support\Facades\DB;


class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = Project::query();
        $projects = $query->paginate(10);

        return inertia("Project/index", [
            "projects" => ProjectResource::collection($projects),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/create", [
            'projects' => Project::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
   // app/Http/Controllers/ProjectController.php


    public function store(StoreProjectRequest $request)
    {
        // Validasi dan simpan data proyek baru
        $validated = $request->validated();
        $validated['created_by'] = Auth::id(); // Menambahkan created_by
        $validated['updated_by'] = Auth::id(); // Menambahkan updated_by

        // Menyimpan proyek baru
        $project = Project::create($validated);

        // Kirim data proyek baru ke frontend setelah berhasil dibuat
        return inertia('Kanban/Index', [
            'projects' => ProjectResource::collection(Project::latest()->paginate(10)),
            'project' => new ProjectResource($project),
        ]);
    }


    /**
     * Display the specified resource.
     */


public function show($id)
{
    // Mengambil project berdasarkan ID
    $project = Project::findOrFail($id);

    // Mengambil boards terkait dengan project_id
    $boards = DB::table('boards')->where('boards.projects_id', '=', $id)->get();


    // Menampilkan tampilan menggunakan Inertia dan mengirim data project serta boards
    return Inertia::render('Projects/Show', [
        'project' => $project,
        'boards' => $boards,
    ]);
}



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        // Form untuk mengedit proyek
        return inertia('Project/edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {

        // Validasi dan update proyek
        $validated = $request->validated();
        $validated['updated_by'] = Auth::id(); // Menambahkan updated_by

        $project->update($validated);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
        */
    public function destroy($id)
    {

        // Hapus proyek
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');

    }
}
