
import React, { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileUp, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadFieldProps {
  id: string;
  label: string;
  error?: string;
  setValue: any;
  accept?: string;
}

const FileUploadField = ({ 
  id, 
  label, 
  error, 
  setValue,
  accept = "image/*" 
}: FileUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);
  const [isPDF, setIsPDF] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(id, file);
      setFileName(file.name);
      
      // Check if file is PDF
      if (file.type === 'application/pdf') {
        setIsPDF(true);
        setPreview(null);
      } else {
        setIsPDF(false);
        // Create preview URL for images
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    setValue(id, null);
    setFileName('');
    setPreview(null);
    setIsPDF(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor={id}>{label}</Label>
      
      {(preview || isPDF) && (
        <div className="relative w-full border rounded-lg p-4 bg-gray-50">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {isPDF ? (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-8 w-8 text-blue-500" />
              <span className="truncate">{fileName}</span>
            </div>
          ) : preview && (
            <img 
              src={preview} 
              alt="Document preview" 
              className="max-h-32 object-contain mx-auto"
            />
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          className="flex-1 justify-start"
        >
          <FileUp className="mr-2 h-4 w-4" />
          {fileName || 'Selecionar arquivo'}
        </Button>
        <Input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FileUploadField;
