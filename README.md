# PDF Merger SaaS

A modern, full-stack SaaS application for merging multiple PDF files with a beautiful React frontend and robust Node.js backend.

## 🚀 Features

- **PDF Merging**: Merge multiple PDF files into a single document
- **Drag & Drop**: Intuitive file upload with drag and drop support
- **Modern UI**: Beautiful React frontend with Tailwind CSS
- **Secure**: File validation and secure processing
- **Fast**: Optimized PDF processing with pdf-lib
- **Responsive**: Works perfectly on desktop and mobile devices
- **No Registration**: Use immediately without any signup required

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **pdf-lib** - PDF manipulation library
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

### Frontend
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Dropzone** - File upload component
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/officialwahajsiddiqui/Pdf-Meged-Saas.git
   cd pdf-merger-saas
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   npm run install-frontend
   ```

3. **Start the development servers**
   ```bash
   # Start backend server (in one terminal)
   npm run dev
   
   # Start frontend server (in another terminal)
   cd frontend
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🚀 Production Deployment

### Build the application
```bash
# Install all dependencies
npm run install-all

# Build the frontend
npm run build

# Start production server
npm start
```

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=production
```

## 📖 Usage

1. **Upload PDF Files**
   - Drag and drop PDF files onto the upload area
   - Or click "Choose Files" to select files manually
   - Maximum 10 files, 10MB each

2. **Merge PDFs**
   - Select at least 2 PDF files
   - Click "Merge PDFs" button
   - Wait for processing to complete

3. **Download Result**
   - Once merging is complete, click "Download Merged PDF"
   - The merged file will be automatically downloaded

## 🔧 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and health information.

### Merge PDFs
```
POST /api/merge
Content-Type: multipart/form-data
```
Upload multiple PDF files for merging.

**Request Body:**
- `pdfs`: Array of PDF files (max 10 files, 10MB each)

**Response:**
```json
{
  "success": true,
  "message": "PDFs merged successfully!",
  "downloadUrl": "/api/download/merged-1234567890.pdf",
  "filename": "merged-1234567890.pdf"
}
```

### Download Merged PDF
```
GET /api/download/:filename
```
Download the merged PDF file.

## 🛡️ Security Features

- **File Validation**: Only PDF files are accepted
- **File Size Limits**: Maximum 10MB per file
- **File Count Limits**: Maximum 10 files per merge
- **Secure Headers**: Helmet.js for security headers
- **CORS Protection**: Configured for cross-origin requests
- **Error Handling**: Comprehensive error handling and validation

## 📁 Project Structure

```
pdf-merger-saas/
├── server.js                 # Main backend server
├── package.json              # Backend dependencies
├── uploads/                  # Temporary file storage
├── frontend/                 # React frontend
│   ├── public/              # Static files
│   ├── src/                 # React source code
│   │   ├── App.js          # Main React component
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Tailwind CSS styles
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind configuration
└── README.md               # This file
```

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by modifying:
- `frontend/src/index.css` - Custom CSS classes
- `frontend/tailwind.config.js` - Tailwind configuration
- `frontend/src/App.js` - Component styling

### Backend Configuration
Modify `server.js` to:
- Change file size limits
- Adjust maximum file count
- Add authentication
- Implement rate limiting

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change port in server.js or set PORT environment variable
   PORT=5001 npm start
   ```

2. **File upload errors**
   - Ensure files are valid PDFs
   - Check file size limits (10MB)
   - Verify file count (max 10 files)

3. **CORS errors**
   - Backend CORS is configured for development
   - For production, update CORS settings in `server.js`

### Development Tips

- Use `npm run dev` for backend development with auto-restart
- Frontend runs on port 3000 with hot reload
- Backend API runs on port 5000
- Check browser console and server logs for errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [pdf-lib](https://github.com/Hopding/pdf-lib) - PDF manipulation library
- [React Dropzone](https://react-dropzone.js.org/) - File upload component
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library 
