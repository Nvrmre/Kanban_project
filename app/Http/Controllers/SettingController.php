<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Setting/Index', [
            'users' => User::select('id', 'name', 'email')->get(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'notification_duration' => 'required|integer',
        ]);

        // Store notification settings
        return back()->with('success', 'Settings updated successfully');
    }
    public function store(Request $request)
    {
        // Validate incoming data
        $validated = $request->validate([
            'email' => 'required|exists:users,email',
            'role' => 'required|in:developer,user',
            'notification_duration' => 'required|integer|in:6,12,24,72,120,168',
        ]);

        // Find the user by email
        $user = User::where('email', $validated['email'])->first();

        // Update user's role
        $user->update(['role' => $validated['role']]);

        // If you have additional logic for notifications, update here

        // Respond with success
        return redirect()->route('setting.index')->with('success', 'Settings saved successfully!');
    }

    // public function updateNotification(Request $request)
    // {
    //     // Validate notification duration
    //     $validated = $request->validate([
    //         'notification_duration' => 'required|integer|in:6,12,24,72,120,168',
    //     ]);
    //     // Update user's notification duration
    //     auth()->user()->update(['notification_duration' => $validated['notification_duration']]);

    //     return redirect()->route('setting.index')->with('success', 'Notification settings updated successfully!');
    // }


}