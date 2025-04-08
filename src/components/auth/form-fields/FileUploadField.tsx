
import React, { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileUp } from 'lucide-react';
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(id, file);
      setFileName(file.name);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
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
