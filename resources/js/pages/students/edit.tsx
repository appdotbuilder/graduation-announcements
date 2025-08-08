import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { InputError } from '@/components/input-error';

interface Student {
    id: number;
    student_id: string;
    name: string;
    major: string;
    graduation_status: 'pending' | 'graduated' | 'incomplete';
    graduation_date: string | null;
    notes: string | null;
}

interface Props {
    student: Student;
    [key: string]: unknown;
}

export default function EditStudent({ student }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        student_id: student.student_id,
        name: student.name,
        major: student.major,
        graduation_status: student.graduation_status,
        graduation_date: student.graduation_date || '',
        notes: student.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('students.update', student.id));
    };

    return (
        <AppShell>
            <Head title={`Edit ${student.name}`} />
            
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                {/* Header */}
                <div className="mb-8">
                    <Link href={route('students.show', student.id)}>
                        <Button variant="outline" className="mb-4">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Back to Student
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Student</h1>
                    <p className="text-gray-600">Update {student.name}'s information</p>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Student Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Student ID */}
                            <div>
                                <Label htmlFor="student_id">Student ID *</Label>
                                <Input
                                    id="student_id"
                                    type="text"
                                    value={data.student_id}
                                    onChange={(e) => setData('student_id', e.target.value)}
                                    placeholder="e.g., STU1234"
                                    className="mt-1"
                                />
                                <InputError message={errors.student_id} className="mt-2" />
                            </div>

                            {/* Name */}
                            <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter student's full name"
                                    className="mt-1"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Major */}
                            <div>
                                <Label htmlFor="major">Major/Program *</Label>
                                <Input
                                    id="major"
                                    type="text"
                                    value={data.major}
                                    onChange={(e) => setData('major', e.target.value)}
                                    placeholder="e.g., Computer Science, Business Administration"
                                    className="mt-1"
                                />
                                <InputError message={errors.major} className="mt-2" />
                            </div>

                            {/* Graduation Status */}
                            <div>
                                <Label htmlFor="graduation_status">Graduation Status *</Label>
                                <Select 
                                    value={data.graduation_status} 
                                    onValueChange={(value: 'pending' | 'graduated' | 'incomplete') => setData('graduation_status', value)}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select graduation status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="graduated">Graduated</SelectItem>
                                        <SelectItem value="incomplete">Incomplete</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.graduation_status} className="mt-2" />
                            </div>

                            {/* Graduation Date */}
                            <div>
                                <Label htmlFor="graduation_date">Graduation Date</Label>
                                <Input
                                    id="graduation_date"
                                    type="date"
                                    value={data.graduation_date}
                                    onChange={(e) => setData('graduation_date', e.target.value)}
                                    className="mt-1"
                                />
                                <p className="text-sm text-gray-600 mt-1">
                                    Leave blank for pending students
                                </p>
                                <InputError message={errors.graduation_date} className="mt-2" />
                            </div>

                            {/* Notes */}
                            <div>
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Additional notes about the student (optional)"
                                    rows={3}
                                    className="mt-1"
                                />
                                <InputError message={errors.notes} className="mt-2" />
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-4 pt-6">
                                <Button type="submit" disabled={processing} className="flex-1">
                                    <SaveIcon className="w-4 h-4 mr-2" />
                                    {processing ? 'Updating...' : 'Update Student'}
                                </Button>
                                <Link href={route('students.show', student.id)}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}