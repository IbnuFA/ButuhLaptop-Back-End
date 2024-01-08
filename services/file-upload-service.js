import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage, getDownloadURL  } from 'firebase-admin/storage';

import serviceCert from '../butuh-laptop-firebase-adminsdk-o7lcc-d59cbc93c6.json' assert { type: "json" };;


import multer from "multer";
const upload = multer({ dest: 'uploads/' });

import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdef', 10)

export const firebaseApp = initializeApp({
  credential: cert(serviceCert),
  storageBucket: 'gs://butuh-laptop.appspot.com'
});

export const storage = getStorage();


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
export async function uploadFile(file, folderName = 'other') {
    const fileExtension = file.originalname.split('.').slice(-1)
    const filePath = `${folderName}/${nanoid()}.${fileExtension}`;

    const fileRef = storage.bucket().file(filePath);

    await fileRef.save(file.buffer);

    const url = await getDownloadURL(fileRef);
    return url;
}
