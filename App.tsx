import React, { useState, useMemo, useEffect } from 'react';
import type { FormData } from './types';
import Logo from './components/Logo';

const TOTAL_STEPS = 10;

const initialFormData: FormData = {
  presentadoPara: 'Technology Surfers',
  sesionDia: '15',
  sesionMes: 'Oct',
  sesionAnio: '2025',
  facilitador: 'Adrian Gomez',
  nombreCommit: '',
  futuroImparable: Array(7).fill(''),
  queVendes: { principal: '', notas: '' },
  clienteIdeal: '',
  leadMagnet: { tipo: '', regalo: '', titulo: '', cta: '' },
  optInPage: { titulo: '', subtitulo: '', beneficio1: '', beneficio2: '', beneficio3: '' },
  emailSwell: { bienvenida: '', prueba: '', invitacion: '' },
  sistemaEntrega: '',
  declaracionSolucion: { quien: '', que: '', como: '', resultado: '' },
};

// --- Reusable UI Components ---

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}
const Input: React.FC<InputProps> = ({ label, description, ...props }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {description && <p className="text-xs text-gray-500 mb-1">{description}</p>}
    <input
      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
      {...props}
    />
  </div>
);

const InlineInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        className="inline-block w-64 mx-1 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm align-baseline"
        {...props}
    />
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string;
}
const Textarea: React.FC<TextareaProps> = ({ label, description, ...props }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
    <textarea
      rows={5}
      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
      {...props}
    />
  </div>
);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400"
    {...props}
  />
);

const StepContainer: React.FC<{ title: string; subtitle: string; children: React.ReactNode }> = ({ title, subtitle, children }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-gray-600">{subtitle}</p>
        <div className="mt-8 space-y-6">
            {children}
        </div>
    </div>
);


// --- Step Components ---

type StepProps = {
  data: FormData;
  updateField: (field: Partial<FormData>) => void;
};

const InfoSection: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4">
        <span className="text-2xl pt-1">{icon}</span>
        <div>
            <h3 className="font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600">{children}</p>
        </div>
    </div>
);

const Step_ReadySetFlow: React.FC = () => (
    <StepContainer title="Ready, Set... FLOW!" subtitle="Bienvenido a Technology Surfers: The 90/10 Wave.">
        <div className="space-y-6 text-base">
            <InfoSection icon="🌊" title="Ola Cero: Tu Takeoff">
                ¡Respira! Estás por activar tu mente estratégica, tu energía creativa y tu conexión con la tecnología. Solo necesitas presencia, intención y constancia.
            </InfoSection>
            <InfoSection icon="📅" title="Ajusta tu Calendario">
                Coordina tu sesión con el equipo de Technology Surfers y libera al menos cuatro horas semanales al inicio. Prepárate mentalmente. Nosotros seremos tus socios paso a paso; tú solo necesitas fluir con autenticidad, claridad y mentalidad de crecimiento.
            </InfoSection>
            <InfoSection icon="🏄‍♂️" title="Súmate a tu Tribu">
                Nadie surfea solo. Únete a la comunidad de Technology Surfers para compartir progresos, aprendizajes y estrategias. Cada mastermind dura entre sesenta y noventa minutos e incluye el set de 7 olas para lanzar tu negocio exitoso.
            </InfoSection>
            <InfoSection icon="🎯" title="Define tu Objetivo">
                Antes de remar hacia el mar abierto, define tu dirección. Reflexiona sobre lo que realmente buscas lograr y lo que significa para ti vivir el estilo de vida 90/10: automatizar con conciencia y vivir con propósito. Esa claridad será tu brújula y guiará la gran ola que estás por surfear.
            </InfoSection>
            <InfoSection icon="🚀" title="Let's Flow Human. Let's Ride Digital.">
                Tu negocio ya está formándose. Abre tu mente, enciende tus sistemas y prepárate para surfear el futuro con conciencia, comunidad y propósito.
            </InfoSection>
        </div>
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-2xl font-bold text-orange-600">No necesitas tenerlo todo definido. Para eso estamos aquí.</p>
        </div>
    </StepContainer>
);

const Step_Commitment: React.FC<StepProps> = ({ data, updateField }) => (
    <StepContainer title="Surferízate con Technology Surfers" subtitle="Reafirma tu compromiso de colaborar en equipo para construir una marca con propósito, mensajes con alma y resultados medibles.">
        <div className="text-gray-700 space-y-4">
            <p className="leading-relaxed">
                Yo, 
                <InlineInput aria-label="Tu nombre" placeholder="Tu nombre" value={data.nombreCommit} onChange={(e) => updateField({ nombreCommit: e.target.value })} />, 
                me comprometo a participar y completar la sesión guiada de descubrimiento y el proceso de cocreación para construir el plan de marketing de mi negocio. Impulsado por el deseo de crecer y convertir mi visión en acciones claras, me comprometo a involucrarme de forma activa durante todo el proceso.
            </p>
            <p className="leading-relaxed">
                Al firmar este certificado, reconozco que este trabajo conjunto me brindará claridad de marca, mensajes con sentido y un plan accionable. Entiendo que requiere presencia, honestidad y una mentalidad de crecimiento. No necesito traer nada "perfecto”: construiremos paso a paso un negocio exitoso.
            </p>
            <h3 className="font-bold pt-4 text-gray-800">Me comprometo a:</h3>
            <ul className="list-disc pl-6 space-y-2">
                <li>Participar activamente en cada parte del proceso: escuchar, responder y completar los ejercicios durante la sesión.</li>
                <li>Mantener una mente abierta, actitud positiva y mentalidad de crecimiento, viendo los obstáculos como oportunidades de aprendizaje.</li>
                <li>Responder con honestidad y claridad, aun si mis ideas están en borrador.</li>
                <li>Tomar decisiones ágiles (o designar a la persona decisora) y entregar retroalimentación oportuna.</li>
                <li>Implementar las acciones acordadas y compartir resultados para iterar con propósito.</li>
                <li>Respetar los tiempos de revisión y aprobación definidos.</li>
                <li>Cuidar la confidencialidad de toda la información compartida.</li>
            </ul>
        </div>
    </StepContainer>
);

const Step0_Intro: React.FC<StepProps> = ({ data, updateField }) => (
    <StepContainer title="The 7-Step Ride" subtitle="Sesión guiada para definir propósito, oferta, mensajes y objetivos del negocio.">
        <Input label="Presentado para" value={data.presentadoPara} onChange={e => updateField({ presentadoPara: e.target.value })} />
        <div className="grid grid-cols-3 gap-4">
            <Input label="Día" value={data.sesionDia} onChange={e => updateField({ sesionDia: e.target.value })} />
            <Input label="Mes" value={data.sesionMes} onChange={e => updateField({ sesionMes: e.target.value })} />
            <Input label="Año" value={data.sesionAnio} onChange={e => updateField({ sesionAnio: e.target.value })} />
        </div>
        <Input label="Facilitador" value={data.facilitador} onChange={e => updateField({ facilitador: e.target.value })} />
    </StepContainer>
);

const Step1_Future: React.FC<StepProps> = ({ data, updateField }) => {
    const handleArrayChange = (index: number, value: string) => {
        const newValues = [...data.futuroImparable];
        newValues[index] = value;
        updateField({ futuroImparable: newValues });
    };
    return (
        <StepContainer title="Paso #1: Diseña tu futuro imparable" subtitle="Conecta con el 'para qué' que mueve cada decisión. Imagina tu futuro con fuerza. ¿Para qué quieres un negocio exitoso?">
            {data.futuroImparable.map((value, index) => (
                <Input 
                    key={index}
                    label={`Nivel ${index + 1}: ¿Para qué?`} 
                    value={value}
                    onChange={e => handleArrayChange(index, e.target.value)}
                    placeholder={`Tu razón para el nivel ${index + 1}...`}
                />
            ))}
        </StepContainer>
    );
};

const Step2_Offer: React.FC<StepProps> = ({ data, updateField }) => (
    <StepContainer title="Paso #2: ¿Qué vendes?" subtitle="Completa la frase a continuación. La usaremos varias veces durante el proyecto para alinear mensajes, oferta y contenidos.">
        <Textarea 
            label="¿El problema que resuelvo es? ¿El producto que vendo es?" 
            description="Ej: Vendemos libertad, eliminamos la complejidad de los procesos operativos de los negocios..."
            value={data.queVendes.principal}
            onChange={e => updateField({ queVendes: { ...data.queVendes, principal: e.target.value }})}
        />
        <Textarea 
            label="Notas Adicionales" 
            description="Este es solo un punto de partida. A medida que avancemos, lo iremos afinando."
            value={data.queVendes.notas}
            onChange={e => updateField({ queVendes: { ...data.queVendes, notas: e.target.value }})}
        />
    </StepContainer>
);

const Step3_IdealClient: React.FC<StepProps> = ({ data, updateField }) => (
    <StepContainer title="Paso #3: Tu cliente ideal" subtitle="Describe en un solo párrafo a tu cliente ideal. No busques perfección: escribe como lo imaginas hoy.">
        <Textarea 
            label="Descripción del Cliente Ideal"
            description="Quién es, qué rol tiene, qué busca lograr, qué le duele, qué lo mueve a actuar, dónde está, etc."
            rows={8}
            value={data.clienteIdeal}
            onChange={e => updateField({ clienteIdeal: e.target.value })}
        />
    </StepContainer>
);

const Step4_LeadMagnet: React.FC<StepProps> = ({ data, updateField }) => (
    <StepContainer title="Paso #4: Crea tu lead magnet" subtitle="Tu lead magnet es un contenido útil que resuelve un reto concreto de tu cliente ideal.">
        <Input label="01 - ¿Qué tipo crearás?" description="Ej: Socio mental visionario grátis por 14 dias" value={data.leadMagnet.tipo} onChange={e => updateField({ leadMagnet: { ...data.leadMagnet, tipo: e.target.value }})} />
        <Textarea label="02 - Bosqueja tu regalo de valor" description="Describe el acceso, la claridad y el potencial que ofreces." value={data.leadMagnet.regalo} onChange={e => updateField({ leadMagnet: { ...data.leadMagnet, regalo: e.target.value }})}/>
        <Input label="03 - ¿Cuál será el título?" description="Ej: Socio mental" value={data.leadMagnet.titulo} onChange={e => updateField({ leadMagnet: { ...data.leadMagnet, titulo: e.target.value }})} />
        <Textarea label="04 - ¿Cuál será tu siguiente paso (CTA)?" description="Ej: Llenar un form con los datos basicos del cliente para construir su socio mental." value={data.leadMagnet.cta} onChange={e => updateField({ leadMagnet: { ...data.leadMagnet, cta: e.target.value }})}/>
    </StepContainer>
);

const Step5_OptIn: React.FC<StepProps> = ({ data, updateField }) => (
    <StepContainer title="Paso #5: Haz tu Opt-In page" subtitle="Usa una sola pantalla limpia. Tono cercano, honesto y específico.">
        <Input label="Título Principal" description="Consigue [beneficio] en [tiempo] sin [obstáculo]." value={data.optInPage.titulo} onChange={e => updateField({ optInPage: {...data.optInPage, titulo: e.target.value }})}/>
        <Textarea label="Subtítulo" description="Qué es, para quién, por qué ahora." value={data.optInPage.subtitulo} onChange={e => updateField({ optInPage: {...data.optInPage, subtitulo: e.target.value }})}/>
        <h3 className="text-lg font-medium text-gray-800 pt-4">3 Beneficios Concretos</h3>
        <Input label="Beneficio 1" value={data.optInPage.beneficio1} onChange={e => updateField({ optInPage: {...data.optInPage, beneficio1: e.target.value }})}/>
        <Input label="Beneficio 2" value={data.optInPage.beneficio2} onChange={e => updateField({ optInPage: {...data.optInPage, beneficio2: e.target.value }})}/>
        <Input label="Beneficio 3" value={data.optInPage.beneficio3} onChange={e => updateField({ optInPage: {...data.optInPage, beneficio3: e.target.value }})}/>
    </StepContainer>
);

const Step6_EmailSwell: React.FC<StepProps> = ({ data, updateField }) => (
    <StepContainer title="Paso #6: Email Swell" subtitle="Piensa en una secuencia breve, humana y útil. Menos adornos, más claridad.">
        <Textarea label="Email de Bienvenida / Valor" description="Agradece, recuerda el microresultado, ofrece 1 tip accionable o mini historia." value={data.emailSwell.bienvenida} onChange={e => updateField({ emailSwell: {...data.emailSwell, bienvenida: e.target.value }})} />
        <Textarea label="Email de Prueba / Testimonio" description="Comparte un caso breve o testimonio que genere confianza." value={data.emailSwell.prueba} onChange={e => updateField({ emailSwell: {...data.emailSwell, prueba: e.target.value }})} />
        <Textarea label="Email de Invitación / CTA" description="Invita a un siguiente paso claro: agendar 15', descargar recurso, responder este correo." value={data.emailSwell.invitacion} onChange={e => updateField({ emailSwell: {...data.emailSwell, invitacion: e.target.value }})} />
    </StepContainer>
);

const Step7_Delivery: React.FC<StepProps> = ({ data, updateField }) => (
    <StepContainer title="Paso #7: Tu sistema y declaración" subtitle="Elige la forma más simple para entregar tu valor y define tu brújula con una Declaración de Solución.">
        <Textarea label="Tu sistema de entrega" description="Define formato (1:1, grupal), frecuencia, duración, canal (presencial/Zoom) y límites de lo incluido para un piloto de 3-6 semanas." value={data.sistemaEntrega} onChange={e => updateField({ sistemaEntrega: e.target.value })}/>
        <div className="pt-6">
            <h3 className="text-lg font-medium text-gray-800">Declaración de Solución</h3>
            <p className="text-sm text-gray-500 mb-4">"Ayudo a [quién] a [resolver/aliviar X] a través de [tu camino/estilo] para [resultado] sin [obstáculo]."</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Quién ayudas" value={data.declaracionSolucion.quien} onChange={e => updateField({ declaracionSolucion: {...data.declaracionSolucion, quien: e.target.value }})} />
                <Input label="Qué alivias" value={data.declaracionSolucion.que} onChange={e => updateField({ declaracionSolucion: {...data.declaracionSolucion, que: e.target.value }})} />
                <Input label="Cómo lo haces" value={data.declaracionSolucion.como} onChange={e => updateField({ declaracionSolucion: {...data.declaracionSolucion, como: e.target.value }})} />
                <Input label="Resultado sin obstáculo" value={data.declaracionSolucion.resultado} onChange={e => updateField({ declaracionSolucion: {...data.declaracionSolucion, resultado: e.target.value }})} />
            </div>
        </div>
    </StepContainer>
);


// --- Main App Component ---

export default function App() {
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const savedData = localStorage.getItem('formData');
      return savedData ? JSON.parse(savedData) : initialFormData;
    } catch (error) {
      console.error("Failed to parse formData from localStorage", error);
      return initialFormData;
    }
  });

  const [currentStep, setCurrentStep] = useState<number>(() => {
    try {
      const savedStep = localStorage.getItem('currentStep');
      return savedStep ? JSON.parse(savedStep) : 0;
    } catch (error) {
      console.error("Failed to parse currentStep from localStorage", error);
      return 0;
    }
  });

  const [copyButtonText, setCopyButtonText] = useState('Copiar Resumen');
  
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('currentStep', JSON.stringify(currentStep));
  }, [currentStep]);

  const updateField = (field: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...field }));
  };

  const next = () => setCurrentStep(prev => (prev < TOTAL_STEPS ? prev + 1 : prev));
  const prev = () => setCurrentStep(prev => (prev > 0 ? prev - 1 : prev));
  const reset = () => {
    localStorage.removeItem('formData');
    localStorage.removeItem('currentStep');
    setFormData(initialFormData);
    setCurrentStep(0);
    setCopyButtonText('Copiar Resumen');
  }

  const steps = useMemo(() => [
    <Step0_Intro data={formData} updateField={updateField} />,
    <Step_ReadySetFlow />,
    <Step_Commitment data={formData} updateField={updateField} />,
    <Step1_Future data={formData} updateField={updateField} />,
    <Step2_Offer data={formData} updateField={updateField} />,
    <Step3_IdealClient data={formData} updateField={updateField} />,
    <Step4_LeadMagnet data={formData} updateField={updateField} />,
    <Step5_OptIn data={formData} updateField={updateField} />,
    <Step6_EmailSwell data={formData} updateField={updateField} />,
    <Step7_Delivery data={formData} updateField={updateField} />
  ], [formData]);
  
  const progress = (currentStep / (TOTAL_STEPS - 1)) * 100;
  
  const generateSummaryText = (data: FormData): string => {
    const { quien, que, como, resultado } = data.declaracionSolucion;
    const declaracionCompleta = `Ayudo a ${quien || '[quién]'} a ${que || '[resolver/aliviar X]'} a través de ${como || '[tu camino/estilo]'} para ${resultado || '[resultado]'} sin [obstáculo].`;

    const futuroImparableText = data.futuroImparable.map((razon, index) => `  - Nivel ${index + 1}: ${razon || 'No definido'}`).join('\n');

    return `
# The 7-Step Ride: Resumen del Plan de Negocio

## Detalles de la Sesión
- **Presentado para:** ${data.presentadoPara}
- **Fecha:** ${data.sesionDia} ${data.sesionMes}, ${data.sesionAnio}
- **Facilitador:** ${data.facilitador}
- **Compromiso de:** ${data.nombreCommit || 'No definido'}

---

## Paso 1: Tu Futuro Imparable (Tu 'Para Qué')
${futuroImparableText}

---

## Paso 2: ¿Qué Vendes?
- **Oferta Principal:** ${data.queVendes.principal || 'No definido'}
- **Notas Adicionales:** ${data.queVendes.notas || 'No definido'}

---

## Paso 3: Tu Cliente Ideal
${data.clienteIdeal || 'No definido'}

---

## Paso 4: Tu Lead Magnet
- **Tipo:** ${data.leadMagnet.tipo || 'No definido'}
- **Regalo de Valor:** ${data.leadMagnet.regalo || 'No definido'}
- **Título:** ${data.leadMagnet.titulo || 'No definido'}
- **Llamada a la Acción (CTA):** ${data.leadMagnet.cta || 'No definido'}

---

## Paso 5: Tu Página Opt-In
- **Título Principal:** ${data.optInPage.titulo || 'No definido'}
- **Subtítulo:** ${data.optInPage.subtitulo || 'No definido'}
- **Beneficios:**
  1. ${data.optInPage.beneficio1 || 'No definido'}
  2. ${data.optInPage.beneficio2 || 'No definido'}
  3. ${data.optInPage.beneficio3 || 'No definido'}

---

## Paso 6: Secuencia de Email Swell
- **Email de Bienvenida/Valor:** ${data.emailSwell.bienvenida || 'No definido'}
- **Email de Prueba/Testimonio:** ${data.emailSwell.prueba || 'No definido'}
- **Email de Invitación/CTA:** ${data.emailSwell.invitacion || 'No definido'}

---

## Paso 7: Tu Sistema de Entrega y Declaración de Solución
- **Sistema de Entrega:** ${data.sistemaEntrega || 'No definido'}
- **Declaración de Solución:** ${declaracionCompleta}
    `.trim();
  };

  if (currentStep === TOTAL_STEPS) {
    const { quien, que, como, resultado } = formData.declaracionSolucion;
    const declaracionCompleta = `Ayudo a ${quien || '[quién]'} a ${que || '[resolver/aliviar X]'} a través de ${como || '[tu camino/estilo]'} para ${resultado || '[resultado]'} sin [obstáculo].`;
    const summaryText = generateSummaryText(formData);

    const handleCopy = () => {
        navigator.clipboard.writeText(summaryText).then(() => {
            setCopyButtonText('¡Copiado!');
            setTimeout(() => setCopyButtonText('Copiar Resumen'), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            setCopyButtonText('Error al copiar');
        });
    };

    const handleSendWhatsApp = () => {
        const encodedText = encodeURIComponent(summaryText);
        const url = `https://wa.me/?text=${encodedText}`;
        window.open(url, '_blank');
    };

    const handleSendEmail = () => {
        const subject = encodeURIComponent("Mi Plan de Negocio: The 7-Step Ride");
        const body = encodeURIComponent(summaryText);
        const url = `mailto:?subject=${subject}&body=${body}`;
        window.location.href = url;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <main className="max-w-4xl w-full mx-auto">
                 <StepContainer title="¡Felicidades! Has completado The 7-Step Ride" subtitle="Aquí tienes un resumen de tu plan de negocio. Tienes claridad, enfoque y un punto de partida sólido.">
                    <div className="bg-orange-50 border-l-4 border-orange-500 text-orange-700 p-4 rounded-md mb-6">
                        <p className="font-bold">Tu Declaración de Solución:</p>
                        <p>{declaracionCompleta}</p>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">Resumen de tu Viaje:</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                        <p><strong>Compromiso de:</strong> {formData.nombreCommit || 'No definido'}</p>
                        <p><strong>Presentado para:</strong> {formData.presentadoPara}</p>
                        <p><strong>Cliente Ideal:</strong> {formData.clienteIdeal || 'No definido'}</p>
                        <p><strong>Oferta:</strong> {formData.queVendes.principal || 'No definido'}</p>
                        <p><strong>Lead Magnet:</strong> {formData.leadMagnet.titulo || 'No definido'}</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Tu Plan Completo</h3>
                      <p className="text-sm text-gray-500 mb-4">Usa los botones para copiar o compartir tu plan.</p>
                      <textarea
                        readOnly
                        className="w-full h-64 p-3 text-sm bg-gray-50 border border-gray-300 rounded-md font-mono"
                        value={summaryText}
                      />
                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Button onClick={handleCopy}>{copyButtonText}</Button>
                        <Button onClick={handleSendWhatsApp}>Enviar por WhatsApp</Button>
                        <Button onClick={handleSendEmail}>Enviar por Email</Button>
                      </div>
                    </div>

                    <div className="mt-8 text-center">
                        <Button onClick={reset}>Comenzar de Nuevo</Button>
                    </div>
                 </StepContainer>
            </main>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <header className="mb-8">
        <Logo />
      </header>
      
      <main className="max-w-4xl w-full mx-auto">
        <div className="mb-6">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                  Paso {currentStep + 1} de {TOTAL_STEPS}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200">
              <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500 transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {steps[currentStep]}

        <div className="mt-8 flex justify-between">
          <Button onClick={prev} disabled={currentStep === 0}>
            Anterior
          </Button>
          <Button onClick={next}>
            {currentStep === TOTAL_STEPS - 1 ? 'Finalizar y Ver Resumen' : 'Siguiente'}
          </Button>
        </div>
      </main>
    </div>
  );
}