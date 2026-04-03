import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const ImageUpload = ({ onUploadSuccess, currentImage }) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        setUploading(true);
        uploadTask.on('state_changed', 
            (snapshot) => {
                const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(Math.round(p));
            }, 
            (error) => {
                console.error("Upload failed", error);
                setUploading(false);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    onUploadSuccess(downloadURL);
                    setUploading(false);
                    setProgress(0);
                });
            }
        );
    };

    return (
        <div className="image-upload-container" style={{ marginTop: '10px' }}>
            {currentImage && (
                <div style={{ marginBottom: '10px' }}>
                    <img src={currentImage} alt="Preview" style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    accept="image/*"
                    style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}
                />
                {uploading && <span style={{ fontSize: '0.8rem', color: '#a855f7' }}>Uploading {progress}%</span>}
            </div>
        </div>
    );
};

export default ImageUpload;
