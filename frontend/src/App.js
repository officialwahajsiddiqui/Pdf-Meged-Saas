import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { 
  FileText, 
  Upload, 
  Merge, 
  Download, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

function App() {
  const [files, setFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFilename, setDownloadFilename] = useState('');

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size
    }));
    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`${acceptedFiles.length} PDF file(s) added!`);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const removeFile = (id) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    toast.success('File removed');
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      toast.error('Please select at least 2 PDF files to merge');
      return;
    }

    setIsMerging(true);
    const formData = new FormData();
    
    files.forEach((fileObj, index) => {
      formData.append('pdfs', fileObj.file);
    });

    try {
      const response = await axios.post('/api/merge', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 second timeout
      });

      if (response.data.success) {
        setDownloadUrl(response.data.downloadUrl);
        setDownloadFilename(response.data.filename);
        toast.success('PDFs merged successfully!');
      }
    } catch (error) {
      console.error('Error merging PDFs:', error);
      let errorMessage = 'Failed to merge PDFs';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsMerging(false);
    }
  };

  const downloadMergedPDF = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = `http://localhost:5000${downloadUrl}`;
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const clearAll = () => {
    setFiles([]);
    setDownloadUrl(null);
    setDownloadFilename('');
    toast.success('All files cleared');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PDF Merger SaaS</h1>
                <p className="text-sm text-gray-600">Merge multiple PDF files easily and securely</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Zap className="h-4 w-4" />
                <span>Fast</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upload PDF Files</h2>
                {files.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                  isDragActive
                    ? 'border-primary-400 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {isDragActive ? 'Drop PDF files here' : 'Drag & drop PDF files here'}
                </p>
                <p className="text-gray-600 mb-4">
                  or click to select files (max 10 files, 10MB each)
                </p>
                <button className="btn-primary">
                  Choose Files
                </button>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Selected Files ({files.length})
                  </h3>
                  <div className="space-y-3">
                    {files.map((fileObj, index) => (
                      <div
                        key={fileObj.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-primary-600" />
                          <div>
                            <p className="font-medium text-gray-900">{fileObj.name}</p>
                            <p className="text-sm text-gray-600">{formatFileSize(fileObj.size)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(fileObj.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Merge Button */}
              {files.length >= 2 && (
                <div className="mt-6">
                  <button
                    onClick={mergePDFs}
                    disabled={isMerging}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isMerging ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Merging PDFs...</span>
                      </>
                    ) : (
                      <>
                        <Merge className="h-5 w-5" />
                        <span>Merge PDFs</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Download Section */}
            {downloadUrl && (
              <div className="card bg-green-50 border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">Merge Complete!</h3>
                </div>
                <p className="text-green-700 mb-4">
                  Your PDF files have been successfully merged.
                </p>
                <button
                  onClick={downloadMergedPDF}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Merged PDF</span>
                </button>
              </div>
            )}

            {/* Features */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Secure file processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Fast merging</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span className="text-sm text-gray-700">No registration required</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">1</span>
                  <span>Upload 2 or more PDF files</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">2</span>
                  <span>Click "Merge PDFs" button</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">3</span>
                  <span>Download your merged PDF</span>
                </div>
              </div>
            </div>

            {/* Limitations */}
            <div className="card bg-yellow-50 border-yellow-200">
              <div className="flex items-center space-x-2 mb-3">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h3 className="font-semibold text-yellow-900">Limitations</h3>
              </div>
              <div className="space-y-2 text-sm text-yellow-800">
                <p>• Maximum 10 files per merge</p>
                <p>• Maximum 10MB per file</p>
                <p>• Only PDF files supported</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 PDF Merger SaaS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 