
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create a Supabase client
const supabaseUrl = 'https://lyoakkonnygmglitdgjh.supabase.co'
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// API URL for the Brazilian license plate service
// Using the APIKEY approach for simplicity
const API_KEY = Deno.env.get('PLACAS_API_KEY') || ''
const API_URL = 'https://apicarros.com/v1/consulta'

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Parse request body
    const { plate } = await req.json()
    
    // Validate the input
    if (!plate || typeof plate !== 'string' || plate.length < 7) {
      return new Response(
        JSON.stringify({ error: 'Placa inválida' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Format the license plate (remove spaces and special characters)
    const formattedPlate = plate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
    
    console.log(`Checking plate: ${formattedPlate}`)
    
    // Check if we have an API key
    if (!API_KEY) {
      console.log('No API key available, returning simulated data')
      // If no API key is provided, return a simulated successful response
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            marca: "SIMULADO",
            modelo: "VEÍCULO SIMULADO",
            ano: 2020,
            placa: formattedPlate
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    // Call the external API with the license plate
    const response = await fetch(`${API_URL}/${formattedPlate}?${new URLSearchParams({
      apikey: API_KEY,
    })}`)
    
    // Check if the API call was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error(`API Error: ${response.status}`, errorData)
      
      // If the plate was not found, return a specific error
      if (response.status === 404) {
        return new Response(
          JSON.stringify({ error: 'Placa não encontrada' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 404 
          }
        )
      }
      
      // For other errors, return a generic error
      return new Response(
        JSON.stringify({ error: 'Erro ao consultar a placa' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: response.status 
        }
      )
    }
    
    // Parse the API response
    const vehicleData = await response.json()
    
    // Return the data from the API
    return new Response(
      JSON.stringify({ 
        success: true,
        data: vehicleData 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    // Log the error
    console.error('Error in check-plate function:', error)
    
    // Return an error response
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno ao processar a requisição' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
