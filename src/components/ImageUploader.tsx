import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  existingImages?: string[];
}

export default function ImageUploader({ 
  onImagesChange, 
  maxImages = 10,
  existingImages = []
}: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(existingImages);
  const [previews, setPreviews] = useState<string[]>(existingImages);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const remainingSlots = maxImages - images.length;
    const filesToProcess = acceptedFiles.slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviews((prev) => {
          const newPreviews = [...prev, result];
          return newPreviews;
        });
        setImages((prev) => {
          const newImages = [...prev, result];
          onImagesChange(newImages);
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    });
  }, [images.length, maxImages, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif']
    },
    maxFiles: maxImages - images.length,
    disabled: images.length >= maxImages
  });

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive 
              ? "border-primary bg-primary/5" 
              : "border-gray-300 dark:border-gray-600 hover:border-primary",
            images.length >= maxImages && "opacity-50 cursor-not-allowed"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {isDragActive ? (
                <p className="font-medium text-primary">Fotoğrafları buraya bırakın...</p>
              ) : (
                <>
                  <p className="font-medium">Fotoğraf yüklemek için tıklayın veya sürükleyin</p>
                  <p className="text-xs mt-1">PNG, JPG, JPEG, WEBP, GIF (Maks. {maxImages} fotoğraf)</p>
                </>
              )}
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-2">
              <ImageIcon className="h-4 w-4 mr-2" />
              Dosya Seç
            </Button>
          </div>
        </div>
      )}

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Yüklenen Fotoğraflar ({previews.length}/{maxImages})
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage(index)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Ana Fotoğraf
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Henüz fotoğraf yüklenmedi
        </p>
      )}
    </div>
  );
}