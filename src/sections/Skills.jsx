import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'
import { skills } from '../utils/data'

const CATEGORY_ICONS = {
  'Machine Learning': '🤖',
  'Data Science': '📊',
  'Languages & Tools': '⚙️',
  'Cloud & Platforms': '☁️',
}

function SkillBar({ name, level, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{name}</span>
        <span className="font-mono text-xs text-[var(--text-3)]">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface)' }}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.05 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            height: '100%',
            width: `${level}%`,
            background: 'linear-gradient(90deg, var(--brand), var(--accent))',
            borderRadius: '9999px',
            transformOrigin: 'left',
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative">
      <div className="section-padding">
        <SectionTitle
          label="Technical Proficiency"
          title="Skills"
          subtitle="Tools and technologies I work with to build intelligent systems"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, skillList], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="glass rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{CATEGORY_ICONS[category]}</span>
                <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>{category}</h3>
              </div>
              {skillList.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech pill cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="font-mono text-xs text-[var(--text-3)] uppercase tracking-widest mb-6">Also comfortable with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'OpenCV', 'NLTK', 'SpaCy', 'FastAPI', 'Flask', 'React',
              'PostgreSQL', 'MongoDB', 'Redis', 'MLflow', 'Weights & Biases', 'LangChain',
            ].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-4 py-2 glass rounded-full border border-[var(--border)] text-sm text-[var(--text-2)] cursor-default font-mono"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
