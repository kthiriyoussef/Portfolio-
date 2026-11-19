"use client";

import { useReducer } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardList,
  FileText,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { Locale } from "@/lib/portfolio-data";

type Prospect = {
  id: string;
  company: string;
  contact: string;
  interest: string;
  status: "New" | "Qualified" | "Converted";
};

type Customer = {
  id: string;
  company: string;
  sourceProspectId: string;
};

type Quote = {
  reference: string;
  customer: string;
  item: string;
  quantity: number;
  unitPrice: number;
};

type ArchitectureNode = {
  name: string;
  role: string;
  link: string;
};

type InteractionDetails = {
  action: string;
  component: string;
  api: string;
  rule: string;
  database: string;
};

type AuditEntry = {
  id: number;
  action: string;
  record: string;
};

type WorkspaceState = {
  view: "dashboard" | "prospects" | "customers" | "quotations" | "access";
  prospects: Prospect[];
  customers: Customer[];
  selectedProspectId: string;
  role: "operator" | "read-only";
  quote: Quote | null;
  interaction: InteractionDetails;
  audit: AuditEntry[];
};

type WorkspaceAction =
  | { type: "view"; view: WorkspaceState["view"] }
  | { type: "select-prospect"; prospectId: string }
  | { type: "role"; role: WorkspaceState["role"] }
  | { type: "convert-prospect" }
  | { type: "create-quote" };

const simulatedProspects: Prospect[] = [
  { id: "P-1042", company: "Sahara Industries", contact: "Nadia Ben Salem", interest: "Commercial supply", status: "Qualified" },
  { id: "P-1043", company: "Atlas Distribution", contact: "Karim Mansour", interest: "Bulk products", status: "New" },
  { id: "P-1044", company: "Carthage Energy", contact: "Ines Trabelsi", interest: "Commercial supply", status: "New" },
];

const initialInteraction: InteractionDetails = {
  action: "Select a prospect to inspect the simulated record.",
  component: "ProspectWorkspaceComponent (conceptual Angular component; source component name not supplied).",
  api: "Conceptual read operation: GET /api/prospects/{id}. Exact endpoint not supplied.",
  rule: "Display prospect and contact details for commercial follow-up.",
  database: "Represent a read of prospect and contact records from MySQL; exact schema not supplied.",
};

function createAuditEntry(
  audit: AuditEntry[],
  action: string,
  record: string,
): AuditEntry[] {
  return [{ id: (audit[0]?.id ?? 0) + 1, action, record }, ...audit];
}

function reducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  if (action.type === "view") return { ...state, view: action.view };

  if (action.type === "select-prospect") {
    const prospect = state.prospects.find((item) => item.id === action.prospectId);
    if (!prospect) return state;
    return {
      ...state,
      selectedProspectId: prospect.id,
      interaction: {
        action: `Inspect prospect ${prospect.company}.`,
        component: "ProspectWorkspaceComponent → ProspectDetailPanel (conceptual Angular component names).",
        api: `Conceptual read operation: GET /api/prospects/${prospect.id}. Exact endpoint not supplied.`,
        rule: "Show the prospect, contact, interest and current status for commercial follow-up.",
        database: `Represent a read of prospect ${prospect.id} and its contact record from MySQL; exact schema not supplied.`,
      },
    };
  }

  if (action.type === "role") {
    return {
      ...state,
      role: action.role,
      interaction: {
        action: action.role === "operator" ? "Switch to the simulated authorized operator." : "Switch to the simulated read-only user.",
        component: "RoleSimulationControl (portfolio-only control; not a production login).",
        api: "No API request is made by this local role simulation.",
        rule: action.role === "operator"
          ? "Illustrative role enables the conversion and quotation demo controls; actual role names and permissions were not supplied."
          : "Illustrative read-only role disables state-changing demo controls; this is not a claim about configured production roles.",
        database: "No database operation. The selected demo role exists only in browser state.",
      },
    };
  }

  if (action.type === "convert-prospect") {
    const prospect = state.prospects.find((item) => item.id === state.selectedProspectId);
    if (!prospect || prospect.status === "Converted" || state.role === "read-only") return state;
    const customerId = `C-${prospect.id.slice(2)}`;
    return {
      ...state,
      view: "customers",
      prospects: state.prospects.map((item) => item.id === prospect.id ? { ...item, status: "Converted" } : item),
      customers: [...state.customers, { id: customerId, company: prospect.company, sourceProspectId: prospect.id }],
      interaction: {
        action: `Convert ${prospect.company} into a customer.`,
        component: "ProspectDetailPanel → CustomerConversionAction (conceptual Angular component names).",
        api: `Conceptual operation: POST /api/prospects/${prospect.id}/convert. Exact endpoint not supplied.`,
        rule: "Create a customer from the prospect while retaining the source prospect for conversion traceability. Duplicate-conversion handling is represented only in this demo.",
        database: `Represent creation of customer ${customerId} and update of prospect ${prospect.id}; exact tables and transaction behavior not supplied.`,
      },
      audit: createAuditEntry(state.audit, "Prospect converted to customer", prospect.company),
    };
  }

  if (action.type === "create-quote") {
    const prospect = state.prospects.find((item) => item.id === state.selectedProspectId);
    if (!prospect || state.role === "read-only") return state;
    const customer = state.customers.find((item) => item.sourceProspectId === prospect.id);
    const customerName = customer?.company ?? prospect.company;
    const quote: Quote = {
      reference: `SIM-${String(state.audit.length + 1).padStart(4, "0")}`,
      customer: customerName,
      item: "Demonstration product",
      quantity: 2,
      unitPrice: 125,
    };
    return {
      ...state,
      view: "quotations",
      quote,
      interaction: {
        action: `Prepare a quotation preview for ${customerName}.`,
        component: "QuotationWorkspaceComponent → QuotePreviewPanel (conceptual Angular component names).",
        api: "Conceptual operation: POST /api/quotations. Exact endpoint and PDF-generation mechanism were not supplied.",
        rule: "Commercial quotation generation and commercial calculations are documented project capabilities. The line item and amount shown here are simulated; the real calculation rules were not supplied.",
        database: "Represent saving quotation data before PDF generation; exact schema and persistence sequence not supplied.",
      },
      audit: createAuditEntry(state.audit, "Quotation preview prepared", quote.reference),
    };
  }

  return state;
}

const initialState: WorkspaceState = {
  view: "dashboard",
  prospects: simulatedProspects,
  customers: [],
  selectedProspectId: simulatedProspects[0].id,
  role: "operator",
  quote: null,
  interaction: initialInteraction,
  audit: [],
};

const copy = {
  en: {
    simulated: "SIMULATED DATA · NOT A PRODUCTION CRM",
    workspace: "Commercial operations",
    intro: "Explore a local simulation of documented CRM workflows. No requests are sent to Agil Energy systems.",
    dashboard: "Dashboard",
    prospects: "Prospects",
    customers: "Customers",
    quotations: "Quotations",
    access: "Access & audit",
    overview: "Commercial overview",
    openProspects: "Open prospects",
    customersCount: "Customers",
    previews: "Quote previews",
    prospectList: "Prospect pipeline",
    prospectDetails: "Prospect details",
    selectProspect: "Select a prospect",
    convert: "Convert to customer",
    alreadyCustomer: "Already converted",
    readOnly: "Read-only mode",
    conversionHint: "Conversion preserves a link to the source prospect for traceability.",
    customerRecords: "Customer records",
    source: "Source prospect",
    emptyCustomers: "Convert a simulated prospect to see it appear here.",
    quotePreview: "Quotation preview",
    createQuote: "Prepare quotation preview",
    quoteEmpty: "Create a local preview using simulated line-item data.",
    simulatedAmounts: "SIMULATED LINE ITEM & AMOUNTS",
    quantity: "Quantity",
    unitPrice: "Unit price",
    total: "Illustrative total",
    pdfNote: "This is a visual preview only; it does not create or download a PDF.",
    roleTitle: "Role-based access concept",
    roleDescription: "Spring Security and JWT role-based access are documented project technologies. Controls below are illustrative and do not represent verified production roles or permissions.",
    operator: "Authorized operator · simulated",
    reader: "Read-only user · simulated",
    auditTitle: "Local demonstration activity",
    auditEmpty: "Actions performed in this workspace will appear here. This local list is not the application audit log.",
    auditImplementation: "Implementation note",
    auditDescription: "The project describes operation traceability using Spring AOP and MDC. These browser-only demo events do not connect to that backend.",
    architecture: "Explore the architecture",
    architectureNote: "Select a component to see its documented responsibility and the demonstrated flow.",
    flow: "Angular → Spring Boot REST API → MySQL",
    userDoes: "USER ACTION",
    ui: "ANGULAR UI",
    api: "SPRING BOOT API",
    rule: "BUSINESS RULE",
    db: "DATABASE OPERATION",
    noClaims: "Conceptual component names, endpoint labels and data operations are explanatory examples where implementation specifics were not supplied.",
    nodes: [
      { name: "Angular 18", role: "Commercial interface and workflow screens. Named Angular components are conceptual examples, not verified source symbols.", link: "User action → Angular event handler → REST request" },
      { name: "Spring Boot REST API", role: "Backend entry point for CRM business operations. Exact API routes and DTOs were not supplied.", link: "Angular request → backend endpoint → business operation" },
      { name: "Spring Security + JWT", role: "Documented authentication and role-based access technology. Actual role names and policy configuration were not supplied.", link: "Request → token authentication → role authorization" },
      { name: "MySQL", role: "Relational database used by the CRM. Entity and table details were not supplied.", link: "Backend business operation → relational persistence" },
      { name: "Spring AOP + MDC", role: "Documented operation traceability approach for backend operations.", link: "Backend operation → trace context → audit log" },
      { name: "Docker + GitLab CI/CD", role: "Documented containerization and automated build pipeline.", link: "Source → GitLab CI/CD → Docker images" },
    ] satisfies ArchitectureNode[],
    select: "Select",
    selected: "Selected",
    status: { New: "New", Qualified: "Qualified", Converted: "Converted" },
  },
  fr: {
    simulated: "DONNÉES SIMULÉES · PAS UN CRM DE PRODUCTION",
    workspace: "Opérations commerciales",
    intro: "Explorez une simulation locale des flux CRM documentés. Aucune requête n'est envoyée aux systèmes Agil Energy.",
    dashboard: "Tableau de bord",
    prospects: "Prospects",
    customers: "Clients",
    quotations: "Devis",
    access: "Accès & audit",
    overview: "Vue commerciale",
    openProspects: "Prospects ouverts",
    customersCount: "Clients",
    previews: "Aperçus de devis",
    prospectList: "Suivi des prospects",
    prospectDetails: "Détails du prospect",
    selectProspect: "Choisir un prospect",
    convert: "Convertir en client",
    alreadyCustomer: "Déjà converti",
    readOnly: "Mode lecture seule",
    conversionHint: "La conversion conserve un lien vers le prospect source pour assurer la traçabilité.",
    customerRecords: "Dossiers clients",
    source: "Prospect source",
    emptyCustomers: "Convertissez un prospect simulé pour le voir apparaître ici.",
    quotePreview: "Aperçu du devis",
    createQuote: "Préparer un aperçu de devis",
    quoteEmpty: "Créez un aperçu local avec des lignes de démonstration simulées.",
    simulatedAmounts: "ARTICLE ET MONTANTS SIMULÉS",
    quantity: "Quantité",
    unitPrice: "Prix unitaire",
    total: "Total indicatif",
    pdfNote: "Aperçu visuel uniquement ; aucun PDF n'est créé ou téléchargé.",
    roleTitle: "Concept du contrôle d'accès par rôle",
    roleDescription: "Spring Security et JWT avec contrôle d'accès par rôle font partie des technologies documentées. Les contrôles ci-dessous sont illustratifs et ne représentent pas des rôles ou permissions de production vérifiés.",
    operator: "Opérateur autorisé · simulé",
    reader: "Utilisateur en lecture seule · simulé",
    auditTitle: "Activité de démonstration locale",
    auditEmpty: "Les actions effectuées dans cet espace apparaîtront ici. Cette liste locale n'est pas le journal d'audit de l'application.",
    auditImplementation: "Note d'implémentation",
    auditDescription: "Le projet décrit la traçabilité des opérations avec Spring AOP et MDC. Ces événements de démonstration dans le navigateur ne communiquent pas avec ce backend.",
    architecture: "Explorer l'architecture",
    architectureNote: "Sélectionnez un composant pour découvrir son rôle documenté et le flux illustré.",
    flow: "Angular → API REST Spring Boot → MySQL",
    userDoes: "ACTION UTILISATEUR",
    ui: "INTERFACE ANGULAR",
    api: "API SPRING BOOT",
    rule: "RÈGLE MÉTIER",
    db: "OPÉRATION BASE DE DONNÉES",
    noClaims: "Les noms de composants, routes API et opérations de données sont des exemples explicatifs lorsque les détails réels ne sont pas fournis.",
    nodes: [
      { name: "Angular 18", role: "Interface commerciale et écrans métier. Les noms de composants Angular sont des exemples conceptuels, pas des symboles source vérifiés.", link: "Action utilisateur → gestionnaire Angular → requête REST" },
      { name: "API REST Spring Boot", role: "Point d'entrée backend des opérations CRM. Les routes et DTO exacts n'ont pas été fournis.", link: "Requête Angular → endpoint backend → opération métier" },
      { name: "Spring Security + JWT", role: "Technologies documentées pour l'authentification et l'accès par rôle. Les rôles et règles de production n'ont pas été fournis.", link: "Requête → authentification du jeton → autorisation" },
      { name: "MySQL", role: "Base de données relationnelle du CRM. Les détails des entités et tables n'ont pas été fournis.", link: "Opération métier backend → persistance relationnelle" },
      { name: "Spring AOP + MDC", role: "Approche documentée pour la traçabilité des opérations backend.", link: "Opération backend → contexte de trace → journal d'audit" },
      { name: "Docker + GitLab CI/CD", role: "Conteneurisation et pipeline de build automatisé documentés.", link: "Code source → GitLab CI/CD → images Docker" },
    ] satisfies ArchitectureNode[],
    select: "Sélectionner",
    selected: "Sélectionné",
    status: { New: "Nouveau", Qualified: "Qualifié", Converted: "Converti" },
  },
} as const;

export default function CrmEnvironment({ locale }: { locale: Locale }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const text = copy[locale];
  const selectedProspect = state.prospects.find((item) => item.id === state.selectedProspectId) ?? state.prospects[0];
  const selectedCustomer = state.customers.find((item) => item.sourceProspectId === selectedProspect.id);
  const canWrite = state.role === "operator";
  const total = state.quote ? state.quote.quantity * state.quote.unitPrice : 0;
  const navigation: Array<{ id: WorkspaceState["view"]; label: string; Icon: typeof Building2 }> = [
    { id: "dashboard", label: text.dashboard, Icon: Building2 },
    { id: "prospects", label: text.prospects, Icon: Users },
    { id: "customers", label: text.customers, Icon: BadgeCheck },
    { id: "quotations", label: text.quotations, Icon: FileText },
    { id: "access", label: text.access, Icon: ShieldCheck },
  ];

  return (
    <div className="crm-environment">
      <header className="crm-environment-header">
        <div><span className="crm-environment-brand">AGIL ENERGY <i /> CRM</span><h3>{text.workspace}</h3><p>{text.intro}</p></div>
        <span className="crm-simulated-badge"><span />{text.simulated}</span>
      </header>

      <div className="crm-layout">
        <nav className="crm-sidebar" aria-label={locale === "fr" ? "Navigation CRM simulée" : "Simulated CRM navigation"}>
          {navigation.map(({ id, label, Icon }) => <button
            type="button"
            className="crm-nav-item"
          aria-pressed={state.view === id}
            key={id}
            onClick={() => dispatch({ type: "view", view: id })}
          ><Icon size={15} />{label}<ArrowRight size={12} /></button>)}
          <div className="crm-sidebar-foot"><span className="crm-avatar">MK</span><span>Demo workspace<small>Local simulation</small></span></div>
        </nav>

        <div className="crm-workspace">
          <div className="crm-workspace-toolbar">
            <span>COMMERCIAL / {state.view.toUpperCase()}</span>
            <label>{locale === "fr" ? "Rôle de démonstration" : "Demo role"}
              <select aria-label={locale === "fr" ? "Rôle de démonstration" : "Demo role"} value={state.role} onChange={(event) => dispatch({ type: "role", role: event.target.value === "read-only" ? "read-only" : "operator" })}>
                <option value="operator">{text.operator}</option>
                <option value="read-only">{text.reader}</option>
              </select>
            </label>
          </div>

          {state.view === "dashboard" && <section className="crm-view" aria-labelledby="crm-view-title">
            <h4 id="crm-view-title">{text.overview}</h4>
            <div className="crm-metrics">
              <article><span>{text.openProspects}</span><strong>{state.prospects.filter((item) => item.status !== "Converted").length}</strong><small>SIMULATED RECORDS</small></article>
              <article><span>{text.customersCount}</span><strong>{state.customers.length}</strong><small>LOCAL CONVERSIONS</small></article>
              <article><span>{text.previews}</span><strong>{state.quote ? 1 : 0}</strong><small>LOCAL PREVIEWS</small></article>
            </div>
            <div className="crm-workspace-grid">
              <div className="crm-panel">
                <div className="crm-panel-heading"><h5>{text.prospectList}</h5><span>DEMO DATA</span></div>
                <ProspectList locale={locale} prospects={state.prospects} selectedId={state.selectedProspectId} onSelect={(id) => dispatch({ type: "select-prospect", prospectId: id })} />
              </div>
              <ProspectPanel locale={locale} text={text} prospect={selectedProspect} customer={selectedCustomer} canWrite={canWrite} onConvert={() => dispatch({ type: "convert-prospect" })} onQuote={() => dispatch({ type: "create-quote" })} />
            </div>
          </section>}

          {state.view === "prospects" && <section className="crm-view" aria-labelledby="crm-view-title">
            <div className="crm-view-heading"><div><h4 id="crm-view-title">{text.prospects}</h4><p>SIMULATED PIPELINE · {state.prospects.length} RECORDS</p></div></div>
            <div className="crm-workspace-grid crm-prospects-view">
              <div className="crm-panel"><div className="crm-panel-heading"><h5>{text.prospectList}</h5><span>SELECT A RECORD</span></div><ProspectList locale={locale} prospects={state.prospects} selectedId={state.selectedProspectId} onSelect={(id) => dispatch({ type: "select-prospect", prospectId: id })} /></div>
              <ProspectPanel locale={locale} text={text} prospect={selectedProspect} customer={selectedCustomer} canWrite={canWrite} onConvert={() => dispatch({ type: "convert-prospect" })} onQuote={() => dispatch({ type: "create-quote" })} />
            </div>
          </section>}

          {state.view === "customers" && <section className="crm-view" aria-labelledby="crm-view-title">
            <div className="crm-view-heading"><div><h4 id="crm-view-title">{text.customerRecords}</h4><p>SIMULATED CUSTOMER DATA</p></div><span className="crm-count">{state.customers.length} {text.customers.toLowerCase()}</span></div>
            {state.customers.length === 0 ? <p className="crm-empty-state">{text.emptyCustomers}</p> : <div className="crm-customer-list">{state.customers.map((customer) => <article className="crm-customer-row" key={customer.id}><span className="crm-table-icon"><Building2 size={16} /></span><span><strong>{customer.company}</strong><small>{customer.id} · {text.source}: {customer.sourceProspectId}</small></span><BadgeCheck size={16} /></article>)}</div>}
          </section>}

          {state.view === "quotations" && <section className="crm-view" aria-labelledby="crm-view-title">
            <div className="crm-view-heading"><div><h4 id="crm-view-title">{text.quotePreview}</h4><p>LOCAL SIMULATION · NO PDF IS GENERATED</p></div>
              <button className="crm-action-button" type="button" disabled={!canWrite} onClick={() => dispatch({ type: "create-quote" })}><FileText size={14} />{text.createQuote}</button>
            </div>
            {state.quote ? <div className="crm-quote-paper">
              <div className="crm-quote-top"><span>AGIL ENERGY <i /> QUOTATION</span><span>{state.quote.reference}</span></div>
              <div className="crm-quote-meta"><div><small>CUSTOMER</small><strong>{state.quote.customer}</strong></div><div><small>STATUS</small><strong>SIMULATED PREVIEW</strong></div></div>
              <div className="crm-quote-line"><strong>{text.simulatedAmounts}</strong><span>{state.quote.item}</span><span>{state.quote.quantity}</span><span>{state.quote.unitPrice.toFixed(2)} TND</span><b>{total.toFixed(2)} TND</b></div>
              <div className="crm-quote-total"><span>{text.total}</span><strong>{total.toFixed(2)} TND</strong></div>
              <p>{text.pdfNote}</p>
            </div> : <p className="crm-empty-state">{text.quoteEmpty}</p>}
          </section>}

          {state.view === "access" && <section className="crm-view" aria-labelledby="crm-view-title">
            <h4 id="crm-view-title">{text.roleTitle}</h4><p className="crm-intro-copy">{text.roleDescription}</p>
            <div className="crm-access-indicator"><ShieldCheck size={18} /><div><strong>{state.role === "operator" ? text.operator : text.reader}</strong><small>{canWrite ? "WRITE DEMO ACTIONS ENABLED" : "WRITE DEMO ACTIONS DISABLED"}</small></div></div>
            <div className="crm-panel crm-audit-panel"><div className="crm-panel-heading"><h5>{text.auditTitle}</h5><ClipboardList size={15} /></div>
              {state.audit.length === 0 ? <p className="crm-empty-state">{text.auditEmpty}</p> : <ul className="crm-audit-list">{state.audit.map((entry) => <li key={entry.id}><span className="crm-audit-mark" /><span><strong>{entry.action}</strong><small>{entry.record} · browser simulation</small></span></li>)}</ul>}
            </div>
            <aside className="crm-implementation-note"><strong>{text.auditImplementation}</strong><p>{text.auditDescription}</p></aside>
          </section>}

          <InteractionTrace locale={locale} text={text} details={state.interaction} />
        </div>
      </div>

      <ArchitectureExplorer locale={locale} text={text} />
    </div>
  );
}

function ProspectList({
  locale,
  prospects,
  selectedId,
  onSelect,
}: {
  locale: Locale;
  prospects: Prospect[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const text = copy[locale];
  return <div className="crm-prospect-list">
    {prospects.map((prospect) => <button className="crm-prospect-row" type="button" aria-pressed={prospect.id === selectedId} key={prospect.id} onClick={() => onSelect(prospect.id)}>
      <span className="crm-table-icon"><Building2 size={15} /></span>
      <span className="crm-prospect-name"><strong>{prospect.company}</strong><small>{prospect.id} · {prospect.contact}</small></span>
      <span className={`crm-status crm-status-${prospect.status.toLowerCase()}`}>{text.status[prospect.status]}</span>
    </button>)}
  </div>;
}

function ProspectPanel({
  locale,
  text,
  prospect,
  customer,
  canWrite,
  onConvert,
  onQuote,
}: {
  locale: Locale;
  text: (typeof copy)[Locale];
  prospect: Prospect;
  customer: Customer | undefined;
  canWrite: boolean;
  onConvert: () => void;
  onQuote: () => void;
}) {
  return <article className="crm-panel crm-prospect-detail">
    <div className="crm-panel-heading"><h5>{text.prospectDetails}</h5><span>{prospect.id}</span></div>
    <span className="crm-detail-icon"><Building2 size={20} /></span>
    <h6>{prospect.company}</h6>
    <dl><div><dt>{locale === "fr" ? "Contact" : "Contact"}</dt><dd>{prospect.contact}</dd></div><div><dt>{locale === "fr" ? "Intérêt" : "Interest"}</dt><dd>{prospect.interest}</dd></div><div><dt>{locale === "fr" ? "Statut" : "Status"}</dt><dd>{text.status[prospect.status]}</dd></div>{customer && <div><dt>{text.source}</dt><dd>{customer.sourceProspectId} · traceable</dd></div>}</dl>
    <p className="crm-conversion-hint">{text.conversionHint}</p>
    <div className="crm-detail-actions">
      <button className="crm-action-button" type="button" disabled={!canWrite || prospect.status === "Converted"} onClick={onConvert}><Users size={14} />{prospect.status === "Converted" ? text.alreadyCustomer : text.convert}</button>
      <button className="crm-secondary-action" type="button" disabled={!canWrite} onClick={onQuote}><FileText size={14} />{text.quotations}</button>
    </div>
    {!canWrite && <p className="crm-readonly-hint"><ShieldCheck size={12} />{text.readOnly}</p>}
  </article>;
}

function InteractionTrace({
  locale,
  text,
  details,
}: {
  locale: Locale;
  text: (typeof copy)[Locale];
  details: InteractionDetails;
}) {
  const items = [
    { label: text.userDoes, value: details.action },
    { label: text.ui, value: details.component },
    { label: text.api, value: details.api },
    { label: text.rule, value: details.rule },
    { label: text.db, value: details.database },
  ];
  return <section className="crm-interaction-trace" aria-labelledby="crm-trace-title">
    <div className="crm-trace-heading"><div><span className="detail-eyebrow">{locale === "fr" ? "SOUS LE CAPOT" : "UNDER THE HOOD"}</span><h4 id="crm-trace-title">{locale === "fr" ? "Du clic aux données" : "From interaction to data"}</h4></div><ArrowDownRight size={18} /></div>
    <div className="crm-trace-grid">{items.map((item) => <article key={item.label}><span>{item.label}</span><p>{item.value}</p></article>)}</div>
    <p className="crm-no-claims">{text.noClaims}</p>
  </section>;
}

function ArchitectureExplorer({ locale, text }: { locale: Locale; text: (typeof copy)[Locale] }) {
  const [selectedNode, setSelectedNode] = useReducer((_current: number, next: number) => next, 0);
  const node = text.nodes[selectedNode];
  return <section className="crm-architecture" aria-labelledby="crm-architecture-title">
    <div className="crm-trace-heading"><div><span className="detail-eyebrow">{locale === "fr" ? "SYSTÈME" : "SYSTEM MAP"}</span><h3 id="crm-architecture-title">{text.architecture}</h3><p>{text.architectureNote}</p></div><Network size={20} /></div>
    <div className="crm-architecture-flow">{text.flow}</div>
    <div className="crm-architecture-nodes" role="group" aria-label={locale === "fr" ? "Composants de l'architecture CRM" : "CRM architecture components"}>
      {text.nodes.map((item, index) => <button type="button" className="crm-architecture-node" aria-pressed={selectedNode === index} key={item.name} onClick={() => setSelectedNode(index)}>
        <span>{String(index + 1).padStart(2, "0")}</span><strong>{item.name}</strong><ArrowRight size={13} />
      </button>)}
    </div>
    <article className="crm-architecture-detail" aria-live="polite">
      <strong>{node.name}</strong><p>{node.role}</p><small>{node.link}</small>
    </article>
  </section>;
}
