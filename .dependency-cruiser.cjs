/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-react-in-domain-application",
      severity: "error",
      comment:
        "Domain e Application não podem depender de React/React DOM/React Router (baseline.md, seção 2).",
      from: { path: "^src/features/[^/]+/(domain|application)" },
      to: { path: "^node_modules/(react|react-dom|react-router)" },
    },
    {
      name: "no-infrastructure-in-domain-application",
      severity: "error",
      comment:
        "Domain e Application só podem depender de interfaces (portas) definidas no próprio Domain, nunca de implementações concretas da Infrastructure (baseline.md, seção 2).",
      from: { path: "^src/features/[^/]+/(domain|application)" },
      to: { path: "^src/features/[^/]+/infrastructure" },
    },
    {
      name: "no-direct-infrastructure-in-presentation",
      severity: "error",
      comment:
        "Presentation não pode importar Infrastructure diretamente — deve passar por hook → caso de uso (baseline.md, seção 6). A composição concreta (repository real) fica em container.ts.",
      from: { path: "^src/features/[^/]+/presentation" },
      to: { path: "^src/features/[^/]+/infrastructure" },
    },
    {
      name: "no-cross-feature-internals",
      severity: "error",
      comment:
        "Uma feature não pode importar domain/application/infrastructure/container internos de outra feature — comunicação entre features deve passar por shared/ ou pela composição de rotas (baseline.md, seção 3).",
      from: { path: "^src/features/([^/]+)/" },
      to: { path: "^src/features/(?!$1/)[^/]+/(domain|application|infrastructure|container)" },
    },
    {
      name: "shared-must-not-depend-on-features",
      severity: "error",
      comment:
        "shared/ deve ser agnóstico de feature — não pode importar nada de dentro de features/ (baseline.md, seção 11).",
      from: { path: "^src/shared" },
      to: { path: "^src/features" },
    },
    {
      name: "no-app-dependency-inside-features-or-shared",
      severity: "error",
      comment:
        "src/app/ é a composição raiz (AppShell, rotas de nível superior) e depende de features/shared — a dependência nunca pode ser invertida (baseline.md, seção 3).",
      from: { path: "^src/(features|shared)/" },
      to: { path: "^src/app/" },
    },
  ],
  options: {
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "tsconfig.app.json",
    },
    doNotFollow: {
      path: "node_modules",
    },
  },
};
