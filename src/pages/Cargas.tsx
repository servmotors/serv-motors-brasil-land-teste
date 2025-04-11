
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, MapPin, Package, Clock, ArrowRight, Calendar, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import VehicleOptions from '@/components/cargas/VehicleOptions';

const Cargas: React.FC = () => {
  const [deliveryType, setDeliveryType] = useState<'standard' | 'scheduled'>('standard');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-primary/5 to-primary/10 py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left side - Booking Form */}
              <Card className="lg:col-span-2 shadow-lg border-0">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Solicitar entrega</h2>
                  
                  <Tabs defaultValue="standard" className="mb-6">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger 
                        value="standard" 
                        onClick={() => setDeliveryType('standard')}
                      >
                        Agora
                      </TabsTrigger>
                      <TabsTrigger 
                        value="scheduled" 
                        onClick={() => setDeliveryType('scheduled')}
                      >
                        Agendada
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="standard">
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Endereço de coleta</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <MapPin size={20} className="text-primary" />
                            </div>
                            <Input 
                              placeholder="Digite o endereço de coleta" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Endereço de entrega</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <MapPin size={20} className="text-primary" />
                            </div>
                            <Input 
                              placeholder="Digite o endereço de entrega" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Descrição da carga</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <Package size={20} className="text-primary" />
                            </div>
                            <Input 
                              placeholder="Tipo e tamanho da carga" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="scheduled">
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Endereço de coleta</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <MapPin size={20} className="text-primary" />
                            </div>
                            <Input 
                              placeholder="Digite o endereço de coleta" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Endereço de entrega</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <MapPin size={20} className="text-primary" />
                            </div>
                            <Input 
                              placeholder="Digite o endereço de entrega" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Data e hora de coleta</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <Calendar size={20} className="text-primary" />
                            </div>
                            <Input 
                              type="datetime-local" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Descrição da carga</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <Package size={20} className="text-primary" />
                            </div>
                            <Input 
                              placeholder="Tipo e tamanho da carga" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 mt-4" size="lg">
                    Buscar motoristas disponíveis
                  </Button>
                </CardContent>
              </Card>
              
              {/* Right side - Map and Info */}
              <div className="lg:col-span-3">
                <div className="bg-gray-200 rounded-lg h-[400px] mb-6 flex items-center justify-center">
                  <p className="text-gray-500">Mapa de visualização</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-primary/5 border-0">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Clock className="text-primary h-8 w-8 mb-2" />
                      <h3 className="font-semibold">Rápido & Pontual</h3>
                      <p className="text-sm text-gray-600">Entregas no mesmo dia</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-primary/5 border-0">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Truck className="text-primary h-8 w-8 mb-2" />
                      <h3 className="font-semibold">Diversos Veículos</h3>
                      <p className="text-sm text-gray-600">Para qualquer tamanho de carga</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-primary/5 border-0">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Package className="text-primary h-8 w-8 mb-2" />
                      <h3 className="font-semibold">Carga Segura</h3>
                      <p className="text-sm text-gray-600">Com seguro incluso</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vehicle Types - Updated to include new vehicle types */}
        <div className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Escolha o veículo ideal para sua entrega</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {vehicleTypes.map((vehicle) => (
                <Card key={vehicle.id} className="hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <img src={vehicle.image} alt={vehicle.name} className="h-16 w-16 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
                    <p className="text-gray-600 mb-3">{vehicle.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Capacidade:</span>
                        <span className="font-medium">{vehicle.capacity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Distância máx:</span>
                        <span className="font-medium">{vehicle.maxDistance}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Preço estimado:</span>
                        <span className="font-medium text-primary">{vehicle.price}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="mt-4 w-full">
                      <span>Selecionar</span>
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* How It Works */}
        <div className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-4">Como funciona</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Enviar cargas ou pacotes com a Serv Motors é simples e rápido. Siga os passos abaixo:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
                    <p className="text-gray-600 text-center">{step.description}</p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[60%] w-[80%] border-t-2 border-dashed border-gray-300" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Business Solutions */}
        <div className="py-16 bg-white" id="empresas">
          <div className="container-custom">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Soluções para empresas</h2>
                  <p className="text-gray-600 mb-6">
                    Oferecemos planos especiais para empresas com necessidades de logística frequentes.
                    Obtenha preços personalizados, relatórios detalhados e suporte prioritário.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                        <Info size={16} className="text-white" />
                      </div>
                      <p>Preços diferenciados para alto volume de entregas</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                        <Info size={16} className="text-white" />
                      </div>
                      <p>API de integração para seu sistema</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                        <Info size={16} className="text-white" />
                      </div>
                      <p>Gerenciamento centralizado de envios</p>
                    </div>
                  </div>
                  
                  <Button className="mt-6 bg-primary hover:bg-primary/90">
                    Solicitar proposta comercial
                  </Button>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-lg transform -translate-x-4 translate-y-4"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Business solutions" 
                    className="rounded-lg shadow-lg relative z-10 w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Download App */}
        <div className="py-16 bg-primary/5" id="download">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Baixe nosso aplicativo</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Acompanhe suas entregas em tempo real, salve endereços favoritos e tenha acesso a ofertas exclusivas com nosso aplicativo.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-black hover:bg-black/90 text-white" size="lg">
                <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                  <path d="M17.0001 1.00008H7.00012C3.68642 1.00008 1.00012 3.68637 1.00012 7.00008V17.0001C1.00012 20.3138 3.68642 23.0001 7.00012 23.0001H17.0001C20.3138 23.0001 23.0001 20.3138 23.0001 17.0001V7.00008C23.0001 3.68637 20.3138 1.00008 17.0001 1.00008Z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.82733 6.72571C8.83965 6.42692 8.66879 6.13449 8.39583 5.99278C8.11345 5.84685 7.77759 5.88261 7.53492 6.07752C6.86085 6.63197 6.41016 7.41426 6.20677 8.28703C6.00337 9.15981 6.06389 10.0789 6.37854 10.9113C5.95593 11.5419 5.71623 12.2742 5.68881 13.0298L5.6887 13.0387C5.6887 14.0223 6.00399 14.9702 6.5859 15.745C7.16782 16.5198 7.98785 17.0736 8.90863 17.3154C9.82942 17.5572 10.8015 17.4715 11.665 17.0719C12.5286 16.6723 13.2325 15.9832 13.6652 15.1168L13.6682 15.1108C14.4825 13.6405 14.6035 11.878 14.0031 10.3066L14.0029 10.3061C13.7773 9.71557 13.4307 9.18295 12.9903 8.738C12.55 8.29305 12.0252 7.94636 11.446 7.72155C10.8668 7.49674 10.2441 7.3986 9.62317 7.43301C9.00222 7.46742 8.39645 7.63359 7.84689 7.91989C8.16211 7.40594 8.62738 7.00913 9.1839 6.78573C9.6962 6.57356 9.8392 6.09505 9.62704 5.58275C9.41487 5.07046 8.93636 4.92745 8.42406 5.13962C7.52317 5.49784 6.76003 6.15094 6.26233 7.00008C6.84562 6.37396 7.59853 5.95217 8.42406 5.79014C8.65634 5.74448 8.81501 5.55725 8.8274 5.32248V5.32145C8.8274 5.05372 8.64405 4.82407 8.38235 4.77267C8.12064 4.72127 7.85324 4.82988 7.72021 5.05789C7.16885 6.00424 7.00012 7.14639 7.28198 8.21663C7.0049 8.38864 6.74603 8.58982 6.51012 8.81873C5.93151 9.38043 5.48001 10.0651 5.1908 10.8284C4.90158 11.5916 4.78216 12.414 4.84205 13.2339C4.90193 14.0538 5.1397 14.85 5.54152 15.5667C5.94334 16.2835 6.50022 16.9014 7.17111 17.3745C7.84201 17.8476 8.61069 18.1639 9.42009 18.3008C10.2295 18.4377 11.0599 18.392 11.8513 18.1664C12.6427 17.9408 13.3753 17.5409 13.998 16.9948C14.6207 16.4487 15.1196 15.7699 15.4626 15.0036C15.8055 14.2374 15.9844 13.4028 15.9867 12.5573C15.9867 12.5537 15.9867 12.5501 15.9867 12.5465C15.994 11.5856 15.7117 10.6422 15.1734 9.83571C14.635 9.0292 13.8617 8.3932 12.953 8.0121C12.0444 7.631 11.0411 7.52267 10.0698 7.70189C9.09839 7.88111 8.20322 8.33931 7.50482 9.01992C7.39066 9.13061 7.33346 9.28723 7.34831 9.44624C7.36316 9.60525 7.44822 9.74792 7.57904 9.834C7.70987 9.92007 7.87129 9.9423 8.01843 9.89427C8.16557 9.84624 8.28479 9.73269 8.34362 9.58543C8.7872 8.80705 9.4643 8.19538 10.2724 7.84536C11.0804 7.49534 11.9773 7.42784 12.8277 7.65262C13.678 7.8774 14.4367 8.38369 14.9846 9.09275C15.5326 9.80181 15.8418 10.6775 15.8656 11.5888C15.8662 11.6004 15.8665 11.612 15.8667 11.6236C15.8666 12.3156 15.7082 12.9979 15.4025 13.6223C15.0969 14.2467 14.6516 14.7972 14.0959 15.232C13.5403 15.6669 12.8889 15.9751 12.1945 16.1329C11.5 16.2907 10.7809 16.2943 10.0845 16.1433C9.38808 15.9924 8.73281 15.6907 8.17174 15.2613C7.61066 14.8318 7.15866 14.2854 6.84538 13.6638C6.5321 13.0421 6.3657 12.3612 6.35749 11.6694C6.34928 10.9776 6.49949 10.2927 6.80072 9.6636C6.94501 9.38282 6.86081 9.04099 6.61273 8.8553C6.36465 8.66961 6.02028 8.67801 5.78087 8.87426C5.44644 9.15676 5.17265 9.50213 4.97415 9.88905C5.17807 9.21491 5.56126 8.59883 6.09 8.10208C6.24787 7.95816 6.31601 7.73933 6.27214 7.52938C6.22827 7.31942 6.0794 7.14761 5.87798 7.07913C5.67655 7.01065 5.45439 7.05555 5.29443 7.19695C4.99992 7.47068 4.74466 7.78615 4.5367 8.13415C4.32874 8.48216 4.17049 8.85854 4.06689 9.25236C3.96328 9.64617 3.91549 10.0532 3.92522 10.4609C3.93494 10.8686 4.00208 11.2728 4.12464 11.6609C4.04325 12.0447 4.00177 12.436 4.00104 12.8284C4.00104 15.3402 5.94085 17.4048 8.36805 17.6376C10.6535 17.8544 12.7344 16.2919 13.4887 14.0825C13.4892 14.0812 13.4898 14.0798 13.4903 14.0785C13.9123 13.0279 13.9877 11.858 13.7069 10.7599C13.426 9.66183 12.8048 8.69349 11.9398 8.00744C11.0748 7.3214 10.0116 6.95653 8.93624 6.97324C8.85713 6.97359 8.78463 7.00713 8.7345 7.06515C8.68436 7.12317 8.6613 7.2012 8.67081 7.27995L8.67081 7.28002C8.67081 7.28115 8.67083 7.28227 8.67087 7.2834C8.69213 7.88393 8.55332 8.4797 8.27177 9.00626C8.20557 8.76058 8.14025 8.51456 8.07579 8.26824C7.91304 7.63671 7.7499 7.00421 7.74897 6.73088L7.74869 6.72577L7.74869 6.72577C8.74989 6.7263 9.71751 7.07936 10.4759 7.7126C10.6033 7.82215 10.7742 7.86461 10.9377 7.82842C11.1012 7.79222 11.2398 7.68111 11.3127 7.52614C11.3856 7.37118 11.3851 7.19061 11.3113 7.03604C11.2376 6.88147 11.0984 6.77102 10.9346 6.73563C10.2353 6.5853 9.51046 6.64151 8.83978 6.89765C8.83462 6.8485 8.83014 6.79918 8.82736 6.75005L8.82733 6.72571Z" fill="white" />
                </svg>
                App Store
              </Button>
              <Button className="bg-black hover:bg-black/90 text-white" size="lg">
                <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                  <path d="M17.9 5c.1 0 .2 0 .3.1.2.1.3.2.4.4.1.2 0 .4-.1.6l-.3.3c-.5.5-1.2.5-1.7 0-.2-.2-.3-.5-.3-.8 0-.3.1-.6.3-.8.1-.1.2-.2.4-.2.2-.1.3-.1.5-.1.2 0 .3 0 .5.1zm-6.5.8c.7-.5 1.6-.5 2.3.1.4.4.7.9.7 1.5v7.8c0 .6-.3 1.1-.7 1.4-.6.5-1.5.5-2.1 0-.3-.2-.4-.4-.4-.7-.5.6-1.2.9-1.9.9-.7 0-1.3-.2-1.8-.7-.5-.5-.8-1.1-.8-1.8v-.1c0-.8.3-1.5.9-2 .6-.5 1.5-.8 2.7-.8h.9V9.8c0-.4-.1-.7-.3-.9-.2-.2-.5-.3-.9-.3s-.7.1-.9.3c-.2.2-.3.5-.3.9v3.5c0 .4.1.7.3.9.2.2.5.3.8.3.4 0 .7-.1.9-.3.2-.2.3-.5.3-.9V9.8c0-.4-.1-.7-.3-.9-.2-.2-.5-.3-.9-.3s-.7.1-.9.3c-.2.2-.3.5-.3.9v6.7c0 .3.1.6.3.8.2.2.5.3.8.3.4 0 .7-.1.9-.3.2-.2.3-.5.3-.8V6.4h.2zm-3.3 8.6c0 .3.1.6.4.8.2.2.5.3.8.3.3 0 .6-.1.8-.3.2-.2.4-.5.4-.8v-3.8h-.9c-.8 0-1.4.2-1.7.5-.3.3-.5.7-.5 1.3v.1c0 .6.2 1.2.7 1.9zm11-5.6l-1.2 4.8c-.1.4-.2.7-.4.9-.3.2-.6.3-1 .3s-.7-.1-1-.3c-.2-.2-.3-.5-.4-.9l-1.2-4.8c0-.1-.1-.2-.1-.3 0-.1 0-.3.1-.4.1-.1.2-.2.3-.2.1 0 .2-.1.3-.1.1 0 .2 0 .4.1.1.1.2.2.3.3v.2l1 4.2 1-4.2c0-.1.1-.2.1-.3.1-.1.2-.2.3-.2.1-.1.2-.1.4-.1s.3 0 .4.1c.1.1.2.2.3.2.1.1.1.2.1.3 0 .1 0 .3-.1.4s-.1.2-.2.3zm-17.4.9c.4 0 .7-.1.9-.3.2-.2.3-.5.3-.9V5.9c0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.5-.2.7-.2.3 0 .5.1.7.2.2.1.4.2.5.4.2.2.2.4.2.6v1.7c0 .4.1.7.3.9.2.2.5.3.8.3s.6-.1.8-.3c.2-.2.3-.5.3-.9V5.9c0-.6-.2-1.2-.5-1.7-.3-.5-.8-.9-1.3-1.2-.6-.3-1.2-.4-1.8-.4-.7 0-1.3.1-1.8.4-.6.3-1 .7-1.3 1.2-.3.5-.5 1.1-.5 1.7v1.7c0 .4.1.7.3.9.2.2.5.3.8.3zm20.1-1.2c0 .4.1.7.3.9.2.2.5.3.8.3.4 0 .7-.1.9-.3.2-.2.3-.5.3-.9V4.7c0-.4-.1-.7-.3-.9-.2-.2-.5-.3-.9-.3-.3 0-.6.1-.8.3-.2.2-.3.5-.3.9v3.8zm.3 5.3c.3.3.7.4 1.1.4.3 0 .5-.1.7-.2.2-.1.4-.2.6-.4.3-.3.6-.8.9-1.3l2.1-4.5c.1-.2.1-.4.1-.5s-.1-.3-.2-.4c-.1-.1-.2-.2-.4-.3-.1-.1-.3-.1-.4-.1s-.3 0-.4.1c-.1.1-.2.2-.4.3-.1.1-.2.3-.3.4l-1.6 3.5-1.6-3.5c-.1-.2-.1-.3-.3-.4-.1-.1-.2-.2-.4-.3-.1-.1-.3-.1-.4-.1s-.3 0-.4.1-.3.2-.4.3c-.1.1-.2.3-.2.4s0 .3.1.5l2 4.2v.1c0 .4.1.7.4 1z" />
                </svg>
                Google Play
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Sample data for vehicle types - Updated to include Carro sedan, Carga Pequena, Guincho, and Pet
const vehicleTypes = [
  {
    id: 1,
    name: "Moto",
    description: "Para entregas rápidas de pequenos volumes",
    capacity: "Até 5kg",
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
const steps = [
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

export default Cargas;
