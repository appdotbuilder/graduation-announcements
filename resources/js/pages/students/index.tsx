import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
    PlusIcon, 
    SearchIcon, 
    EditIcon, 
    EyeIcon, 
    TrashIcon,
    GraduationCapIcon, 
    ClockIcon, 
    AlertTriangleIcon,
    UploadIcon
} from 'lucide-react';
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
    students: {
        data: Student[];
        links: Array<{url: string | null, label: string, active: boolean}>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        status?: string;
        search?: string;
    };
    [key: string]: unknown;
}

export default function StudentsIndex({ students, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const handleSearch = () => {
        router.get(route('students.index'), {
            search: searchTerm,
            status: statusFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (student: Student) => {
        if (confirm(`Are you sure you want to delete ${student.name}?`)) {
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
            graduated: <GraduationCapIcon className="w-3 h-3 mr-1" />,
            pending: <ClockIcon className="w-3 h-3 mr-1" />,
            incomplete: <AlertTriangleIcon className="w-3 h-3 mr-1" />,
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
            <Head title="Student Management" />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Management</h1>
                        <p className="text-gray-600">Manage graduation data for all students</p>
                    </div>
                    <div className="flex gap-2 mt-4 sm:mt-0">
                        <Link href={route('students.import')}>
                            <Button variant="outline">
                                <UploadIcon className="w-4 h-4 mr-2" />
                                Import Excel
                            </Button>
                        </Link>
                        <Link href={route('students.create')}>
                            <Button>
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add Student
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                                type="text"
                                placeholder="Search by name, student ID, or major..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                className="flex-1"
                            />
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="All statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Statuses</SelectItem>
                                    <SelectItem value="graduated">Graduated</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="incomplete">Incomplete</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={handleSearch}>
                                <SearchIcon className="w-4 h-4 mr-2" />
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Results Count */}
                <div className="mb-4">
                    <p className="text-gray-600">
                        Showing {students.data.length} of {students.total} students
                    </p>
                </div>

                {/* Students Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="text-left p-4 font-medium text-gray-900">Student</th>
                                        <th className="text-left p-4 font-medium text-gray-900">Major</th>
                                        <th className="text-left p-4 font-medium text-gray-900">Status</th>
                                        <th className="text-left p-4 font-medium text-gray-900">Graduation Date</th>
                                        <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.data.map((student) => (
                                        <tr key={student.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">{student.name}</div>
                                                    <div className="text-sm text-gray-600">ID: {student.student_id}</div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-gray-900">{student.major}</div>
                                            </td>
                                            <td className="p-4">
                                                {getStatusBadge(student.graduation_status)}
                                            </td>
                                            <td className="p-4">
                                                <div className="text-gray-900">
                                                    {student.graduation_date 
                                                        ? new Date(student.graduation_date).toLocaleDateString()
                                                        : '-'
                                                    }
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <Link href={route('students.show', student.id)}>
                                                        <Button size="sm" variant="ghost">
                                                            <EyeIcon className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('students.edit', student.id)}>
                                                        <Button size="sm" variant="ghost">
                                                            <EditIcon className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        size="sm" 
                                                        variant="ghost"
                                                        onClick={() => handleDelete(student)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {students.data.length === 0 && (
                            <div className="text-center py-12">
                                <GraduationCapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                                <p className="text-gray-600 mb-4">
                                    {filters.search || filters.status 
                                        ? 'Try adjusting your search criteria.' 
                                        : 'Get started by adding your first student.'
                                    }
                                </p>
                                <Link href={route('students.create')}>
                                    <Button>
                                        <PlusIcon className="w-4 h-4 mr-2" />
                                        Add First Student
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {students.last_page > 1 && (
                    <div className="mt-6 flex justify-center items-center space-x-2">
                        {students.links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}