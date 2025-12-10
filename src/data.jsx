import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';

export const sections = [
    {
        id: 'intro',
        title: 'Clerc Léo',
        subtitle: '22 ans | Étudiant BTS SIO',
        description: "Passionné par le potentiel des nouvelles technologies. Bienvenue dans mon système solaire.",
        planet: 'assets/real_earth.png',
        color: '#4db5ff',
        type: 'intro'
    },
    {
        id: 'about',
        title: 'Origine',
        subtitle: 'La Base',
        description: "Tout a commencé avec une passion pour les mathématiques et l'informatique. Aujourd'hui, je suis en route pour maîtriser l'intelligence artificielle.",
        planet: 'assets/real_mars.png',
        color: '#ff6b6b',
        type: 'info'
    },
    {
        id: 'timeline',
        title: 'Trajectoire',
        subtitle: 'Expérience',
        description: "Mon parcours académique et professionnel, une ascension constante.",
        planet: 'assets/real_jupiter.png',
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
        planet: 'assets/real_saturn.png',
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
        planet: 'assets/real_neptune.png',
        color: '#00bfff',
        type: 'projects',
        items: [
            {
                title: 'MtBeat',
                tech: 'Java Swing / SQL',
                desc: 'Solution collaborative de gestion de pauses déjeuner.',
                longDesc: "Conception complète d'une architecture N-Tiers en Java pur. \n\nArchitecture: implémentation stricte du pattern MVC pour découpler la logique métier de l'interface Swing.\n• Technique : Utilisation de JDBC avec le pattern DAO pour une persistance robuste. Création de composants graphiques personnalisés (Custom Renderers) pour une UI fluide.\n• Fonctionnel : Algorithme de pondération des votes pour le choix du restaurant et synchronisation multi-utilisateurs via base de données centralisée."
            },
            {
                title: 'RFTG Mobile',
                tech: 'Android / Java',
                desc: 'Application native Android de Vidéo à la Demande (VOD).',
                longDesc: "Développement natif orienté performance et UX sous Android Studio.\n\n Architecture : Pattern MVVM (Model-View-ViewModel) pour une testabilité accrue et une meilleure gestion du cycle de vie des Activités/Fragments.\n• Network : Consommation d'API RESTful via Retrofit avec gestion asynchrone des appels.\n• Performance : Optimisation des listes infinies avec RecyclerView et chargement différé des images (Lazy Loading).\n• Persistence : Implémentation de SQLite/Room pour le cache local et le mode hors-ligne."
            },
            {
                title: 'RFTG Admin',
                tech: 'Laravel / PHP',
                desc: 'Plateforme Web d\'Administration (Back-Office).',
                longDesc: "Création d'un écosystème d'administration puissant et sécurisé.\n\nBackend : Utilisation avancée de l'ORM Eloquent (Relations polymorphes, Scopes, Mutators) pour une manipulation de données complexe.\n• Sécurité : Système d'authentification et d'autorisation granulaires (Middlewares, Policies & Gates).\n• Frontend : Intégration de Chart.js pour la visualisation de données statistiques en temps réel et interface Blade modulaire."
            },
            {
                title: 'Portail Assurance',
                tech: 'Laravel / Docker',
                desc: 'Écosystème digital de gestion de contrats d\'assurance.',
                longDesc: "Intervention sur une infrastructure critique en environnement DevOps.\n\nDevOps : Conteneurisation complète de la stack applicative (Nginx, PHP-FPM, MySQL) via Docker Compose pour garantir la parité Dev/Prod.\n• Backend : Développement d'API robustes pour l'interconnexion avec des services tiers (Banque, CRM).\n• Qualité : Mise en place de tests unitaires (PHPUnit) et respect des standards PSR-12."
            },
            {
                title: 'Outils Internes',
                tech: 'Angular / API',
                desc: 'Modernisation et refonte d\'outils métiers (SPA).',
                longDesc: "Refonte architecturelle majeure vers une Single Page Application réactive.\n\nCore : Utilisation intensive de TypeScript et RxJS pour la gestion d'états asynchrones complexes (Observables, Subjects).\n• Architecture : Organisation modulaire avec Lazy Loading pour optimiser le temps de chargement initial (Time-to-Interactive).\n• Sécurité : Intercepteurs HTTP pour la gestion automatique des tokens JWT et sécurisation des routes (Guards)."
            }
        ]
    },
    {
        id: 'veille',
        title: 'Veille Techno',
        subtitle: 'L\'Intelligence Artificielle',
        description: "Comprendre le fonctionnement, l'apprentissage et la création des modèles d'IA modernes.",
        planet: 'assets/real_uranus.png',
        color: '#00ffff', // Cyan
        type: 'projects', // Reusing project card layout for detailed info
        items: [
            {
                title: 'Fonctionnement Global',
                tech: 'Réseaux de Neurones',
                desc: 'Comprendre comment l\'IA imite le cerveau humain.',
                longDesc: "Dans le cadre de ma veille technologique, je me suis intéressé au fonctionnement des réseaux de neurones artificiels (ANN). \n\nJ'ai analysé comment les données transitent à travers différentes couches (Entrée, Cachée, Sortie). \nCette approche diffère de la programmation algorithmique classique vue en cours : ici, on ne code pas la règle, on code la structure qui va déduire la règle."
            },
            {
                title: 'Apprentissage',
                tech: 'Machine Learning',
                desc: 'Comment un algorithme s\'améliore par l\'expérience.',
                longDesc: "J'ai étudié le concept de 'l'apprentissage supervisé'. Contrairement à nos projets de développement habituels où le comportement est statique, ici le programme évolue.\n\nJ'ai retenu le principe de la 'Backpropagation' : l'algorithme compare sa réponse à la réalité, calcule son erreur, et s'auto-corrige pour les prochaines fois. C'est fascinant de voir mathématiquement comment une machine 'apprend' de ses erreurs."
            },
            {
                title: 'Workflow de Développement',
                tech: 'Data & Modèles',
                desc: 'Les étapes clés pour concevoir une IA.',
                longDesc: "Pour mes futurs projets, j'ai identifié les étapes standards de création d'une IA :\n\nLa préparation des données (Data Cleaning) est cruciale et rejoint nos compétences en gestion de données (SQL).\nEnsuite vient le choix du modèle selon le problème (Image, Texte, Chiffres) et enfin l'entraînement.\nLa rigueur nécessaire dans la gestion des datasets me rappelle l'importance de l'intégrité des données dans nos bases relationnelles."
            },
            {
                title: 'Outils & Langages',
                tech: 'Écosystème Python',
                desc: 'Les technologies standards de l\'industrie.',
                longDesc: "J'ai pu constater que Python est le langage standard dans ce domaine, ce qui motive mon auto-formation sur ce langage en parallèle du BTS.\n\nLes bibliothèques comme TensorFlow ou Scikit-learn abstraient la complexité mathématique, permettant aux développeurs de se concentrer sur l'architecture logique. Cela ouvre des perspectives pour intégrer de l'IA dans des applications web ou mobiles classiques."
            }
        ]
    },
    {
        id: 'contact',
        title: 'Contact',
        subtitle: 'Transmission',
        description: "Prêt à rejoindre votre équipage. Envoyez un signal.",
        planet: 'assets/real_earth.png',
        color: '#ffffff',
        type: 'contact',
        links: [
            { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/Yourselffff' },
            { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/l%C3%A9o-clerc-209297304/' },
            { name: 'Email', icon: <FaEnvelope />, url: 'mailto:clercleopro@gmail.com' }
        ]
    }
];
