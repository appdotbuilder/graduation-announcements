import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, UploadIcon, DownloadIcon, FileTextIcon, CheckCircleIcon, AlertTriangleIcon } from 'lucide-react';

export default function ImportStudents() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        setUploading(true);
        
        const formData = new FormData();
        formData.append('file', file);

        try {
            router.post(route('students.import.process'), formData, {
                forceFormData: true,
                onSuccess: () => {
                    setFile(null);
                    setUploading(false);
                },
                onError: () => {
                    setUploading(false);
                }
            });
        } catch {
            setUploading(false);
        }
    };

    const downloadTemplate = () => {
        // In a real implementation, this would download an actual Excel template
        const csvContent = "student_id,name,major,graduation_status,graduation_date,notes\nSTU0001,John Doe,Computer Science,graduated,2024-05-15,Magna Cum Laude\nSTU0002,Jane Smith,Business Administration,pending,,Completing thesis";
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'student_import_template.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <AppShell>
            <Head title="Import Students" />
            
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Link href={route('students.index')}>
                        <Button variant="outline" className="mb-4">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Back to Students
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Import Students from Excel</h1>
                    <p className="text-gray-600">Bulk upload student graduation data using an Excel or CSV file</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upload Form */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <UploadIcon className="w-5 h-5 mr-2" />
                                    Upload File
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleUpload} className="space-y-6">
                                    <div>
                                        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Excel or CSV File
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                            <input
                                                type="file"
                                                id="file"
                                                accept=".xlsx,.xls,.csv"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            <label htmlFor="file" className="cursor-pointer">
                                                <FileTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-lg font-medium text-gray-600">
                                                    {file ? file.name : 'Click to select file'}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    Supports .xlsx, .xls, and .csv files
                                                </p>
                                            </label>
                                        </div>
                                    </div>

                                    <Button 
                                        type="submit" 
                                        disabled={!file || uploading} 
                                        className="w-full"
                                    >
                                        <UploadIcon className="w-4 h-4 mr-2" />
                                        {uploading ? 'Uploading...' : 'Import Students'}
                                    </Button>
                                </form>

                                <div className="mt-6 pt-6 border-t">
                                    <Button 
                                        variant="outline" 
                                        onClick={downloadTemplate}
                                        className="w-full"
                                    >
                                        <DownloadIcon className="w-4 h-4 mr-2" />
                                        Download Template
                                    </Button>
                                    <p className="text-sm text-gray-600 mt-2 text-center">
                                        Use our template to ensure proper formatting
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Instructions */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Import Instructions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                                        Required Columns
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li><strong>student_id:</strong> Unique student identifier</li>
                                        <li><strong>name:</strong> Student's full name</li>
                                        <li><strong>major:</strong> Major or program of study</li>
                                        <li><strong>graduation_status:</strong> pending, graduated, or incomplete</li>
                                        <li><strong>graduation_date:</strong> Date in YYYY-MM-DD format (optional)</li>
                                        <li><strong>notes:</strong> Additional notes (optional)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mr-2" />
                                        Important Notes
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li>• Student IDs must be unique</li>
                                        <li>• Date format should be YYYY-MM-DD (e.g., 2024-05-15)</li>
                                        <li>• Graduation status must be: pending, graduated, or incomplete</li>
                                        <li>• First row should contain column headers</li>
                                        <li>• Existing students with same ID will be updated</li>
                                    </ul>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• Download the template for proper formatting</li>
                                        <li>• Test with a small batch first</li>
                                        <li>• Review the import results carefully</li>
                                        <li>• Keep a backup of your original file</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}