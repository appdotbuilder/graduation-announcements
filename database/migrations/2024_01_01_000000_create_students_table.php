<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_id')->unique()->comment('Unique student identifier');
            $table->string('name')->comment('Full name of the student');
            $table->string('major')->comment('Student major/program of study');
            $table->enum('graduation_status', ['pending', 'graduated', 'incomplete'])->default('pending')->comment('Current graduation status');
            $table->date('graduation_date')->nullable()->comment('Date of graduation if applicable');
            $table->text('notes')->nullable()->comment('Additional notes about the student');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('student_id');
            $table->index('name');
            $table->index('major');
            $table->index('graduation_status');
            $table->index(['graduation_status', 'graduation_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};