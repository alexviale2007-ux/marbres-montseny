import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const tableData = [
  {
    material: 'Mármol Natural',
    resistance: 'Media',
    maintenance: 'Regular',
    aesthetic: 'Excepcional',
    recommended: 'Baños, encimeras decorativas',
  },
  {
    material: 'Granito',
    resistance: 'Alta',
    maintenance: 'Bajo',
    aesthetic: 'Muy buena',
    recommended: 'Cocinas, exterior',
  },
  {
    material: 'Silestone / Cuarzo',
    resistance: 'Muy alta',
    maintenance: 'Mínimo',
    aesthetic: 'Uniforme',
    recommended: 'Cocinas, baños',
  },
  {
    material: 'Compactos',
    resistance: 'Máxima',
    maintenance: 'Mínimo',
    aesthetic: 'Contemporánea',
    recommended: 'Cocinas, revestimientos',
  },
];

export default function ComparisonTable() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 px-6 bg-marble-ivory" ref={ref}>
      <div className="container-narrow mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">COMPARATIVA</p>
          <h3 className="font-serif text-3xl md:text-4xl text-graphite-dark mb-10">
            Elige el material adecuado.
          </h3>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          className="hidden md:block overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-300">
                <th className="text-left py-4 pr-6 text-xs font-medium tracking-wider uppercase text-stone-500">Material</th>
                <th className="text-left py-4 pr-6 text-xs font-medium tracking-wider uppercase text-stone-500">Resistencia</th>
                <th className="text-left py-4 pr-6 text-xs font-medium tracking-wider uppercase text-stone-500">Mantenimiento</th>
                <th className="text-left py-4 pr-6 text-xs font-medium tracking-wider uppercase text-stone-500">Estética</th>
                <th className="text-left py-4 text-xs font-medium tracking-wider uppercase text-stone-500">Uso recomendado</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.material} className="border-b border-stone-200 last:border-none">
                  <td className="py-5 pr-6 font-medium text-graphite-dark text-sm">{row.material}</td>
                  <td className="py-5 pr-6 text-stone-600 text-sm">{row.resistance}</td>
                  <td className="py-5 pr-6 text-stone-600 text-sm">{row.maintenance}</td>
                  <td className="py-5 pr-6 text-stone-600 text-sm">{row.aesthetic}</td>
                  <td className="py-5 text-stone-600 text-sm">{row.recommended}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {tableData.map((row, i) => (
            <motion.div
              key={row.material}
              className="p-5 border border-stone-200 bg-marble-white"
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
            >
              <h4 className="font-medium text-graphite-dark mb-3">{row.material}</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-stone-400 text-xs uppercase tracking-wider">Resistencia</span>
                  <p className="text-stone-600 mt-0.5">{row.resistance}</p>
                </div>
                <div>
                  <span className="text-stone-400 text-xs uppercase tracking-wider">Mantenimiento</span>
                  <p className="text-stone-600 mt-0.5">{row.maintenance}</p>
                </div>
                <div>
                  <span className="text-stone-400 text-xs uppercase tracking-wider">Estética</span>
                  <p className="text-stone-600 mt-0.5">{row.aesthetic}</p>
                </div>
                <div>
                  <span className="text-stone-400 text-xs uppercase tracking-wider">Uso</span>
                  <p className="text-stone-600 mt-0.5">{row.recommended}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
