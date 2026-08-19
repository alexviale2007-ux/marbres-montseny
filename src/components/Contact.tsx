import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Send } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * ENVÍO DE SOLICITUDES DE PRESUPUESTO
 * ===================================
 *
 * La web se publica como sitio estático, sin servidor propio donde recibir
 * un POST. El formulario compone la solicitud y la entrega por WhatsApp, que
 * ya es el canal habitual del negocio.
 *
 * Consecuencia importante para la interfaz: la solicitud NO está enviada
 * cuando el visitante pulsa el botón, sino cuando confirma el mensaje dentro
 * de WhatsApp. El texto de confirmación lo dice de forma explícita, porque
 * afirmar "hemos recibido tu solicitud" sin haberla recibido deja al cliente
 * esperando una llamada que nunca llegaría.
 *
 * PARA MIGRAR A UN FORMULARIO CON BUZÓN DE CORREO
 * -----------------------------------------------
 * Basta con dar de alta un servicio de formularios (Formspree, Basin o el
 * propio Netlify Forms) y sustituir el cuerpo de `handleSubmit` por un
 * `fetch` al endpoint que faciliten. El resto del componente no cambia.
 */

const WHATSAPP_NUMBER = '34600419998';

type ProjectType = 'cocina' | 'bano' | 'escalera' | 'reparacion' | 'otro' | '';

const PROJECT_LABELS: Record<Exclude<ProjectType, ''>, string> = {
  cocina: 'Cocina',
  bano: 'Baño',
  escalera: 'Escalera',
  reparacion: 'Reparación',
  otro: 'Otro',
};

interface FormData {
  name: string;
  phone: string;
  email: string;
  projectType: ProjectType;
  message: string;
}

/** Redacta la solicitud en texto plano, legible tal cual en el móvil. */
function buildRequest(data: FormData): string {
  const lines = [
    'Hola, me gustaría pedir un presupuesto.',
    '',
    `Nombre: ${data.name.trim()}`,
    `Teléfono: ${data.phone.trim()}`,
  ];

  if (data.email.trim()) lines.push(`Email: ${data.email.trim()}`);
  if (data.projectType) lines.push(`Tipo de proyecto: ${PROJECT_LABELS[data.projectType]}`);
  if (data.message.trim()) lines.push('', `Detalles: ${data.message.trim()}`);

  return lines.join('\n');
}

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  /** URL de la solicitud ya redactada. Si existe, se muestra la confirmación. */
  const [requestUrl, setRequestUrl] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';

    // El correo es opcional: el negocio devuelve la llamada por teléfono, y
    // exigirlo solo añadía un motivo más para abandonar el formulario. Si se
    // rellena, se comprueba que tenga forma de dirección válida.
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Revisa la dirección de email';
    }

    if (!formData.projectType) newErrors.projectType = 'Selecciona un tipo de proyecto';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildRequest(formData))}`;
    setRequestUrl(url);

    // Puede quedar bloqueado por el navegador si interpreta que es una
    // ventana emergente. Por eso la pantalla siguiente repite el enlace.
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contacto" className="section-padding" ref={ref}>
      <div className="container-narrow mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">CONTACTO</p>
            <h2 className="font-serif text-4xl md:text-5xl text-graphite-dark mb-8 leading-[1.1]">
              Hablemos de<br />tu proyecto.
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <Phone size={18} className="text-stone-400 mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Teléfono</p>
                  <a href="tel:+34600419998" className="text-graphite-dark font-medium hover:underline">
                    600 41 99 98
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-stone-400 mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Taller</p>
                  <p className="text-graphite-dark">Vilalba Sasserra, 08455 · Barcelona</p>
                  <p className="text-stone-500 text-sm mt-2">
                    Zona de servicio: Vilalba Sasserra · Baix Montseny · Vallès · Barcelona
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock size={18} className="text-stone-400 mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Horario</p>
                  <p className="text-graphite-dark">Atención con cita previa</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {requestUrl ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <div className="w-16 h-16 border border-stone-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={24} className="text-stone-500" />
                  </div>
                  <h3 className="font-serif text-2xl text-graphite-dark mb-3">
                    Ya casi está.
                  </h3>
                  <p className="text-stone-600 max-w-sm mx-auto">
                    Se ha abierto WhatsApp con tu solicitud redactada. Envía el
                    mensaje para que nos llegue y te responderemos lo antes posible.
                  </p>

                  {/* Salida de rescate si el navegador bloqueó la ventana. */}
                  <div className="mt-8 space-y-3">
                    <a
                      href={requestUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full sm:w-auto justify-center"
                    >
                      Abrir WhatsApp de nuevo
                    </a>
                    <p className="text-sm text-stone-500">
                      ¿Prefieres llamar?{' '}
                      <a href="tel:+34600419998" className="text-graphite-dark underline underline-offset-4">
                        600 41 99 98
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Nombre *"
                    aria-label="Nombre"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    className={`w-full px-0 py-4 bg-transparent border-b text-graphite-dark placeholder:text-stone-400 focus:outline-none transition-colors ${
                      errors.name ? 'border-red-400' : 'border-stone-300 focus:border-graphite-dark'
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    placeholder="Teléfono *"
                    aria-label="Teléfono"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    className={`w-full px-0 py-4 bg-transparent border-b text-graphite-dark placeholder:text-stone-400 focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-400' : 'border-stone-300 focus:border-graphite-dark'
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Email (opcional)"
                    aria-label="Email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    className={`w-full px-0 py-4 bg-transparent border-b text-graphite-dark placeholder:text-stone-400 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-400' : 'border-stone-300 focus:border-graphite-dark'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Project Type */}
                <div>
                  <select
                    aria-label="Tipo de proyecto"
                    value={formData.projectType}
                    onChange={(e) => handleChange('projectType', e.target.value)}
                    aria-invalid={Boolean(errors.projectType)}
                    className={`w-full px-0 py-4 bg-transparent border-b text-graphite-dark focus:outline-none transition-colors appearance-none cursor-pointer ${
                      errors.projectType ? 'border-red-400' : 'border-stone-300 focus:border-graphite-dark'
                    } ${!formData.projectType ? 'text-stone-400' : ''}`}
                  >
                    <option value="" disabled>Tipo de proyecto *</option>
                    <option value="cocina">Cocina</option>
                    <option value="bano">Baño</option>
                    <option value="escalera">Escalera</option>
                    <option value="reparacion">Reparación</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.projectType && <p className="text-red-400 text-xs mt-1">{errors.projectType}</p>}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    placeholder="Cuéntanos sobre tu proyecto..."
                    aria-label="Mensaje"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-0 py-4 bg-transparent border-b border-stone-300 text-graphite-dark placeholder:text-stone-400 focus:outline-none focus:border-graphite-dark transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button type="submit" className="btn-primary mt-6 w-full sm:w-auto justify-center">
                  Enviar por WhatsApp
                  <Send size={16} />
                </button>

                <p className="text-xs text-stone-400 leading-relaxed">
                  Al enviar se abrirá WhatsApp con la solicitud ya redactada para
                  que puedas revisarla antes de mandarla. También puedes llamar al{' '}
                  <a href="tel:+34600419998" className="underline underline-offset-2 hover:text-graphite-dark">
                    600 41 99 98
                  </a>.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
