import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaRocket } from 'react-icons/fa';
import './index.css';

// Data Configuration
const sections = [
  {
    id: 'intro',
    title: 'Clerc Léo',
    subtitle: '22 ans | Étudiant BTS SIO',
    description: "Passionné par le potentiel des nouvelles technologies. Bienvenue dans mon système solaire.",
    planet: '/assets/real_earth.png',
    color: '#4db5ff',
    type: 'intro'
  },
  {
    id: 'about',
    title: 'Origine',
    subtitle: 'La Base',
    description: "Tout a commencé avec une passion pour les mathématiques et l'informatique. Aujourd'hui, je suis en route pour maîtriser l'intelligence artificielle.",
    planet: '/assets/real_mars.png',
    color: '#ff6b6b',
    type: 'info'
  },
  {
    id: 'experience',
    title: 'Trajectoire',
    subtitle: 'Expérience',
    description: "Mon parcours académique et professionnel, une ascension constante.",
    planet: '/assets/real_jupiter.png',
    color: '#ff8c00',
    type: 'timeline',
    items: [
      { year: '2019', role: 'Prix d\'Or Xperium', desc: 'Lauréat du concours à l\'Université de Lille. Distinction obtenue pour un projet lycéen innovant.' },
      { year: '2023', role: 'Bac Général', desc: 'Spécialités Mathématiques & NSI - Mention Bien.' },
      { year: '2023 - Présent', role: 'BTS SIO Option SLAM', desc: 'Formation académique en développement logiciel (Java, SQL, Web) en parallèle de l\'alternance.' },
      { year: '2023 - Présent', role: 'Alternance MTB by Creative', desc: 'Développeur Fullstack. Projets Laravel & Java (Assurance, Outils internes, Gestion repas). Maintenance et évolution d\'architectures logicielles.' }
    ]
  },
  {
    id: 'skills',
    title: 'Arsenal',
    subtitle: 'Compétences',
    description: "Technologies acquises en milieu scolaire et professionnel.",
    planet: '/assets/real_saturn.png',
    color: '#ffd700',
    type: 'skills',
    categories: [
      { title: 'Langages & Core', skills: ['Java', 'Python', 'PHP', 'JavaScript', 'SQL'] },
      { title: 'Frameworks & Web', skills: ['Laravel', 'Angular', 'HTML/CSS'] },
      { title: "Bases de Données", skills: ['MySQL', 'MongoDB', 'OrientDB'] },
      { title: 'Outils & Autres', skills: ['Docker', 'Git', 'Android Studio'] }
    ]
  },
  {
    id: 'projects',
    title: 'Missions',
    subtitle: 'Projets Réalisés',
    description: "Déploiement réussi de solutions concrètes.",
    planet: '/assets/real_neptune.png',
    color: '#00bfff',
    type: 'projects',
    items: [
      { title: 'MtBeat', tech: 'Java Swing / SQL', desc: 'Application de gestion de repas entre collègues.', longDesc: "Projet de groupe réalisé dans le cadre du cours d'ADP (Analyse et Développement de Projets). L'objectif était de concevoir une application lourde complète en Java pour faciliter l'organisation des repas du midi entre collègues. Gestion des votes, des lieux et des participations." },
      { title: 'Portail Assurance', tech: 'Laravel / Docker', desc: 'Application web complète pour la gestion de contrats d\'assurance.', longDesc: "Développement en entreprise pour répondre à des besoins clients spécifiques. Le projet inclut la gestion du cycle de vie des contrats d'assurance et la maintenance évolutive de l'application existante sous Docker." },
      { title: 'Outils Internes', tech: 'Angular / API', desc: 'Refonte applications internes en Web App Fullstack.', longDesc: "Développement et modernisation des outils internes de l'entreprise. Utilisation du framework Angular pour créer une interface web reactive (Single Page Application) et optimiser les flux métiers, en remplacement d'anciennes solutions." }
    ]
  },
  {
    id: 'veille',
    title: 'Veille Techno',
    subtitle: 'L\'Intelligence Artificielle',
    description: "Comprendre le fonctionnement, l'apprentissage et la création des modèles d'IA modernes.",
    planet: '/assets/real_uranus.png',
    color: '#00ffff', // Cyan
    type: 'projects', // Reusing project card layout for detailed info
    items: [
      { title: 'Fonctionnement Global', tech: 'Réseaux de Neurones', desc: 'Imitation du cerveau humain via des couches de neurones artificiels. Chaque neurone traite une information et la transmet pondérée aux suivants.' },
      { title: 'Apprentissage (Deep Learning)', tech: 'Training', desc: 'Le modèle apprend par l\'expérience sur de grands datasets. Ajustement des "poids" synaptiques par rétropropagation de l\'erreur.' },
      { title: 'Création d\'une IA', tech: 'Workflow', desc: '1. Collecte & Nettoyage des Données (Big Data). \n2. Choix de l\'architecture (CNN, RNN, Transformers). \n3. Entraînement & Validation.' },
      { title: 'Technologies Phares', tech: 'Stack', desc: 'Python est le langage roi, appuyé par des bibliothèques puissantes comme TensorFlow, PyTorch et Scikit-learn.' }
    ]
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: 'Transmission',
    description: "Prêt à rejoindre votre équipage. Envoyez un signal.",
    planet: '/assets/real_earth.png',
    color: '#ffffff',
    type: 'contact',
    links: [
      { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com' },
      { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com' },
      { name: 'Email', icon: <FaEnvelope />, url: 'mailto:contact@example.com' }
    ]
  }
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isTransitioning = useRef(false);

  // Wheel Handler
  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning.current) return;

      // Check if scroll event happens inside the text content
      const textContent = e.target.closest('.text-content');
      if (textContent) {
        const { scrollTop, scrollHeight, clientHeight } = textContent;
        const isAtTop = scrollTop === 0;
        const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        // If scrolling down and NOT at bottom, let it scroll text
        if (e.deltaY > 0 && !isAtBottom) return;

        // If scrolling up and NOT at top, let it scroll text
        if (e.deltaY < 0 && !isAtTop) return;
      }

      const threshold = 30; // Minimum scroll delta
      if (Math.abs(e.deltaY) < threshold) return;

      if (e.deltaY > 0) {
        // Scroll Down -> Next
        if (index < sections.length - 1) {
          setDirection(1);
          setIndex(prev => prev + 1);
          lockScroll();
        }
      } else {
        // Scroll Up -> Prev
        if (index > 0) {
          setDirection(-1);
          setIndex(prev => prev - 1);
          lockScroll();
        }
      }
    };

    const lockScroll = () => {
      isTransitioning.current = true;
      setTimeout(() => {
        isTransitioning.current = false;
      }, 1200); // Lock duration for smoother transition
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [index]);

  // Click Handler for Dots
  const goToSection = (i) => {
    if (isTransitioning.current || i === index) return;
    setDirection(i > index ? 1 : -1);
    setIndex(i);
    // Lock scroll briefly to prevent double trigger
    isTransitioning.current = true;
    setTimeout(() => { isTransitioning.current = false; }, 1000);
  };

  return (
    <div className="app-container">
      <div className="stars-bg">
        <div className="overlay" />
      </div>

      {/* Navigation Dots */}
      <div className="nav-dots">
        {sections.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => goToSection(i)}
            title={sections[i].title}
          />
        ))}
      </div>

      <AnimatePresence mode='wait' custom={direction}>
        <Section key={index} data={sections[index]} direction={direction} />
      </AnimatePresence>
    </div>
  );
}

const Section = ({ data, direction }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  // Animation variants
  const variants = {
    enter: (direction) => ({
      y: direction > 0 ? '100vh' : '-100vh',
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      y: direction < 0 ? '100vh' : '-100vh',
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const textVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: (delay) => ({
      x: 0,
      opacity: 1,
      transition: { delay, duration: 0.6, ease: "easeOut" }
    })
  };

  return (
    <motion.div
      className="section"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <div className="content-wrapper">
        <div
          className="text-content"
          style={{ borderTop: `1px solid ${data.color}40`, boxShadow: `0 20px 50px -20px ${data.color}20` }}
        >
          <motion.h2
            custom={0.3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            style={{ color: data.color }}
          >
            {data.title}
          </motion.h2>
          <motion.h1
            custom={0.4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {data.subtitle}
          </motion.h1>
          <motion.p
            custom={0.5}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {data.description}
          </motion.p>

          {/* Skills Grid - New Layout */}
          {data.type === 'skills' && (
            <motion.div
              custom={0.6}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {data.categories.map((cat, idx) => (
                <div key={idx} className="skill-category">
                  <div className="skill-category-title">{cat.title}</div>
                  <div className="skills-grid">
                    {cat.skills.map(skill => (
                      <div key={skill} className="skill-tag">
                        <FaCode size={12} color={data.color} /> {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Timeline (Experience) - Improved */}
          {data.type === 'timeline' && (
            <motion.div
              custom={0.6}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              {data.items.map((item, idx) => (
                <div key={idx} className="timeline-item" style={{ color: data.color }}>
                  <span className="timeline-year">{item.year}</span>
                  <h4 className="timeline-role">{item.role}</h4>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Projects - List Cards */}
          {data.type === 'projects' && (
            <motion.div
              custom={0.6}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="project-list"
            >
              {data.items.map((item, idx) => (
                <div
                  key={idx}
                  className="project-card"
                  onClick={() => setExpandedItem(item)} // Open modal
                >
                  <div className="project-header">
                    <div className="project-title">{item.title}</div>
                    <div className="project-tech" style={{ color: data.color }}>{item.tech}</div>
                  </div>
                  <div className="project-desc">{item.desc}</div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Contact Links */}
          {data.type === 'contact' && (
            <motion.div
              style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}
              custom={0.6}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              {data.links && data.links.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  {link.icon} {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </div>

        <div className="planet-container">
          <motion.img
            src={data.planet}
            alt="planet"
            className="planet-img"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 180,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <div className="planet-glow" style={{ background: data.color }} />
        </div>
      </div>
    </motion.div>
  )
}
