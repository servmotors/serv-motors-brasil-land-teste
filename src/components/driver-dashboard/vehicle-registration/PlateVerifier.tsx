
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Loader2, CheckCircle2 } from 'lucide-react';
import { Control, FieldValues, Path, PathValue } from 'react-hook-form';

interface PlateVerifierProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  isVerifyingPlate: boolean;
  plateVerified: boolean;
  plateVerificationError: string | null;
  onVerifyPlate: () => Promise<void>;
  watchedPlate: string;
}

export function PlateVerifier<T extends FieldValues>({
  control,
  name,
  isVerifyingPlate,
  plateVerified,
  plateVerificationError,
  onVerifyPlate,
  watchedPlate
}: PlateVerifierProps<T>) {
  return (
    <FormItem>
      <FormLabel>Placa</FormLabel>
      <div className="flex space-x-2">
        <FormControl>
          <Input 
            placeholder="Ex: ABC1234" 
            className={plateVerified ? "border-green-500" : ""}
            onChange={(e) => {
              // We'll handle this in the parent component
            }}
          />
        </FormControl>
        <Button 
          type="button" 
          variant="outline"
          disabled={isVerifyingPlate || !watchedPlate || watchedPlate.length < 7}
          onClick={onVerifyPlate}
        >
          {isVerifyingPlate ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>
      <FormDescription>
        Formato: ABC1234 ou ABC1D23 (Mercosul)
      </FormDescription>
      <FormMessage />
      {plateVerificationError && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>
            {plateVerificationError}
          </AlertDescription>
        </Alert>
      )}
      {plateVerified && (
        <Alert className="mt-2 bg-green-50 text-green-700 border-green-200">
          <AlertDescription className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            Placa verificada com sucesso.
          </AlertDescription>
        </Alert>
      )}
    </FormItem>
  );
}
