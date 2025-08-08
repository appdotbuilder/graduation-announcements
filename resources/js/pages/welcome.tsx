import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    GraduationCapIcon, 
    SearchIcon, 
    UsersIcon, 
    FileTextIcon,
    UploadIcon,
    EyeIcon,
    CheckCircleIcon,
    ClockIcon
} from 'lucide-react';

export default function Welcome() {
    const [studentId, setStudentId] = useState('');

    const handleStudentSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (studentId.trim()) {
            router.post('/search', {
                student_id: studentId.trim(),
            });
        }
    };

    const features = [
        {
            icon: <UsersIcon className="w-8 h-8 text-blue-600" />,
            title: "Student Management",
            description: "Staff can manually enter and manage student graduation data including names, IDs, majors, and status updates."
        },
        {
            icon: <UploadIcon className="w-8 h-8 text-green-600" />,
            title: "Excel Import",
            description: "Bulk import student data via Excel files for efficient data management and quick updates."
        },
        {
            icon: <EyeIcon className="w-8 h-8 text-purple-600" />,
            title: "Status Lookup",
            description: "Students can easily search and view their graduation status and relevant details anytime."
        },
        {
            icon: <FileTextIcon className="w-8 h-8 text-orange-600" />,
            title: "Detailed Records",
            description: "Comprehensive student records with graduation dates, majors, and additional notes for complete tracking."
        }
    ];

    const mockStats = [
        { label: "Total Graduates", value: "1,247", icon: <CheckCircleIcon className="w-5 h-5" />, color: "text-green-600" },
        { label: "Pending Students", value: "89", icon: <ClockIcon className="w-5 h-5" />, color: "text-yellow-600" },
        { label: "Active Programs", value: "24", icon: <GraduationCapIcon className="w-5 h-5" />, color: "text-blue-600" },
    ];

    return (
        <AppShell>
            <Head title="🎓 School Graduation Announcements" />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            🎓 School Graduation Announcements
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Celebrate achievements, track progress, and stay informed about graduation status. 
                            A comprehensive platform for students, staff, and families.
                        </p>
                    </div>

                    {/* Quick Student Search */}
                    <Card className="max-w-2xl mx-auto mb-12 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center text-2xl">
                                🔍 Check Your Graduation Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleStudentSearch} className="flex gap-4">
                                <Input
                                    type="text"
                                    placeholder="Enter your Student ID (e.g., STU1234)"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    className="flex-1 text-lg py-3"
                                />
                                <Button type="submit" size="lg" className="px-8">
                                    <SearchIcon className="w-5 h-5 mr-2" />
                                    Search
                                </Button>
                            </form>
                            <p className="text-sm text-gray-600 mt-3">
                                Students can instantly check their graduation status and view detailed information
                            </p>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/login">
                            <Button size="lg" className="px-8 py-3 text-lg">
                                <GraduationCapIcon className="w-5 h-5 mr-2" />
                                Staff Login
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                <UsersIcon className="w-5 h-5 mr-2" />
                                View All Graduates
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">📊 Graduation Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {mockStats.map((stat, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className={`flex items-center justify-center mb-4 ${stat.color}`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">✨ Key Features</h2>
                        <p className="text-xl text-gray-600">
                            Everything you need for efficient graduation management
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center mb-4">
                                        {feature.icon}
                                        <CardTitle className="ml-3 text-xl">{feature.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sample Graduation Cards */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">🎓 Recent Graduates</h2>
                        <p className="text-xl text-gray-600">
                            Celebrating our latest achievements
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {/* Sample Graduate Cards */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                                        <p className="text-sm text-gray-600">ID: STU2024</p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center">
                                        <CheckCircleIcon className="w-3 h-3 mr-1" />
                                        Graduated
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p><strong>Major:</strong> Computer Science</p>
                                    <p><strong>Graduation Date:</strong> May 15, 2024</p>
                                    <p className="text-sm text-gray-600 italic">Summa Cum Laude</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">Michael Chen</CardTitle>
                                        <p className="text-sm text-gray-600">ID: STU2023</p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center">
                                        <CheckCircleIcon className="w-3 h-3 mr-1" />
                                        Graduated
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p><strong>Major:</strong> Business Administration</p>
                                    <p><strong>Graduation Date:</strong> May 15, 2024</p>
                                    <p className="text-sm text-gray-600 italic">Dean's List</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">Emily Rodriguez</CardTitle>
                                        <p className="text-sm text-gray-600">ID: STU2025</p>
                                    </div>
                                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center">
                                        <ClockIcon className="w-3 h-3 mr-1" />
                                        Pending
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p><strong>Major:</strong> Engineering</p>
                                    <p><strong>Expected:</strong> Fall 2024</p>
                                    <p className="text-sm text-gray-600 italic">Thesis pending</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join our platform to manage graduation announcements efficiently
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                                Create Account
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600">
                                Staff Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}