import { motion } from 'framer-motion'
import { RiGithubLine, RiLinkedinBoxLine, RiMailLine } from 'react-icons/ri'
import SectionTitle from '../components/SectionTitle'
import { aboutHighlights, certifications, personalInfo } from '../utils/data'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="section-padding">
        <SectionTitle
          label="Who I Am"
          title="About Me"
          subtitle="Passionate ML engineer turning complex data into intelligent solutions"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            {/* Avatar placeholder with initials */}
            <div className="relative">
              <div
                className="w-64 h-64 rounded-3xl flex items-center justify-center font-display text-7xl font-extrabold"
                style={{
                  background: 'linear-gradient(135deg, var(--brand), var(--accent))',
                  boxShadow: '0 0 60px var(--glow)',
                }}
              >
                SG
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-4 -right-4 px-4 py-2 glass rounded-2xl border border-[var(--border)]"
              >
                <span className="font-mono text-xs text-[var(--brand)]">AI/ML Engineer</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                className="absolute -top-4 -left-4 px-4 py-2 glass rounded-2xl border border-[var(--border)]"
              >
                <span className="font-mono text-xs text-[var(--accent)]">Data Scientist</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p variants={itemVariants} className="text-[var(--text-2)] text-lg leading-relaxed mb-6">
                I'm <strong style={{ color: 'var(--text)' }}>Sahil Gaund</strong>, an AI/ML engineer focused on building
                production-grade machine learning systems that solve real business problems.
              </motion.p>
              <motion.p variants={itemVariants} className="text-[var(--text-2)] leading-relaxed mb-8">
                My work spans the full ML lifecycle — from exploratory data analysis and feature engineering to model
                training, evaluation, and deployment. I thrive at the intersection of data, algorithms, and engineering.
              </motion.p>

              {/* Highlight cards */}
              <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-4 mb-8">
                {aboutHighlights.map(h => (
                  <motion.div
                    key={h.title}
                    whileHover={{ scale: 1.03 }}
                    className="glass p-4 rounded-2xl border border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300"
                  >
                    <div className="text-2xl mb-2">{h.icon}</div>
                    <div className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{h.title}</div>
                    <div className="text-xs text-[var(--text-3)] leading-relaxed">{h.desc}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social links */}
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-[var(--border)] hover:border-[var(--brand)] text-[var(--text-2)] hover:text-[var(--brand)] transition-all duration-200 text-sm">
                  <RiGithubLine size={16} /> GitHub
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-2)] hover:text-[var(--accent)] transition-all duration-200 text-sm">
                  <RiLinkedinBoxLine size={16} /> LinkedIn
                </a>
                <a href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-[var(--border)] hover:border-[var(--brand)] text-[var(--text-2)] hover:text-[var(--brand)] transition-all duration-200 text-sm">
                  <RiMailLine size={16} /> Email
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--text)' }}>
              Certifications & Training
            </h3>
            <span className="px-4 py-1.5 rounded-full font-mono text-xs font-medium"
              style={{ background: 'rgba(14,165,233,0.12)', color: 'var(--brand)', border: '1px solid rgba(14,165,233,0.25)' }}>
              {certifications.length} Certificates
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass rounded-2xl p-5 border border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300 cursor-default flex flex-col gap-3 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}30` }}
                  >
                    {cert.icon}
                  </div>
                  <span className="font-mono text-xs text-[var(--text-3)] shrink-0 mt-1">{cert.year}</span>
                </div>

                {/* Title & issuer */}
                <div>
                  <div className="font-display font-semibold text-sm leading-snug mb-1 group-hover:text-[var(--brand)] transition-colors duration-200" style={{ color: 'var(--text)' }}>
                    {cert.title}
                  </div>
                  <div className="text-xs font-medium" style={{ color: cert.color }}>{cert.issuer}</div>
                </div>

                {/* Description */}
                <p className="text-xs text-[var(--text-3)] leading-relaxed flex-1">{cert.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[var(--border)]">
                  {cert.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono"
                      style={{ background: `${cert.color}12`, color: cert.color, border: `1px solid ${cert.color}25` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
