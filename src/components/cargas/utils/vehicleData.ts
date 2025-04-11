
import { VehicleType } from '../VehicleTypeCard';

// Sample data for vehicle types
export const vehicleTypes: VehicleType[] = [
  {
    id: 1,
    name: "Moto",
    description: "Para entregas rápidas de pequenos volumes",
    capacity: "Até 20kg",
    maxDistance: "15km",
    price: "A partir de R$15",
    image: "/lovable-uploads/7b5cfcb6-0bfd-4abd-ba39-ccec9ae9e915.png"
  },
  {
    id: 2,
    name: "Carro Hatch",
    description: "Ideal para pacotes médios e documentos",
    capacity: "Até 50kg",
    maxDistance: "25km",
    price: "A partir de R$25",
    image: "/lovable-uploads/6ff72bb6-f463-4814-84e0-f8d35140a32b.png"
  },
  {
    id: 3,
    name: "Carro Sedan",
    description: "Maior capacidade para pacotes e bagagens",
    capacity: "Até 80kg",
    maxDistance: "30km",
    price: "A partir de R$30",
    image: "/lovable-uploads/522bc4a1-767c-4dc2-a971-df05a5242d45.png"
  },
  {
    id: 4,
    name: "Utilitário",
    description: "Para cargas médias e volumes maiores",
    capacity: "Até 300kg",
    maxDistance: "50km",
    price: "A partir de R$60",
    image: "/lovable-uploads/05b4b0e6-4d1e-4ab7-a689-e2e907ec89d0.png"
  },
  {
    id: 5,
    name: "Van",
    description: "Transporte de volumes grandes e mudanças",
    capacity: "Até 1 tonelada",
    maxDistance: "100km",
    price: "A partir de R$120",
    image: "/lovable-uploads/c575748d-7e2d-401f-9fb8-c4e2d6edc6a7.png"
  },
  {
    id: 6,
    name: "Carga Pequena",
    description: "Caminhonetes e veículos para cargas específicas",
    capacity: "Até 1.5 toneladas",
    maxDistance: "150km",
    price: "A partir de R$180",
    image: "/lovable-uploads/53142368-3ac2-4484-af9b-f3a27ebf711f.png"
  },
  {
    id: 7,
    name: "Guincho",
    description: "Transporte de veículos avariados",
    capacity: "1 veículo",
    maxDistance: "80km",
    price: "A partir de R$200",
    image: "/lovable-uploads/e2e92df2-d9ab-40ca-8299-f6319abe5a72.png"
  },
  {
    id: 8,
    name: "Pet",
    description: "Transporte especializado para animais",
    capacity: "Conforme o animal",
    maxDistance: "40km",
    price: "A partir de R$50",
    image: "/lovable-uploads/00dd29ce-4771-4d47-891c-d8e65c91be85.png"
  }
];

// How it works steps
export const steps = [
  {
    title: "Informe os detalhes",
    description: "Forneça os endereços de coleta e entrega, além de detalhes da carga."
  },
  {
    title: "Escolha o veículo",
    description: "Selecione o veículo ideal com base no tamanho e peso da sua carga."
  },
  {
    title: "Confirme e pague",
    description: "Revise os detalhes e faça o pagamento de forma segura."
  },
  {
    title: "Acompanhe em tempo real",
    description: "Monitore a entrega desde a coleta até o destino final."
  }
];
