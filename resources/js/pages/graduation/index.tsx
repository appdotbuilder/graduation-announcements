import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchIcon, GraduationCapIcon, UsersIcon, ClockIcon, AlertTriangleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    stats: {
        total_graduates: number;
        pending_students: number;
        incomplete_students: number;
    };
    [key: string]: unknown;
}

export default function GraduationIndex({ students, filters, stats }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'graduated');
    const [studentIdSearch, setStudentIdSearch] = useState('');

    const handleSearch = () => {
        router.get('/', {
            search: searchTerm,
            status: statusFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleStudentSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (studentIdSearch.trim()) {
            router.post('/search', {
                student_id: studentIdSearch.trim(),
            });
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
            <Head title="🎓 Graduation Announcements" />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                        🎓 School Graduation Announcements
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Celebrate our graduates and check graduation status
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Graduates</CardTitle>
                            <GraduationCapIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.total_graduates}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Students</CardTitle>
                            <ClockIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.pending_students}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Incomplete</CardTitle>
                            <AlertTriangleIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.incomplete_students}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Student ID Search */}
                <Card className="mb-8 bg-blue-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                            🔍 Quick Student Lookup
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleStudentSearch} className="flex gap-4">
                            <Input
                                type="text"
                                placeholder="Enter Student ID (e.g., STU1234)"
                                value={studentIdSearch}
                                onChange={(e) => setStudentIdSearch(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="submit">
                                <SearchIcon className="w-4 h-4 mr-2" />
                                Find Student
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Filters */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            type="text"
                            placeholder="Search by name, student ID, or major..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
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

                {/* Results */}
                <div className="mb-4">
                    <p className="text-gray-600">
                        Showing {students.data.length} of {students.total} students
                    </p>
                </div>

                {/* Students Grid */}
                {students.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {students.data.map((student) => (
                            <Card key={student.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{student.name}</CardTitle>
                                            <p className="text-sm text-gray-600">ID: {student.student_id}</p>
                                        </div>
                                        {getStatusBadge(student.graduation_status)}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p><strong>Major:</strong> {student.major}</p>
                                        {student.graduation_date && (
                                            <p><strong>Graduation Date:</strong> {new Date(student.graduation_date).toLocaleDateString()}</p>
                                        )}
                                        {student.notes && (
                                            <p className="text-sm text-gray-600 italic">{student.notes}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-12">
                        <CardContent>
                            <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                            <p className="text-gray-600">
                                Try adjusting your search criteria or filter settings.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {students.last_page > 1 && (
                    <div className="flex justify-center items-center space-x-2">
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