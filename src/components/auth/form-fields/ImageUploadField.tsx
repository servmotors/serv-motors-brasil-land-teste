
import React, { useState } from 'react';
import { Camera, Upload, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ImageUploadFieldProps {
  id: string;
  label: string;
  setValue: any;
  error?: string;
}

const ImageUploadField = ({ id, label, setValue, error }: ImageUploadFieldProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setValue(id, file, { shouldValidate: true });
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          {previewUrl ? (
            <AvatarImage src={previewUrl} alt="Preview" />
          ) : (
            <AvatarFallback className="bg-gray-200">
              <Camera className="h-8 w-8 text-gray-400" />
            </AvatarFallback>
          )}
        </Avatar>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full max-w-[250px]"
          onClick={() => document.getElementById(id)?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Carregar foto
        </Button>
        <input
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      
      {error && (
        <div className="flex items-center text-sm text-red-500 space-x-2">
          <AlertCircle className="h-4 w-4" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
