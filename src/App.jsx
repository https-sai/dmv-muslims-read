import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './index.css'

// ── Data ──────────────────────────────────────────────────────────────────────

const books = {
  hadith: [
    {
      title: 'Al-Adab Al-Mufrad',
      author: 'Imam al-Bukhari',
      desc: "A dedicated collection focusing exclusively on Islamic ethics, manners, and social etiquette — a beautiful companion for anyone looking to refine how they move through the world.",
    },
    {
      title: 'Riyadh As-Saliheen',
      author: 'Imam al-Nawawi',
      desc: "A curated guide that organizes essential traditions into practical chapters for daily spiritual and moral development.",
    },
    {
      title: 'Al-Arbain an-Nawawiyyah',
      author: 'Imam al-Nawawi',
      desc: "A concise compilation of 42 foundational traditions that encapsulate the core principles of Islamic faith and jurisprudence.",
    },
  ],
  seerah: [
    {
      title: 'The Sealed Nectar (Ar-Raheeq Al-Makhtum)',
      author: 'Safi-ur-Rahman al-Mubarakpuri',
      desc: "Winner of a worldwide Seerah competition. A detailed, chronological account of the Prophet's life based strictly on the earliest authentic sources.",
      link: 'https://www.amazon.com/Ar-Raheeq-Al-Makhtum-Sealed-Nectar-Biography/dp/1591440718',
    },
    {
      title: 'The Sirah of the Prophet ﷺ',
      author: 'Dr. Yasir Qadhi',
      desc: "Rigorous context comparing historical reports, verifying sources, and exploring how specific events align with the Quran.",
    },
  ],
  spiritual: [
    {
      title: 'Secrets of Divine Love',
      author: 'A. Helwa',
      desc: "A poetic, deeply reassuring exploration of Islamic mysticism that addresses feelings of spiritual inadequacy. Excellent for heart-centered group reflection.",
      link: 'https://www.google.com/search?q=secrets+of+divine+love',
    },
    {
      title: 'Reclaim Your Heart',
      author: 'Yasmin Mogahed',
      desc: "Insights focused on breaking free from worldly attachments and emotional shackles. Highly relatable for twenty-somethings navigating early-career burnout and relationship dynamics.",
      link: 'https://www.google.com/search?q=reclaim+your+heart+yasmin+mogahed',
    },
    {
      title: 'In the Early Hours',
      author: 'Khurram Murad',
      desc: "A punchy, action-oriented handbook filled with practical advice on building routine, self-discipline, and consistent spiritual habits.",
    },
    {
      title: 'Purification of the Heart',
      author: 'Shaykh Hamza Yusuf',
      desc: "A translation and commentary on Imam al-Mawlud's poem on the spiritual diseases of the heart — envy, pride, malice. Deep psychological root-cause breakdowns.",
      link: 'https://www.google.com/search?q=purification+of+the+heart+hamza+yusuf',
    },
    {
      title: 'Being Muslim: A Practical Guide',
      author: 'Asad Tarsin',
      desc: "A grounded, readable guide to living Islam practically — great for newer Muslims and those revisiting the basics.",
      link: 'https://yale.imodules.com/s/1667/images/gid6/editor_documents/life_worth_living/tarsin.pdf',
    },
  ],
  fiction: [
    {
      title: 'As Long as the Lemon Trees Grow',
      author: 'Zoulfa Katouh',
      desc: "A speculative, deeply moving contemporary novel set during the Syrian revolution. Sparks intense dialogue about trauma, faith, and hope.",
      link: 'https://www.google.com/search?q=as+long+as+the+lemon+trees+grow',
    },
    {
      title: 'The City of Brass',
      author: 'S.A. Chakraborty',
      desc: "An alternate-history fantasy deeply rooted in Islamic folklore and djinn mythology. Ideal for a lighter, plot-driven month with a rich Muslim cultural backdrop.",
      link: 'https://www.google.com/search?q=the+city+of+brass',
    },
    {
      title: 'Between Two Moons',
      author: 'Aisha Abdel Gawad',
      desc: "A sharp coming-of-age story centered on Muslim teenagers in New York during Ramadan. Tackles family accountability, surveillance, and religious identity.",
      link: 'https://www.google.com/search?q=between+two+moons+aisha+abdel+gawad',
    },
  ],
  memoir: [
    {
      title: 'The Autobiography of Malcolm X',
      author: 'Malcolm X with Alex Haley',
      desc: "A non-negotiable masterpiece tracking one of the most significant spiritual and political transformations of the 20th century. A powerful anchor for discussing race, justice, and the global Ummah.",
      link: 'https://www.google.com/search?q=autobiography+of+malcolm+x',
    },
    {
      title: 'Lost Islamic History',
      author: 'Firas Alkhateeb',
      desc: "A condensed chronicle of 1,400 years of Muslim civilization. Structured perfectly for chapter-by-chapter discussion without a heavy academic background.",
      link: 'https://www.google.com/search?q=lost+islamic+history+firas+alkhateeb',
    },
    {
      title: 'The Butterfly Mosque',
      author: 'G. Willow Wilson',
      desc: "A nuanced memoir by an American comic-book writer detailing her conversion to Islam, her move to Egypt, and the cross-cultural tensions that followed.",
      link: 'https://www.google.com/search?q=the+butterfly+mosque',
    },
  ],
}

const categoryMeta = {
  hadith: { label: 'Hadith Collections', color: '#D4A437', bg: 'rgba(212,164,55,0.12)' },
  seerah: { label: 'Seerah', color: '#5C8D89', bg: 'rgba(92,141,137,0.12)' },
  spiritual: { label: 'Spiritual Growth & Tazkiyah', color: '#D97B85', bg: 'rgba(217,123,133,0.12)' },
  fiction: { label: 'Contemporary Fiction & Identity', color: '#8BAF8B', bg: 'rgba(139,175,139,0.15)' },
  memoir: { label: 'Memoir & History', color: '#C56B4E', bg: 'rgba(197,107,78,0.12)' },
}

const sessionSchedule = [
  { item: 'Summary + presentation', time: '~5 min' },
  { item: 'Group prompts', time: '~30 min' },
  { item: 'Open floor for Qs + comments', time: '~30 min' },
  { item: 'Subgroup prompts', time: '~30 min' },
  { item: 'Closing comments + decide next month\'s reading + discussion leader', time: '~30 min' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function Nav({ activeSection }) {
  const links = [
    { id: 'about', label: 'About' },
    { id: 'books', label: 'Books' },
    { id: 'structure', label: 'How It Works' },
    { id: 'location', label: 'Location' },
    { id: 'join', label: 'Join Us' },
  ]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(255,248,240,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(242,196,206,0.4)' }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          className="font-bold text-lg tracking-tight"
          style={{ fontFamily: "'DM Serif Display', serif", color: 'var(--warm-brown)' }}
        >
          dmv muslims read
        </button>
        <div className="hidden md:flex items-center gap-7">
          {links.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="nav-link text-sm font-600 transition-colors"
              style={{
                color: activeSection === id ? 'var(--rose)' : 'var(--warm-brown)',
                fontWeight: activeSection === id ? '700' : '500',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

function StarDeco({ size = 16, color = 'var(--blush)', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={style}>
      <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill={color} />
    </svg>
  )
}

function BookCard({ book, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="book-card rounded-2xl p-5 flex flex-col gap-2"
      style={{ background: 'white', border: '1.5px solid rgba(242,196,206,0.4)' }}
    >
      <p className="font-bold text-base leading-snug" style={{ color: 'var(--warm-brown)', fontFamily: "'DM Serif Display', serif" }}>
        {book.title}
      </p>
      <p className="text-xs font-600" style={{ color: 'var(--rose)' }}>{book.author}</p>
      <p className="text-sm leading-relaxed mt-1" style={{ color: '#7a5a48' }}>{book.desc}</p>
      {book.link && (
        <a
          href={book.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-700 mt-1 self-start"
          style={{ color: 'var(--dusty-teal)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          Learn more
        </a>
      )}
    </motion.div>
  )
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid rgba(242,196,206,0.5)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
        style={{ background: open ? 'var(--parchment)' : 'white' }}
      >
        <span className="font-700 text-base" style={{ color: 'var(--warm-brown)', fontFamily: "'DM Serif Display', serif" }}>{title}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xl font-300"
          style={{ color: 'var(--rose)', lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden', background: 'white' }}
          >
            <div className="px-6 pb-5 pt-2" style={{ color: '#7a5a48' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [activeCategory, setActiveCategory] = useState('spiritual')

  useEffect(() => {
    const sections = ['hero', 'about', 'books', 'structure', 'location', 'join']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.4 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <Nav activeSection={activeSection} />

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pattern-bg pointer-events-none" />

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 left-12 opacity-40"
        >
          <StarDeco size={28} color="var(--gold)" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-48 right-16 opacity-30"
        >
          <StarDeco size={20} color="var(--rose)" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-40 left-20 opacity-25"
        >
          <StarDeco size={36} color="var(--sage)" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-32 right-24 opacity-35"
        >
          <StarDeco size={24} color="var(--terracotta)" />
        </motion.div>

        {/* Quran icon */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="mb-6"
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--blush), var(--rose))', boxShadow: '0 8px 24px rgba(217,123,133,0.35)' }}
          >
            📖
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="tag mb-4"
          style={{ background: 'rgba(212,164,55,0.15)', color: 'var(--gold)' }}
        >
          the DMV's first muslim book club
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-6xl md:text-8xl font-normal mb-5 leading-none"
          style={{ color: 'var(--warm-brown)' }}
        >
          dmv muslims
          <br />
          <span style={{ color: 'var(--rose)', fontStyle: 'italic' }}>read</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg max-w-xl leading-relaxed mb-10"
          style={{ color: '#9a7a6a' }}
        >
          Open to all — but mainly looking for curious minds and original thoughts.
          <br />
          <span className="text-sm italic">*we turn a blind eye to digital piracy</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <button
            onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 rounded-full font-700 text-white shadow-md transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, var(--rose), var(--terracotta))', boxShadow: '0 4px 16px rgba(197,107,78,0.35)' }}
          >
            Join the Club
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 rounded-full font-700 transition-transform hover:scale-105"
            style={{ border: '2px solid var(--blush)', color: 'var(--warm-brown)', background: 'white' }}
          >
            Learn More
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40"
          style={{ color: 'var(--rose)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <StarDeco size={14} color="var(--gold)" />
              <p className="tag" style={{ background: 'rgba(212,164,55,0.15)', color: 'var(--gold)' }}>our story</p>
            </div>
            <h2 className="text-5xl mb-8" style={{ color: 'var(--warm-brown)' }}>Why We Read</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl p-8 md:p-10 mb-8"
            style={{ background: 'var(--parchment)', border: '1.5px solid rgba(212,164,55,0.25)' }}
          >
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--warm-brown)' }}>
              The first thing Allah (swt) told the Prophet to do was <em>read</em>.
            </p>
            <p className="leading-relaxed mb-5" style={{ color: '#7a5a48' }}>
              As Muslims, our journey into the religion begins through reading — the <strong>Quran</strong> as the <em>what</em>, <strong>Hadith</strong> as the <em>how</em>, <strong>Seerah</strong> as the <em>why</em>. The harder work is applying what we learn back into our own lives. Being Muslim is not just about completing the <strong>Fiqh</strong>; it comes down to how we adopt concepts like Tawakkul, Tasawwuf, Tazkiyah, Adhab, Nafs — things that are hard to implement and understand without reading further into actual human thoughts and experiences.
            </p>
            <p className="leading-relaxed mb-5" style={{ color: '#7a5a48' }}>
              Imam Al-Ghazali's <em>Revival of the Religious Sciences</em> established frameworks for human behavior and ethics that modern psychology took centuries to arrive at independently. Rumi's writings on Tasawwuf, love, and contentment demonstrate that Islam is a religion of reflection and purpose, not just obligation. Malcolm X's autobiography shows how Islam can transform a person, shape worldviews, and support a movement like the Civil Rights Movement.
            </p>
            <p className="leading-relaxed" style={{ color: '#7a5a48' }}>
              Reading gives us new ways to relate to Islam and depend on it — to structure your priorities, handle hardship, carry yourself around others, and understand the world around you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(217,123,133,0.12), rgba(139,175,139,0.12))', border: '1.5px solid rgba(217,123,133,0.2)' }}
          >
            <p className="text-lg leading-relaxed" style={{ color: 'var(--warm-brown)' }}>
              We want a space to discuss, compare, challenge, and come to conclusions together — where people don't hesitate to share their thoughts, where they're open to learning from others, and where we move with the intention of becoming better readers, listeners, researchers, and closer to the deen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Books ── */}
      <section id="books" className="py-24 px-6" style={{ background: 'var(--parchment)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <StarDeco size={14} color="var(--rose)" />
              <p className="tag" style={{ background: 'rgba(217,123,133,0.15)', color: 'var(--rose)' }}>reading list</p>
            </div>
            <h2 className="text-5xl mb-4" style={{ color: 'var(--warm-brown)' }}>Potential Books</h2>
            <p style={{ color: '#9a7a6a' }}>A curated selection across topics — pick what speaks to you.</p>
          </motion.div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {Object.entries(categoryMeta).map(([key, meta]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className="px-4 py-2 rounded-full text-sm font-700 transition-all"
                style={{
                  background: activeCategory === key ? meta.color : 'white',
                  color: activeCategory === key ? 'white' : meta.color,
                  border: `2px solid ${meta.color}`,
                  transform: activeCategory === key ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {meta.label}
              </button>
            ))}
          </div>

          {/* Books grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {books[activeCategory].map((book, i) => (
                <BookCard key={book.title} book={book} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Discussion Structure ── */}
      <section id="structure" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <StarDeco size={14} color="var(--sage)" />
              <p className="tag" style={{ background: 'rgba(139,175,139,0.2)', color: '#5a8a5a' }}>how it works</p>
            </div>
            <h2 className="text-5xl mb-4" style={{ color: 'var(--warm-brown)' }}>Discussion Structure</h2>
            <p style={{ color: '#9a7a6a' }}>Monthly meetings, in-person + virtual. Here's what a session looks like.</p>
          </motion.div>

          <div className="flex flex-col gap-4 mb-12">
            {[
              {
                icon: '📝',
                title: 'Pre-Meeting Prompts',
                body: 'Everyone submits a question or topic for discussion at least 3 days prior to the meeting. A new form for submissions is created on the Notion page before each meeting.',
              },
              {
                icon: '🎤',
                title: 'Discussion Leader',
                body: 'The discussion leader gives a 5-min presentation + summary of the reading — use visuals, reference quotes, touch on the most important/notable concepts that spoke to you. Then leads group discussion, maintains time, engages everyone, and keeps conversation on topic.',
              },
              {
                icon: '👥',
                title: 'Subgroups',
                body: 'We break off into groups of 3–5 people. Some prompts will be used for smaller group discussion segments to allow people to participate with less pressure.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 rounded-2xl p-6"
                style={{ background: 'white', border: '1.5px solid rgba(242,196,206,0.4)' }}
              >
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-700 mb-1" style={{ color: 'var(--warm-brown)', fontFamily: "'DM Serif Display', serif", fontSize: '1.05rem' }}>{item.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#7a5a48' }}>{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Session timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden"
            style={{ border: '1.5px solid rgba(212,164,55,0.3)' }}
          >
            <div className="px-6 py-4" style={{ background: 'var(--parchment)' }}>
              <p className="font-700" style={{ color: 'var(--warm-brown)', fontFamily: "'DM Serif Display', serif", fontSize: '1.1rem' }}>
                Hypothetical 2-Hour Session
              </p>
            </div>
            {sessionSchedule.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4"
                style={{
                  background: i % 2 === 0 ? 'white' : 'rgba(255,248,240,0.6)',
                  borderTop: '1px solid rgba(242,196,206,0.3)',
                }}
              >
                <span className="text-sm" style={{ color: '#7a5a48' }}>{row.item}</span>
                <span className="tag ml-4 flex-shrink-0" style={{ background: 'rgba(217,123,133,0.12)', color: 'var(--rose)' }}>{row.time}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Location ── */}
      <section id="location" className="py-24 px-6" style={{ background: 'var(--parchment)' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <StarDeco size={14} color="var(--dusty-teal)" />
              <p className="tag" style={{ background: 'rgba(92,141,137,0.15)', color: 'var(--dusty-teal)' }}>where to find us</p>
            </div>
            <h2 className="text-5xl mb-4" style={{ color: 'var(--warm-brown)' }}>Location</h2>
            <p style={{ color: '#9a7a6a' }}>
              Monthly meetings at <strong style={{ color: 'var(--warm-brown)' }}>Cube Coffee MD</strong> in person, and virtually via Google Meet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-md mb-6"
            style={{ border: '1.5px solid rgba(92,141,137,0.3)' }}
          >
            <iframe
              title="Cube Coffee MD location"
              width="100%"
              height="380"
              style={{ display: 'block', border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3106.1243887698!2d-76.80256422404145!3d39.0762583715464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7e087e5f78a23%3A0xaddb8048da99e57b!2sCube%20Coffee!5e0!3m2!1sen!2sus!4v1748305789020!5m2!1sen!2sus"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://maps.google.com/?q=Cube+Coffee+MD"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center gap-3 rounded-2xl p-5 transition-transform hover:scale-[1.02]"
              style={{ background: 'white', border: '1.5px solid rgba(92,141,137,0.3)', textDecoration: 'none' }}
            >
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-700 text-sm" style={{ color: 'var(--warm-brown)' }}>Cube Coffee MD</p>
                <p className="text-xs" style={{ color: '#9a7a6a' }}>In-person meetings</p>
              </div>
            </a>
            <a
              href="https://meet.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center gap-3 rounded-2xl p-5 transition-transform hover:scale-[1.02]"
              style={{ background: 'white', border: '1.5px solid rgba(92,141,137,0.3)', textDecoration: 'none' }}
            >
              <span className="text-2xl">💻</span>
              <div>
                <p className="font-700 text-sm" style={{ color: 'var(--warm-brown)' }}>Google Meet</p>
                <p className="text-xs" style={{ color: '#9a7a6a' }}>Virtual option available</p>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Join ── */}
      <section id="join" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <StarDeco size={14} color="var(--terracotta)" />
              <p className="tag" style={{ background: 'rgba(197,107,78,0.12)', color: 'var(--terracotta)' }}>get involved</p>
            </div>
            <h2 className="text-5xl mb-4" style={{ color: 'var(--warm-brown)' }}>Join Us</h2>
            <p style={{ color: '#9a7a6a' }}>Fill out the interest form below and we'll be in touch.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-md"
            style={{ border: '1.5px solid rgba(197,107,78,0.25)' }}
          >
            <iframe
              src="https://sahmed21.notion.site/ebd//36c2d237a82280a5a4c4e4ff31590950"
              width="100%"
              height="600"
              frameBorder="0"
              allowFullScreen
              title="DMV Muslims Read Interest Form"
              style={{ display: 'block' }}
            />
          </motion.div>

          {/* Social / connect links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 text-center"
          >
            <p className="text-sm mb-4" style={{ color: '#9a7a6a' }}>or connect with us on</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/dmvmuslimsread/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-700 text-sm transition-transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', color: 'white', textDecoration: 'none' }}
              >
                Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 text-center px-6" style={{ background: 'var(--warm-brown)', color: 'rgba(255,248,240,0.7)' }}>
        <p className="serif italic text-2xl mb-2" style={{ color: 'var(--blush)' }}>dmv muslims read</p>
        <p className="text-sm">The first Muslim book club in the DMV. Open to all curious minds.</p>
        <div className="flex justify-center gap-2 mt-4 opacity-50">
          <StarDeco size={10} color="var(--blush)" />
          <StarDeco size={10} color="var(--blush)" />
          <StarDeco size={10} color="var(--blush)" />
        </div>
      </footer>
    </div>
  )
}
