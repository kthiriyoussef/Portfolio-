export type ProjectStoryStep = {
  title: string;
  description: string;
  dataFlow: string;
};

export type ProjectStoryNode = {
  name: string;
  role: string;
};

export type ProjectStoryLocale = {
  overview: string;
  audience: string;
  objective: string;
  contribution: string;
  challenge: string;
  steps: ProjectStoryStep[];
  flow: string;
  nodes: ProjectStoryNode[];
  galleryNote: string;
  statusNote?: string;
};

export type ProjectStory = Record<"en" | "fr", ProjectStoryLocale>;

export type ProjectStoryVisual =
  | "crm"
  | "warehouse"
  | "recruitment"
  | "health"
  | "learning"
  | "personalai";

export const projectStories: Partial<Record<ProjectStoryVisual, ProjectStory>> = {
  crm: {
    en: {
      overview: "A commercial CRM for managing prospects, customers, contacts, products and quotations at SNDP Tunisie — Agil Energy.",
      audience: "Commercial teams managing customer relationships and quotations.",
      objective: "Connect prospect follow-up, customer records and quotation workflows with secure, traceable operations.",
      contribution: "Developed prospect, customer, contact and quotation workflows; product and packaging management; commercial calculations; PDF quotation generation; role-based access and operation traceability.",
      challenge: "Keep prospect-to-customer conversion traceable while protecting commercial operations by role and recording changes through Spring AOP and MDC.",
      steps: [
        { title: "Manage a prospect", description: "The Angular client provides the commercial workflow for prospect and contact records.", dataFlow: "Angular client → Spring Boot REST API" },
        { title: "Convert and prepare a quotation", description: "The backend supports conversion, product and packaging selection, and commercial calculation workflows.", dataFlow: "REST request → Spring Boot business operations → MySQL" },
        { title: "Secure and document the operation", description: "Spring Security and JWT support role-based access; operation traceability uses Spring AOP and MDC.", dataFlow: "Role check → authorized operation → audit trace" },
        { title: "Generate the quotation", description: "The application generates a commercial quotation as a PDF.", dataFlow: "Quotation data → PDF document" },
      ],
      flow: "Angular client → Spring Boot REST API → MySQL",
      nodes: [
        { name: "Angular 18", role: "Commercial interface and workflow actions." },
        { name: "Spring Boot REST API", role: "Business operations and application endpoints." },
        { name: "Spring Security + JWT", role: "Authentication and role-based access control." },
        { name: "MySQL", role: "Relational persistence for CRM data." },
        { name: "Docker + GitLab CI/CD", role: "Containerization and automated build pipeline." },
      ],
      galleryNote: "Screenshots, repository and live demo were not included in the portfolio source.",
    },
    fr: {
      overview: "Un CRM commercial de gestion des prospects, clients, contacts, produits et devis chez SNDP Tunisie — Agil Energy.",
      audience: "Équipes commerciales chargées des relations clients et des devis.",
      objective: "Relier le suivi des prospects, les dossiers clients et les devis dans des opérations sécurisées et traçables.",
      contribution: "Développement des flux prospects, clients, contacts et devis ; gestion des produits et emballages ; calculs commerciaux ; génération PDF ; contrôle d'accès par rôles et traçabilité.",
      challenge: "Assurer la traçabilité de la conversion prospect-client, sécuriser les opérations par rôle et enregistrer les actions avec Spring AOP et MDC.",
      steps: [
        { title: "Gérer un prospect", description: "Le client Angular fournit les parcours commerciaux de gestion des prospects et contacts.", dataFlow: "Client Angular → API REST Spring Boot" },
        { title: "Convertir et préparer un devis", description: "Le backend prend en charge la conversion, le choix des produits et emballages et les calculs commerciaux.", dataFlow: "Requête REST → opérations Spring Boot → MySQL" },
        { title: "Sécuriser et tracer l'opération", description: "Spring Security et JWT permettent le contrôle d'accès par rôle ; la traçabilité utilise Spring AOP et MDC.", dataFlow: "Vérification du rôle → opération autorisée → journalisation" },
        { title: "Générer le devis", description: "L'application génère un devis commercial au format PDF.", dataFlow: "Données du devis → document PDF" },
      ],
      flow: "Client Angular → API REST Spring Boot → MySQL",
      nodes: [
        { name: "Angular 18", role: "Interface commerciale et actions métier." },
        { name: "API REST Spring Boot", role: "Opérations métier et endpoints applicatifs." },
        { name: "Spring Security + JWT", role: "Authentification et contrôle d'accès par rôle." },
        { name: "MySQL", role: "Persistance relationnelle des données CRM." },
        { name: "Docker + GitLab CI/CD", role: "Conteneurisation et automatisation du build." },
      ],
      galleryNote: "Aucune capture d'écran, dépôt ou démo n'était présent dans le portfolio.",
    },
  },
  warehouse: {
    en: {
      overview: "A warehouse and logistics management application developed for an industrial environment at Kromberg & Schubert.",
      audience: "Warehouse and production teams tracking product movement.",
      objective: "Support warehouse tracking and follow a product lifecycle from reception to production.",
      contribution: "Developed warehouse tracking functionality, product lifecycle tracking and REST API communication between the Angular frontend and Spring Boot backend.",
      challenge: "Represent warehouse-to-production movement in a web workflow; specific inventory rules and screen details were not provided.",
      steps: [
        { title: "Record warehouse activity", description: "The Angular application provides the web interface for warehouse tracking.", dataFlow: "Angular client → REST API" },
        { title: "Process the request", description: "Spring Boot exposes the backend used by the frontend to exchange application data.", dataFlow: "REST request → Spring Boot backend" },
        { title: "Track product lifecycle", description: "The workflow follows products from reception toward production, with data stored in MySQL.", dataFlow: "Backend → MySQL → updated tracking data" },
      ],
      flow: "Angular → Spring Boot REST API → MySQL",
      nodes: [
        { name: "Angular + Bootstrap", role: "Warehouse web interface." },
        { name: "REST API", role: "Frontend/backend communication." },
        { name: "Spring Boot", role: "Application backend." },
        { name: "MySQL", role: "Application database." },
      ],
      galleryNote: "Screenshots, repository and live demo were not included in the portfolio source.",
    },
    fr: {
      overview: "Une application web de gestion d'entrepôt et de logistique développée en milieu industriel chez Kromberg & Schubert.",
      audience: "Équipes d'entrepôt et de production qui suivent les mouvements des produits.",
      objective: "Gérer le suivi en entrepôt et le cycle de vie des produits, de la réception à la production.",
      contribution: "Développement du suivi d'entrepôt, du cycle de vie des produits et de la communication REST entre Angular et Spring Boot.",
      challenge: "Représenter les mouvements entre entrepôt et production ; les règles de stock et détails des écrans n'ont pas été précisés.",
      steps: [
        { title: "Enregistrer l'activité", description: "L'application Angular fournit l'interface web de suivi d'entrepôt.", dataFlow: "Client Angular → API REST" },
        { title: "Traiter la requête", description: "Spring Boot expose le backend utilisé par le frontend pour échanger les données.", dataFlow: "Requête REST → backend Spring Boot" },
        { title: "Suivre le cycle du produit", description: "Le flux suit les produits de la réception vers la production, avec les données stockées dans MySQL.", dataFlow: "Backend → MySQL → données de suivi mises à jour" },
      ],
      flow: "Angular → API REST Spring Boot → MySQL",
      nodes: [
        { name: "Angular + Bootstrap", role: "Interface web d'entrepôt." },
        { name: "API REST", role: "Communication frontend/backend." },
        { name: "Spring Boot", role: "Backend applicatif." },
        { name: "MySQL", role: "Base de données de l'application." },
      ],
      galleryNote: "Aucune capture d'écran, dépôt ou démo n'était présent dans le portfolio.",
    },
  },
  recruitment: {
    en: {
      overview: "A recruitment platform that uses natural language processing to analyze CVs and help organize candidate ranking.",
      audience: "Recruiters reviewing and comparing candidate profiles.",
      objective: "Extract and analyze candidate information from CVs and support recruitment scoring.",
      contribution: "Developed CV information extraction, candidate information analysis and recruitment scoring mechanisms, integrating a Flask NLP service with the Angular and Spring Boot application.",
      challenge: "Connect a Python NLP service to the Java application so extracted information can support candidate review and scoring.",
      steps: [
        { title: "Submit a CV", description: "A CV enters the recruitment application for processing.", dataFlow: "Angular → Spring Boot" },
        { title: "Extract information", description: "The Java backend integrates with a Flask service that performs NLP-based CV information extraction.", dataFlow: "Spring Boot → Flask / Python NLP" },
        { title: "Review a candidate profile", description: "Extracted information is analyzed and used in recruitment scoring mechanisms.", dataFlow: "NLP output → candidate analysis → scoring" },
      ],
      flow: "Angular → Spring Boot → Flask NLP service → MySQL",
      nodes: [
        { name: "Angular", role: "Recruitment interface." },
        { name: "Spring Boot", role: "Application backend and service integration." },
        { name: "Flask + Python", role: "NLP service for CV information processing." },
        { name: "MySQL", role: "Application database." },
      ],
      galleryNote: "Screenshots, repository and live demo were not included in the portfolio source.",
    },
    fr: {
      overview: "Une plateforme de recrutement utilisant le NLP pour analyser les CV et faciliter le classement des candidatures.",
      audience: "Recruteurs chargés d'examiner et de comparer les profils.",
      objective: "Extraire et analyser les informations des CV et faciliter la notation des candidatures.",
      contribution: "Développement de l'extraction d'informations des CV, de l'analyse des profils et des mécanismes de notation, avec intégration d'un service NLP Flask à l'application Angular et Spring Boot.",
      challenge: "Connecter un service NLP Python à l'application Java afin d'utiliser les informations extraites pour l'analyse des candidatures.",
      steps: [
        { title: "Soumettre un CV", description: "Un CV est transmis à la plateforme de recrutement pour traitement.", dataFlow: "Angular → Spring Boot" },
        { title: "Extraire les informations", description: "Le backend Java intègre un service Flask qui réalise l'extraction NLP des informations du CV.", dataFlow: "Spring Boot → Flask / NLP Python" },
        { title: "Examiner le profil", description: "Les informations extraites alimentent l'analyse du candidat et les mécanismes de notation.", dataFlow: "Résultat NLP → analyse du profil → notation" },
      ],
      flow: "Angular → Spring Boot → service NLP Flask → MySQL",
      nodes: [
        { name: "Angular", role: "Interface de recrutement." },
        { name: "Spring Boot", role: "Backend applicatif et intégration des services." },
        { name: "Flask + Python", role: "Service NLP de traitement des CV." },
        { name: "MySQL", role: "Base de données de l'application." },
      ],
      galleryNote: "Aucune capture d'écran, dépôt ou démo n'était présent dans le portfolio.",
    },
  },
  health: {
    en: {
      overview: "A multilingual healthcare orientation platform combining medical information retrieval with LLM-assisted, source-cited answers and pharmacist validation.",
      audience: "People seeking health information and pharmacists who validate orientation content.",
      objective: "Offer grounded, multilingual health orientation that points to relevant medical information and keeps a pharmacist in the validation loop.",
      contribution: "Designed a RAG-oriented solution using multilingual embeddings, dense retrieval and BM25, source citations, safety guardrails and pharmacist validation.",
      challenge: "Ground generated responses in retrieved medical sources, preserve citations and communicate the limits of an orientation tool.",
      steps: [
        { title: "Ask a question", description: "A user submits a symptom or health-information question for orientation.", dataFlow: "Question → FastAPI" },
        { title: "Find relevant information", description: "Multilingual embeddings and dense retrieval work alongside BM25 to find relevant medical documents.", dataFlow: "Question → embeddings → dense + BM25 retrieval" },
        { title: "Generate a grounded response", description: "Retrieved material is supplied to the language model so the response can include source citations.", dataFlow: "Relevant documents → LLM → cited response" },
        { title: "Apply safety validation", description: "Safety guardrails and pharmacist validation support responsible orientation.", dataFlow: "Citations + guardrails → pharmacist validation" },
      ],
      flow: "Question → embeddings → retrieval → medical documents → LLM → cited response → validation",
      nodes: [
        { name: "Angular", role: "User-facing orientation experience." },
        { name: "FastAPI + Python", role: "Backend for the orientation and retrieval workflow." },
        { name: "Dense retrieval + BM25", role: "Multilingual semantic and lexical document retrieval." },
        { name: "PostgreSQL", role: "Project database." },
        { name: "LLM + guardrails", role: "Generate a grounded response and apply safety constraints." },
        { name: "Pharmacist validation", role: "Human review in the orientation workflow." },
      ],
      galleryNote: "Screenshots, repository and live demo were not included in the portfolio source.",
    },
    fr: {
      overview: "Une plateforme multilingue d'orientation en santé combinant recherche d'informations médicales, réponses sourcées par LLM et validation par un pharmacien.",
      audience: "Personnes cherchant des informations de santé et pharmaciens validant le contenu d'orientation.",
      objective: "Proposer une orientation multilingue fondée sur des sources médicales pertinentes et conserver une validation par un pharmacien.",
      contribution: "Conception d'une solution orientée RAG avec embeddings multilingues, recherche dense et BM25, citations, garde-fous et validation par un pharmacien.",
      challenge: "Ancrer les réponses générées dans les sources médicales retrouvées, conserver les citations et expliquer les limites d'un outil d'orientation.",
      steps: [
        { title: "Poser une question", description: "L'utilisateur soumet un symptôme ou une question de santé pour obtenir une orientation.", dataFlow: "Question → FastAPI" },
        { title: "Rechercher des informations", description: "Les embeddings multilingues et la recherche dense complètent BM25 pour retrouver des documents pertinents.", dataFlow: "Question → embeddings → recherche dense + BM25" },
        { title: "Générer une réponse sourcée", description: "Les documents retrouvés sont transmis au modèle afin de produire une réponse avec citations.", dataFlow: "Documents pertinents → LLM → réponse citée" },
        { title: "Appliquer les validations", description: "Les garde-fous et la validation par un pharmacien contribuent à une orientation responsable.", dataFlow: "Citations + garde-fous → validation par un pharmacien" },
      ],
      flow: "Question → embeddings → recherche → documents médicaux → LLM → réponse sourcée → validation",
      nodes: [
        { name: "Angular", role: "Interface d'orientation utilisateur." },
        { name: "FastAPI + Python", role: "Backend du flux d'orientation et de recherche." },
        { name: "Recherche dense + BM25", role: "Recherche documentaire sémantique multilingue et lexicale." },
        { name: "PostgreSQL", role: "Base de données du projet." },
        { name: "LLM + garde-fous", role: "Génération d'une réponse fondée et contraintes de sécurité." },
        { name: "Validation pharmacien", role: "Relecture humaine dans le parcours d'orientation." },
      ],
      galleryNote: "Aucune capture d'écran, dépôt ou démo n'était présent dans le portfolio.",
    },
  },
  learning: {
    en: {
      overview: "A microservices-based e-learning and certification platform with learning workflows and AI-related features.",
      audience: "Learners and administrators using course, progress and certification workflows.",
      objective: "Bring course learning, certification and supporting recommendation features into one platform.",
      contribution: "Worked on a platform combining Angular, Spring Boot microservices, identity management, Python services and container-based delivery and monitoring.",
      challenge: "Coordinate service routing, discovery, configuration, identity, AI features and delivery across a distributed application.",
      steps: [
        { title: "Access the platform", description: "Learners use the Angular application and authenticate through Keycloak.", dataFlow: "Angular → Spring Cloud Gateway → Keycloak" },
        { title: "Use learning workflows", description: "Gateway-routed Spring Boot services support course, learning and certification workflows.", dataFlow: "Gateway → Spring Boot services → learning data" },
        { title: "Use AI-related features", description: "Flask services support recommendation, sentiment analysis and student dropout prediction.", dataFlow: "Spring Boot services ↔ Flask services" },
        { title: "Deliver and observe", description: "The described stack includes Jenkins, Docker, Kubernetes, Prometheus and Grafana.", dataFlow: "Jenkins → Docker / Kubernetes → Prometheus / Grafana" },
      ],
      flow: "Angular → Gateway → Spring Boot services ↔ Flask AI services",
      nodes: [
        { name: "Angular", role: "Learning platform frontend." },
        { name: "Spring Cloud Gateway", role: "Entry point for service communication." },
        { name: "Eureka + Config Server", role: "Service discovery and centralized configuration." },
        { name: "Spring Boot services", role: "Platform and learning workflows." },
        { name: "Keycloak", role: "Identity and authentication." },
        { name: "Flask", role: "Recommendation, sentiment and dropout-prediction services." },
        { name: "Jenkins + Docker + Kubernetes", role: "Build and container orchestration stack." },
        { name: "Prometheus + Grafana", role: "Monitoring and visualization." },
      ],
      galleryNote: "Screenshots, repository and live demo were not included in the portfolio source.",
    },
    fr: {
      overview: "Une plateforme e-learning et de certification fondée sur des microservices, avec parcours d'apprentissage et fonctionnalités d'IA.",
      audience: "Apprenants et administrateurs utilisant les parcours de cours, de suivi et de certification.",
      objective: "Réunir l'apprentissage, la certification et les fonctionnalités de recommandation dans une plateforme.",
      contribution: "Contribution à une plateforme combinant Angular, microservices Spring Boot, gestion d'identité, services Python et livraison et supervision conteneurisées.",
      challenge: "Coordonner le routage, la découverte et la configuration des services, l'identité, l'IA et la livraison d'une application distribuée.",
      steps: [
        { title: "Accéder à la plateforme", description: "Les apprenants utilisent l'application Angular et s'authentifient avec Keycloak.", dataFlow: "Angular → Spring Cloud Gateway → Keycloak" },
        { title: "Suivre les parcours d'apprentissage", description: "Les services Spring Boot routés par la gateway prennent en charge les cours et certifications.", dataFlow: "Gateway → services Spring Boot → données d'apprentissage" },
        { title: "Utiliser les fonctionnalités IA", description: "Des services Flask prennent en charge les recommandations, l'analyse de sentiment et la prédiction du décrochage.", dataFlow: "Services Spring Boot ↔ services Flask" },
        { title: "Livrer et observer", description: "La pile décrite comprend Jenkins, Docker, Kubernetes, Prometheus et Grafana.", dataFlow: "Jenkins → Docker / Kubernetes → Prometheus / Grafana" },
      ],
      flow: "Angular → Gateway → services Spring Boot ↔ services IA Flask",
      nodes: [
        { name: "Angular", role: "Frontend de la plateforme d'apprentissage." },
        { name: "Spring Cloud Gateway", role: "Point d'entrée de communication entre services." },
        { name: "Eureka + Config Server", role: "Découverte des services et configuration centralisée." },
        { name: "Services Spring Boot", role: "Parcours de la plateforme et d'apprentissage." },
        { name: "Keycloak", role: "Identité et authentification." },
        { name: "Flask", role: "Services de recommandation, sentiment et prédiction du décrochage." },
        { name: "Jenkins + Docker + Kubernetes", role: "Build et orchestration des conteneurs." },
        { name: "Prometheus + Grafana", role: "Supervision et visualisation." },
      ],
      galleryNote: "Aucune capture d'écran, dépôt ou démo n'était présent dans le portfolio.",
    },
  },
  personalai: {
    en: {
      overview: "A local-LLM assistant built around Ollama and Qwen with an extensible tool registry and permission-aware execution.",
      audience: "Users who want a local assistant with explicit control over tool actions.",
      objective: "Route requests through an agent lifecycle while keeping tool access modular and important actions approval-based.",
      contribution: "The supplied project brief describes local model integration, agent orchestration, a tool registry, permission management, approval-based execution, controlled file operations and automated testing.",
      challenge: "Balance useful tool execution with clear permissions, explicit approval for important actions and controlled file access.",
      steps: [
        { title: "Receive a request", description: "The agent receives a user request and prepares it for orchestration.", dataFlow: "User → agent orchestrator" },
        { title: "Select a model and tool", description: "The local Ollama / Qwen integration and tool registry support the agent's next action.", dataFlow: "Orchestrator → local model → tool registry" },
        { title: "Check permissions", description: "The permission layer distinguishes read-only and action-based tools; important actions require approval.", dataFlow: "Selected tool → permission check → approval when required" },
        { title: "Execute and respond", description: "An approved tool runs under controlled file-operation rules, and the result is returned to the user.", dataFlow: "Approved tool → execution result → response" },
      ],
      flow: "Request → orchestration → tool selection → permission / approval → execution → response",
      nodes: [
        { name: "Python agent", role: "Request handling and agent orchestration." },
        { name: "Ollama + Qwen", role: "Local language model integration described in the brief." },
        { name: "Tool registry", role: "Extensible tool registration and selection." },
        { name: "Permission manager", role: "Read-only versus action-based access and approval checks." },
        { name: "Controlled execution", role: "Tool execution, including controlled file operations." },
        { name: "Automated tests", role: "Testing is included in the supplied project scope." },
      ],
      galleryNote: "Screenshots, repository and live demo were not included in the portfolio source.",
      statusNote: "The source portfolio did not specify which integrations are implemented versus planned; confirm the status of each capability before publication.",
    },
    fr: {
      overview: "Un assistant local fondé sur Ollama et Qwen, doté d'un registre d'outils extensible et d'une exécution contrôlée par permissions.",
      audience: "Utilisateurs souhaitant un assistant local qui leur laisse le contrôle explicite des actions.",
      objective: "Orchestrer les requêtes tout en gardant les outils modulaires et les actions sensibles soumises à approbation.",
      contribution: "Le descriptif fourni mentionne l'intégration d'un modèle local, l'orchestration d'agent, un registre d'outils, la gestion des permissions, l'approbation des actions, le contrôle des fichiers et des tests automatisés.",
      challenge: "Concilier l'exécution utile des outils avec des permissions claires, l'approbation explicite des actions importantes et un accès contrôlé aux fichiers.",
      steps: [
        { title: "Recevoir une requête", description: "L'agent reçoit la demande utilisateur et la prépare pour l'orchestration.", dataFlow: "Utilisateur → orchestrateur d'agent" },
        { title: "Choisir un modèle et un outil", description: "L'intégration locale Ollama / Qwen et le registre d'outils aident à sélectionner l'action suivante.", dataFlow: "Orchestrateur → modèle local → registre d'outils" },
        { title: "Vérifier les permissions", description: "La couche de permissions distingue les outils en lecture seule des actions ; les actions importantes nécessitent une approbation.", dataFlow: "Outil sélectionné → contrôle → approbation si nécessaire" },
        { title: "Exécuter et répondre", description: "L'outil approuvé s'exécute selon les règles de contrôle des fichiers, puis le résultat est retourné.", dataFlow: "Outil approuvé → résultat → réponse" },
      ],
      flow: "Requête → orchestration → sélection → permission / approbation → exécution → réponse",
      nodes: [
        { name: "Agent Python", role: "Gestion des requêtes et orchestration." },
        { name: "Ollama + Qwen", role: "Intégration de modèle local mentionnée dans le descriptif." },
        { name: "Registre d'outils", role: "Enregistrement et sélection des outils extensibles." },
        { name: "Gestionnaire de permissions", role: "Accès lecture seule ou action et contrôles d'approbation." },
        { name: "Exécution contrôlée", role: "Exécution des outils, y compris les opérations sur les fichiers." },
        { name: "Tests automatisés", role: "Les tests font partie du périmètre fourni." },
      ],
      galleryNote: "Aucune capture d'écran, dépôt ou démo n'était présent dans le portfolio.",
      statusNote: "Le portfolio ne précisait pas quelles intégrations sont réalisées ou prévues ; leur état doit être confirmé avant publication.",
    },
  },
};
