import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, Send, Loader2, AlertCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

type ProjectType = 'cocina' | 'bano' | 'escalera' | 'reparacion' | 'otro' | '';
type Status = 'idle' | 'sending' | 'sent' | 'error';

interface FormData {
  name: string;
  phone: string;
  email: string;
  projectType: ProjectType;
  message: string;
}

const EMPTY_FORM: FormData = {
  name: '',
  phone: '',
  email: '',
  projectType: '',
  message: '',
};

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  // Campo trampa: los bots lo rellenan, las personas no lo ven
  const [company, setCompany] = useState('');

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    if (!formData.projectType) newErrors.projectType = 'Selecciona un tipo de proyecto';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || status === 'sending') return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, company }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? 'No se pudo enviar el mensaje');
      }

      setStatus('sent');
      setFormData(EMPTY_FORM);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'No se pudo enviar el mensaje'
      );
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const fieldClass = (hasError: boolean) =>
    `w-full px-0 py-4 bg-transparent border-b text-graphite-dark placeholder:text-stone-400 focus:outline-none transition-colors ${
      hasError ? 'border-red-400' : 'border-stone-300 focus:border-graphite-dark'
    }`;

  return (
    <section id="contacto" className="section-padding" ref={ref}>
      <div className="container-narrow mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Datos de contacto */}
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
                <Mail size={18} className="text-stone-400 mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Email</p>
                  <a
                    href="mailto:marbresmontseny2015@gmail.com"
                    className="text-graphite-dark hover:underline break-all"
                  >
                    marbresmontseny2015@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-stone-400 mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Zona de servicio</p>
                  <p className="text-graphite-dark">
                    Vilalba Sasserra · Baix Montseny · Vallès · Barcelona
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

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status === 'sent' ? (
              <motion.div
                className="flex items-center justify-center h-full min-h-[400px]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 border border-stone-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={24} className="text-stone-500" />
                  </div>
                  <h3 className="font-serif text-2xl text-graphite-dark mb-3">Gracias.</h3>
                  <p className="text-stone-600 max-w-sm mx-auto">
                    Hemos recibido tu solicitud y nos pondremos en contacto contigo.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-sm text-stone-500 underline underline-offset-4 hover:text-graphite-dark transition-colors"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <input
                    type="text"
                    placeholder="Nombre *"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={fieldClass(!!errors.name)}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Teléfono *"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={fieldClass(!!errors.phone)}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={fieldClass(!!errors.email)}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleChange('projectType', e.target.value)}
                    className={`${fieldClass(!!errors.projectType)} appearance-none cursor-pointer ${
                      !formData.projectType ? 'text-stone-400' : ''
                    }`}
                  >
                    <option value="" disabled>Tipo de proyecto *</option>
                    <option value="cocina">Cocina</option>
                    <option value="bano">Baño</option>
                    <option value="escalera">Escalera</option>
                    <option value="reparacion">Reparación</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.projectType && (
                    <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>
                  )}
                </div>

                <div>
                  <textarea
                    placeholder="Cuéntanos sobre tu proyecto..."
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-0 py-4 bg-transparent border-b border-stone-300 text-graphite-dark placeholder:text-stone-400 focus:outline-none focus:border-graphite-dark transition-colors resize-none"
                  />
                </div>

                {/* Trampa antispam: oculta para las personas */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  aria-hidden="true"
                  className="absolute left-[-9999px] w-px h-px opacity-0"
                />

                {status === 'error' && (
                  <motion.div
                    className="flex items-start gap-3 p-4 bg-red-50 border border-red-200"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p className="text-red-700 font-medium">{errorMessage}</p>
                      <p className="text-red-600/80 mt-1">
                        Puedes llamarnos al{' '}
                        <a href="tel:+34600419998" className="underline font-medium">
                          600 41 99 98
                        </a>{' '}
                        o escribirnos a{' '}
                        <a
                          href="mailto:marbresmontseny2015@gmail.com"
                          className="underline font-medium break-all"
                        >
                          marbresmontseny2015@gmail.com
                        </a>
                      </p>
                    </div>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary mt-6 w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      Enviando
                      <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Solicitar presupuesto
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
