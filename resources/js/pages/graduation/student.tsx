import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftIcon, GraduationCapIcon, ClockIcon, AlertTriangleIcon } from 'lucide-react';
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

export default function StudentDetail({ student }: Props) {
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

    const getStatusMessage = (status: string) => {
        switch (status) {
            case 'graduated':
                return {
                    title: '🎉 Congratulations!',
                    message: 'You have successfully graduated! Your hard work and dedication have paid off.',
                    color: 'text-green-600',
                };
            case 'pending':
                return {
                    title: '⏳ Almost There!',
                    message: 'Your graduation is pending. Please check with the academic office for any remaining requirements.',
                    color: 'text-yellow-600',
                };
            case 'incomplete':
                return {
                    title: '📋 Requirements Pending',
                    message: 'There are outstanding requirements for graduation. Please contact the academic office for details.',
                    color: 'text-red-600',
                };
            default:
                return {
                    title: 'Status Update',
                    message: 'Please check with the academic office for your current status.',
                    color: 'text-gray-600',
                };
        }
    };

    const statusInfo = getStatusMessage(student.graduation_status);

    return (
        <AppShell>
            <Head title={`Student Details - ${student.name}`} />
            
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link href="/">
                        <Button variant="outline" className="flex items-center">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Back to Graduation List
                        </Button>
                    </Link>
                </div>

                {/* Student Information Card */}
                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl mb-2">{student.name}</CardTitle>
                                <p className="text-gray-600">Student ID: {student.student_id}</p>
                            </div>
                            {getStatusBadge(student.graduation_status)}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Major</label>
                                        <p className="text-lg">{student.major}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Graduation Status</label>
                                        <div className="mt-1">
                                            {getStatusBadge(student.graduation_status)}
                                        </div>
                                    </div>
                                    {student.graduation_date && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Graduation Date</label>
                                            <p className="text-lg">{new Date(student.graduation_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                                <div className="space-y-3">
                                    {student.notes && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Notes</label>
                                            <p className="text-gray-700">{student.notes}</p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Record Created</label>
                                        <p>{new Date(student.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Last Updated</label>
                                        <p>{new Date(student.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Status Message Card */}
                <Card className={cn(
                    'border-2',
                    student.graduation_status === 'graduated' && 'border-green-200 bg-green-50',
                    student.graduation_status === 'pending' && 'border-yellow-200 bg-yellow-50',
                    student.graduation_status === 'incomplete' && 'border-red-200 bg-red-50'
                )}>
                    <CardHeader>
                        <CardTitle className={cn('text-xl', statusInfo.color)}>
                            {statusInfo.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 text-lg">{statusInfo.message}</p>
                        
                        {student.graduation_status === 'graduated' && (
                            <div className="mt-4 p-4 bg-white rounded-lg border">
                                <p className="text-center text-lg font-medium text-gray-800">
                                    🎓 Congratulations on your graduation from {student.major}! 🎓
                                </p>
                            </div>
                        )}
                        
                        {(student.graduation_status === 'pending' || student.graduation_status === 'incomplete') && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">
                                    For more information about your graduation requirements, please contact:
                                </p>
                                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                    <li>📧 Academic Office: academic@school.edu</li>
                                    <li>📞 Phone: (555) 123-4567</li>
                                    <li>🏢 Office Hours: Monday-Friday, 9:00 AM - 5:00 PM</li>
                                </ul>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}