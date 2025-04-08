
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { AuthResponse } from '@supabase/supabase-js';

// Type definition for Supabase drivers table insert
type DriversInsert = Database['public']['Tables']['drivers']['Insert'];

const TEST_CREDENTIALS = {
  email: 'motorista.teste@gmail.com',
  password: 'teste123',
  fullName: 'Motorista Teste',
  phone: '11999998888',
  cpf: '12345678901',
  cnh: '123456789',
  cnhCategory: 'B',
  hasEar: true
};

export const checkIfTestDriverExists = async (): Promise<boolean> => {
  console.log("Verificando se o motorista de teste existe");
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', TEST_CREDENTIALS.email)
    .single();
  
  return !!existingUser;
};

export const createTestDriver = async (signUp: (email: string, password: string, userData: any) => Promise<AuthResponse>) => {
  try {
    console.log("Iniciando criação do motorista de teste");
    
    // Criar conta no Supabase Auth
    console.log("Criando conta de autenticação");
    const authResult = await signUp(TEST_CREDENTIALS.email, TEST_CREDENTIALS.password, {
      fullName: TEST_CREDENTIALS.fullName,
      userType: 'driver'
    });
    
    if (authResult.error) {
      console.error("Erro ao criar autenticação:", authResult.error);
      throw new Error(authResult.error.message);
    }
    
    // Aguardar um momento para garantir que o trigger tenha tempo de criar o perfil
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (authResult.user) {
      console.log("Criando perfil de motorista");
      // Criar perfil de motorista
      const driverData: DriversInsert = {
        user_id: authResult.user.id,
        full_name: TEST_CREDENTIALS.fullName,
        phone: TEST_CREDENTIALS.phone,
        cpf: TEST_CREDENTIALS.cpf,
        cnh: TEST_CREDENTIALS.cnh,
        cnh_category: TEST_CREDENTIALS.cnhCategory,
        has_ear: TEST_CREDENTIALS.hasEar,
        is_approved: true  // Motorista de teste já aprovado
      };

      const { error: driverError } = await supabase
        .from('drivers')
        .insert(driverData);

      if (driverError) {
        console.error("Erro ao criar perfil de motorista:", driverError);
        throw new Error(driverError.message);
      }

      return true;
    }
    
    return false;
  } catch (error: any) {
    console.error("Erro na criação do motorista de teste:", error);
    throw error;
  }
};

export const loginWithTestDriver = async (signIn: (email: string, password: string) => Promise<any>) => {
  return await signIn(TEST_CREDENTIALS.email, TEST_CREDENTIALS.password);
};
