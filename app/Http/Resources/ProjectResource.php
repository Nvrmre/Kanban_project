<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => $this->created_at ? (new Carbon($this->created_at))->format('Y-m-d') : null,
            'updated_at' => $this->updated_at ? (new Carbon($this->updated_at))->format('Y-m-d') : null,
            // 'due_date' => $this->due_date ? (new Carbon($this->due_date))->format('Y-m-d') : null,
            // 'status' => $this->status,
            'created_by' => $this->whenLoaded('createdBy', function () {
                return $this->createdBy->name ?? null; // Misalkan 'createdBy' adalah relasi ke User
            }),
            'updated_by' => $this->whenLoaded('updatedBy', function () {
                return $this->updatedBy->name ?? null; // Misalkan 'updatedBy' adalah relasi ke User
            }),
        ];
    }
}
