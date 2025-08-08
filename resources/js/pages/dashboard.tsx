import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    GraduationCapIcon, 
    UsersIcon, 
    ClockIcon, 
    AlertTriangleIcon,
    PlusIcon,
    UploadIcon,
    EyeIcon,
    TrendingUpIcon
} from 'lucide-react';

export default function Dashboard() {
    // Mock data - in a real app, this would come from props
    const stats = {
        total_students: 156,
        total_graduates: 89,
        pending_students: 45,
        incomplete_students: 22,
        recent_graduations: 12,
        graduation_rate: 78.5
    };

    const recentActivity = [
        { student: "Sarah Johnson", action: "Graduated", major: "Computer Science", date: "2024-01-15" },
        { student: "Michael Chen", action: "Status Updated", major: "Business Admin", date: "2024-01-14" },
        { student: "Emily Rodriguez", action: "Added", major: "Engineering", date: "2024-01-13" },
        { student: "David Wilson", action: "Graduated", major: "Psychology", date: "2024-01-12" },
    ];

    const quickStats = [
        {
            title: "Total Students",
            value: stats.total_students,
            icon: <UsersIcon className="w-6 h-6" />,
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            title: "Graduates",
            value: stats.total_graduates,
            icon: <GraduationCapIcon className="w-6 h-6" />,
            color: "text-green-600",
            bgColor: "bg-green-100"
        },
        {
            title: "Pending",
            value: stats.pending_students,
            icon: <ClockIcon className="w-6 h-6" />,
            color: "text-yellow-600",
            bgColor: "bg-yellow-100"
        },
        {
            title: "Incomplete",
            value: stats.incomplete_students,
            icon: <AlertTriangleIcon className="w-6 h-6" />,
            color: "text-red-600",
            bgColor: "bg-red-100"
        }
    ];

    return (
        <AppShell>
            <Head title="Staff Dashboard" />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        📊 Staff Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Overview of graduation management and student progress
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link href={route('students.create')}>
                            <Button className="flex items-center">
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Add Student
                            </Button>
                        </Link>
                        <Link href={route('students.import')}>
                            <Button variant="outline" className="flex items-center">
                                <UploadIcon className="w-4 h-4 mr-2" />
                                Import Excel
                            </Button>
                        </Link>
                        <Link href={route('students.index')}>
                            <Button variant="outline" className="flex items-center">
                                <EyeIcon className="w-4 h-4 mr-2" />
                                View All Students
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline" className="flex items-center">
                                <GraduationCapIcon className="w-4 h-4 mr-2" />
                                Public View
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickStats.map((stat, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}>
                                        {stat.icon}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Graduation Rate Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <TrendingUpIcon className="w-5 h-5 mr-2 text-green-600" />
                                Graduation Rate
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-600 mb-2">
                                    {stats.graduation_rate}%
                                </div>
                                <p className="text-gray-600">
                                    {stats.total_graduates} out of {stats.total_graduates + stats.incomplete_students} eligible students
                                </p>
                                <div className="mt-4 bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-green-600 h-2 rounded-full" 
                                        style={{ width: `${stats.graduation_rate}%` }}
                                    ></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                        <div>
                                            <p className="font-medium text-gray-900">{activity.student}</p>
                                            <p className="text-sm text-gray-600">
                                                {activity.action} • {activity.major}
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(activity.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t">
                                <Link href={route('students.index')}>
                                    <Button variant="outline" size="sm" className="w-full">
                                        View All Students
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tips and Help */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>💡 Tips for Managing Graduation Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Best Practices</h4>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Update graduation status promptly after confirmation</li>
                                    <li>• Use consistent naming conventions for majors</li>
                                    <li>• Add notes for special circumstances or honors</li>
                                    <li>• Keep graduation dates accurate and up-to-date</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Excel Import Tips</h4>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Always download and use the provided template</li>
                                    <li>• Ensure student IDs are unique across all records</li>
                                    <li>• Use YYYY-MM-DD format for graduation dates</li>
                                    <li>• Test with small batches before bulk imports</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}