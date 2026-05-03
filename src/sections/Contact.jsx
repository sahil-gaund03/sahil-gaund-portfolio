import { useState } from 'react'
import { motion } from 'framer-motion'
import { RiSendPlaneLine, RiMailLine, RiGithubLine, RiLinkedinBoxLine } from 'react-icons/ri'
import SectionTitle from '../components/SectionTitle'
import { personalInfo } from '../utils/data'

function validate(fields) {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'Name is required'
  if (!fields.email.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(fields.email)) errors.email = 'Invalid email'
  if (!fields.message.trim()) errors.message = 'Message is required'
  else if (fields.message.trim().length < 20) errors.message = 'Message too short'
  return errors
}

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length) { setErrors(errs); return }

    // mailto fallback (EmailJS can be integrated)
    const subject = encodeURIComponent(`Portfolio Contact from ${fields.name}`)
    const body = encodeURIComponent(`Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`)
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`)
    setStatus('success')
    setFields({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="relative">
      <div className="section-padding">
        <SectionTitle
          label="Let's Talk"
          title="Get In Touch"
          subtitle="Open to collaborations, opportunities, and interesting conversations"
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Let's build something<br />
              <span className="text-gradient">intelligent together</span>
            </h3>
            <p className="text-[var(--text-2)] leading-relaxed mb-8">
              Whether you have an ML project, a data science problem, or just want to connect —
              I'd love to hear from you. I'm currently open to new opportunities.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: <RiMailLine />, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: <RiGithubLine />, label: 'sahil-gaund03', href: personalInfo.github },
                { icon: <RiLinkedinBoxLine />, label: 'sahilgaund03', href: personalInfo.linkedin },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 glass rounded-2xl border border-[var(--border)] hover:border-[var(--brand)] text-[var(--text-2)] hover:text-[var(--brand)] transition-all duration-200 group"
                >
                  <span className="text-xl text-[var(--brand)]">{link.icon}</span>
                  <span className="font-medium text-sm">{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 border border-[var(--border)]" noValidate>
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-2xl text-sm text-green-400 bg-green-400/10 border border-green-400/20">
                  ✅ Message opened in your mail client!
                </div>
              )}

              {['name', 'email'].map(field => (
                <div key={field} className="mb-5">
                  <label className="block text-sm font-medium mb-2 capitalize" style={{ color: 'var(--text-2)' }}>
                    {field}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={fields[field]}
                    onChange={handleChange}
                    placeholder={field === 'name' ? 'Your name' : 'your@email.com'}
                    className={`w-full px-4 py-3 rounded-xl glass border text-sm outline-none transition-all duration-200 focus:border-[var(--brand)] ${
                      errors[field] ? 'border-red-500/50' : 'border-[var(--border)]'
                    }`}
                    style={{ color: 'var(--text)', background: 'var(--surface-2)' }}
                  />
                  {errors[field] && <p className="mt-1.5 text-xs text-red-400">{errors[field]}</p>}
                </div>
              ))}

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-2)' }}>Message</label>
                <textarea
                  name="message"
                  rows={5}
                  value={fields.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  className={`w-full px-4 py-3 rounded-xl glass border text-sm outline-none transition-all duration-200 focus:border-[var(--brand)] resize-none ${
                    errors.message ? 'border-red-500/50' : 'border-[var(--border)]'
                  }`}
                  style={{ color: 'var(--text)', background: 'var(--surface-2)' }}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 rounded-xl font-display font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, var(--brand), var(--accent))', boxShadow: '0 0 20px var(--glow)' }}
              >
                <RiSendPlaneLine size={18} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
