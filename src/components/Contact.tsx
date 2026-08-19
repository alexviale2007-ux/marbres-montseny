import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Send } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

type ProjectType = 'cocina' | 'bano' | 'escalera' | 'reparacion' | 'otro' | '';

interface FormData {
  name: string;
  phone: string;
  email: string;
  projectType: ProjectType;
  message: string;
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
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
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

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <div className="w-16 h-16 border border-stone-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={24} className="text-stone-500" />
                  </div>
                  <h3 className="font-serif text-2xl text-graphite-dark mb-3">Gracias.</h3>
                  <p className="text-stone-600 max-w-sm">
                    Hemos recibido tu solicitud y nos pondremos en contacto contigo.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Nombre *"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
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
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
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
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full px-0 py-4 bg-transparent border-b text-graphite-dark placeholder:text-stone-400 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-400' : 'border-stone-300 focus:border-graphite-dark'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Project Type */}
                <div>
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleChange('projectType', e.target.value)}
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
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-0 py-4 bg-transparent border-b border-stone-300 text-graphite-dark placeholder:text-stone-400 focus:outline-none focus:border-graphite-dark transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button type="submit" className="btn-primary mt-6 w-full sm:w-auto justify-center">
                  Solicitar presupuesto
                  <Send size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
