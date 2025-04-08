import { FC, useRef, useState, useCallback } from 'react';
import cn from 'clsx';

import { Button, Modal } from 'shared/ui';

import styles from './UploadModal.module.css';

interface UploadModalProps {
  onUpload: (file: File) => void;
  onModalClose: () => void;
}

export const UploadModal: FC<UploadModalProps> = ({ onUpload, onModalClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleFileInputClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleUpload = useCallback(() => {
    if (selectedFile) {
      onUpload(selectedFile);
      onModalClose();
    }
  }, [selectedFile, onUpload, onModalClose]);

  return (
    <Modal title='Upload modal' onClose={onModalClose}>
      <div
        className={cn(styles.dropZone, { [styles.dragOver]: isDragOver })}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleFileInputClick}
      >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          {preview ? (
            <img src={preview} alt="Preview" className={styles.preview} />
          ) : (
            <p>Drag and drop a photo here or click to select</p>
          )}
      </div>
        <div className={styles.modalActions}>
          <Button variant='outline' className={styles.modalBtn} onClick={onModalClose}>
            Cancel
          </Button>
          <Button className={styles.modalBtn} onClick={handleUpload}>
            Upload
          </Button>
        </div>
    </Modal>
  );
};