'use client'

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon, User } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface AddImageProps {
  onImageChange: (file: File | null) => void;
  selectedImage?: File | null;
  currentImageUrl?: string | null;
  label?: string;
  placeholder?: string;
  className?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp'
];

const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

export default function AddImage({
  onImageChange,
  selectedImage,
  currentImageUrl,
  label = "Profile Image",
  placeholder = "Click to upload image",
  className = ""
}: AddImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
    }

    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `File type not supported. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`;
    }

    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setError(null);

    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        toast.error("Invalid image", {
          description: validationError,
        });
        onImageChange(null);
        setPreviewUrl(null);
        // Reset input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageChange(file);

      toast.success("Image selected", {
        description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
      });
    } else {
      onImageChange(null);
      setPreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    setError(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success("Image removed");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Determine which image to show
  const displayImage = previewUrl || currentImageUrl;
  const hasImage = displayImage || selectedImage;

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="flex items-center gap-4">
        {/* Image Preview */}
        <div className="relative">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-gradient-to-br from-[#0d3ad7] to-[#99e4ff] flex items-center justify-center border-2 border-border">
            {hasImage ? (
              <>
                {displayImage && (
                  <Image
                    src={displayImage}
                    alt="Preview"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                )}
                {selectedImage && !displayImage && (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                {/* Remove button */}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <X className="w-3 h-3" />
                </Button>
              </>
            ) : (
              <User className="w-8 h-8 text-white" />
            )}
          </div>
        </div>

        {/* Upload Button */}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_EXTENSIONS.join(',')}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload image"
          >
            <Upload className="w-4 h-4" />
            {hasImage ? "Change Image" : placeholder}
          </Button>
          <p className="text-xs text-muted-foreground mt-1">
            Max size: 5MB • Allowed: PNG, JPG, JPEG, WEBP
          </p>
        </div>
      </div>

      {/* File Info */}
      {selectedImage && (
        <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-4 h-4 text-green-500" />
            <div className="flex flex-col">
              <span className="text-sm font-medium truncate max-w-[200px]">
                {selectedImage.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatFileSize(selectedImage.size)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}






