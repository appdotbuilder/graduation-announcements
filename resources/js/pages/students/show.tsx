import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftIcon, EditIcon, TrashIcon, GraduationCapIcon, ClockIcon, AlertTriangleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Student {
    id: number;
    student_id: string;
    name: string;
    major: string;
    graduation_status: 'pending' | 'graduated' | 'incomplete';
    graduation_date: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    student: Student;
    [key: string]: unknown;
}

export default function ShowStudent({ student }: Props) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${student.name}? This action cannot be undone.`)) {
            router.delete(route('students.destroy', student.id));
        }
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            graduated: 'bg-green-100 text-green-800 border-green-200',
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            incomplete: 'bg-red-100 text-red-800 border-red-200',
        };

        const icons = {
            graduated: <GraduationCapIcon className="w-4 h-4 mr-1" />,
            pending: <ClockIcon className="w-4 h-4 mr-1" />,
            incomplete: <AlertTriangleIcon className="w-4 h-4 mr-1" />,
        };

        return (
            <Badge className={cn('flex items-center', variants[status as keyof typeof variants])}>
                {icons[status as keyof typeof icons]}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    return (
        <AppShell>
            <Head title={`${student.name} - Student Details`} />
            
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Link href={route('students.index')}>
                        <Button variant="outline" className="mb-4">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Back to Students
                        </Button>
                    </Link>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
                            <p className="text-gray-600">Student ID: {student.student_id}</p>
                        </div>
                        <div className="flex gap-2 mt-4 sm:mt-0">
                            <Link href={route('students.edit', student.id)}>
                                <Button>
                                    <EditIcon className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                variant="destructive" 
                                onClick={handleDelete}
                            >
                                <TrashIcon className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Student Information */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Student Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Student ID</label>
                                        <p className="text-lg font-medium text-gray-900">{student.student_id}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                                        <p className="text-lg font-medium text-gray-900">{student.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Major/Program</label>
                                        <p className="text-lg text-gray-900">{student.major}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Graduation Status</label>
                                        <div className="mt-1">
                                            {getStatusBadge(student.graduation_status)}
                                        </div>
                                    </div>
                                </div>

                                {student.graduation_date && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Graduation Date</label>
                                        <p className="text-lg text-gray-900">
                                            {new Date(student.graduation_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                )}

                                {student.notes && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Notes</label>
                                        <p className="text-gray-700 whitespace-pre-wrap">{student.notes}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Status Summary */}
                    <div>
                        <Card className={cn(
                            'border-2',
                            student.graduation_status === 'graduated' && 'border-green-200 bg-green-50',
                            student.graduation_status === 'pending' && 'border-yellow-200 bg-yellow-50',
                            student.graduation_status === 'incomplete' && 'border-red-200 bg-red-50'
                        )}>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    Status Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    {getStatusBadge(student.graduation_status)}
                                </div>

                                {student.graduation_status === 'graduated' && (
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🎓</div>
                                        <p className="text-green-700 font-medium">
                                            Congratulations! This student has successfully graduated.
                                        </p>
                                    </div>
                                )}

                                {student.graduation_status === 'pending' && (
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">⏳</div>
                                        <p className="text-yellow-700 font-medium">
                                            Graduation is pending. Please review requirements.
                                        </p>
                                    </div>
                                )}

                                {student.graduation_status === 'incomplete' && (
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">📋</div>
                                        <p className="text-red-700 font-medium">
                                            Outstanding requirements need to be completed.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Record Information */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Record Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Created</label>
                                    <p className="text-sm text-gray-900">
                                        {new Date(student.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                                    <p className="text-sm text-gray-900">
                                        {new Date(student.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}