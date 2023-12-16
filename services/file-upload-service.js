import multer from "multer";
const upload = multer({ dest: 'uploads/' });


// Function to validate file
export async function validateFile(file, options) {
    if (!file) throw new Error("No file uploaded");
    if (!options.allowedMimeTypes.includes(file.mimetype)) {
      throw new ValidationError("Invalid file format");
    }
    if (file.size > options.maxSize) {
      throw new ValidationError("File size too large");
    }
}
  
// Function to upload file
export  async function uploadFile(file) {
    // Implement your upload logic here (e.g., using a storage library)
    // ...
    return filename; // Replace with actual filename from upload logic
}