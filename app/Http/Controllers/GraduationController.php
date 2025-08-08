<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GraduationController extends Controller
{
    /**
     * Display the graduation announcements.
     */
    public function index(Request $request)
    {
        $query = Student::query();

        // Filter by graduation status
        if ($request->filled('status')) {
            $query->where('graduation_status', $request->status);
        } else {
            // Default to showing graduated students
            $query->where('graduation_status', 'graduated');
        }

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('student_id', 'like', "%{$search}%")
                  ->orWhere('major', 'like', "%{$search}%");
            });
        }

        $students = $query->orderBy('graduation_date', 'desc')
                         ->orderBy('name')
                         ->paginate(20)
                         ->withQueryString();

        // Get statistics
        $stats = [
            'total_graduates' => Student::where('graduation_status', 'graduated')->count(),
            'pending_students' => Student::where('graduation_status', 'pending')->count(),
            'incomplete_students' => Student::where('graduation_status', 'incomplete')->count(),
        ];

        return Inertia::render('graduation/index', [
            'students' => $students,
            'filters' => $request->only(['status', 'search']),
            'stats' => $stats,
        ]);
    }

    /**
     * Store a new search request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|string',
        ]);

        $student = Student::where('student_id', $request->student_id)->first();

        if (!$student) {
            return back()->with('error', 'Student not found. Please check the student ID and try again.');
        }

        return Inertia::render('graduation/student', [
            'student' => $student
        ]);
    }
}