<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $user->update([
            'role' => $validated['role'],
            'notification_duration' => $validated['notification_duration']
        ]);


        // If you have additional logic for notifications, update here

        // Respond with success
        return redirect()->route('setting.index')->with('success', 'Settings saved successfully!');
    }

    // public function updateNotification(Request $request)
    // {
    //     // Validate notification duration input
    //     $validated = $request->validate([
    //         'notification_duration' => 'required|integer|in:6,12,24,72,120,168',
    //     ]);

    //     // Update the user's notification duration
    //     $user = 

    //     // Redirect back to the settings page with a success message
    //     return redirect()->route('setting.index')->with('success', 'Notification settings updated successfully!');
    // }
}
