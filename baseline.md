# Baseline — Frontend React CRM

- O projeto deve seguir os princípios da Clean Architecture.
- O projeto deve evitar boilerplate e abstrações desnecessárias.

## 1. Princípios gerais

* O projeto deve ser desenvolvido utilizando React.
* O projeto deve seguir os princípios da Clean Architecture.
* O projeto deve evitar boilerplate e abstrações desnecessárias.
* O código deve priorizar simplicidade, clareza e manutenibilidade.
* Cada módulo deve possuir uma responsabilidade bem definida.
* A arquitetura deve evitar acoplamento desnecessário entre regras de negócio, interface e infraestrutura.
* Não devem ser criadas abstrações apenas para seguir padrões arquiteturais.

---

## 2. Arquitetura

A aplicação deve separar claramente:

* Domain;
* Application;
* Infrastructure;
* Presentation.

A regra principal de dependência é:

```text
Presentation
      ↓
Application
      ↓
Domain
      ↑
Infrastructure
```

As camadas internas não devem depender de detalhes das camadas externas.

### Domain

Deve conter regras e conceitos relacionados ao domínio do CRM.

Não deve depender de:

* React;
* React Router;
* bibliotecas de UI;
* chamadas HTTP;
* localStorage;
* APIs externas.

Quando um caso de uso precisar de acesso a dados externos (API, localStorage, etc.), o Domain (ou a Application, quando o conceito for específico de um caso de uso) deve definir a **interface** desse acesso (ex.: `CustomerRepository`). A implementação concreta dessa interface pertence exclusivamente à Infrastructure.

```text
domain/
└── customer/
    ├── Customer.ts               // entidade / regras de negócio
    └── CustomerRepository.ts     // interface (porta)

infrastructure/
└── customer/
    └── HttpCustomerRepository.ts // implementação (adaptador)
```

A Application e o Domain só devem conhecer a interface. Nunca devem importar diretamente uma classe concreta da Infrastructure — isso é o que efetivamente garante a Regra de Dependência da seção 2, e não apenas a organização de pastas.

Não criar uma interface para uma dependência que só terá uma implementação e nenhuma necessidade real de substituição ou mock em teste — nesse caso, avaliar se o ganho de testabilidade justifica a abstração (ver seção 21).

### Application

Deve conter os casos de uso da aplicação.

Exemplos:

```text
CreateCustomer
UpdateCustomer
DeleteCustomer
CreateLead
ConvertLead
CreateDeal
MoveDeal
AssignLead
```

Os casos de uso não devem depender de componentes React nem de implementações concretas de Infrastructure — apenas das interfaces definidas no Domain (ex.: recebem um `CustomerRepository` por parâmetro/injeção, nunca instanciam `HttpCustomerRepository` diretamente).

### Infrastructure

Deve conter implementações relacionadas a recursos externos.

Exemplos:

```text
API
localStorage
repositories
autenticação
integrações externas
```

Cada implementação de Infrastructure deve satisfazer uma interface definida no Domain/Application (ex.: `HttpCustomerRepository implements CustomerRepository`). A troca de uma implementação por outra (ex.: localStorage por API) não deve exigir alterações no Domain, na Application ou nos componentes React.

### Presentation

Deve conter a interface React:

```text
pages
components
hooks
layouts
forms
routes
```

Componentes React não devem concentrar regras de negócio complexas.

---

## 3. Organização por feature

A aplicação deve ser organizada principalmente por domínio funcional (feature). As camadas de Clean Architecture (Domain, Application, Infrastructure, Presentation) existem **dentro** de cada feature — não como pastas globais paralelas às features.

Exemplo:

```text
src/
├── features/
│   ├── customers/
│   │   ├── domain/            // Customer.ts, CustomerRepository.ts (interface)
│   │   ├── application/       // CreateCustomer.ts, UpdateCustomer.ts
│   │   ├── infrastructure/    // HttpCustomerRepository.ts
│   │   └── presentation/      // pages, components, hooks, forms
│   │
│   ├── contacts/
│   ├── leads/
│   ├── deals/
│   ├── tasks/
│   └── dashboard/
│
└── shared/
    ├── components/            // design system: Button, Input, Modal...
    ├── hooks/
    ├── utils/
    └── types/
```

Cada feature deve manter próximos os arquivos relacionados à sua funcionalidade.

Não utilizar uma única pasta global contendo todos os componentes, hooks e serviços da aplicação.

Uma pasta de camada global (`src/domain`, `src/application`, `src/infrastructure`) só deve existir para conceitos que são genuinamente compartilhados entre múltiplas features (ex.: `AuthSession`, um `HttpClient` base). Se um conceito pertence a uma única feature, ele deve permanecer dentro dela — não deve ser promovido para uma pasta global "porque outras camadas também têm pasta global".

Uma feature simples (ex.: CRUD direto, sem regra de negócio relevante) não é obrigada a ter as quatro subpastas — ver seção 21. Criar `domain/application/infrastructure/presentation` vazios ou triviais só para seguir o padrão é o tipo de boilerplate que este documento proíbe.

---

## 4. Componentes React

Componentes devem possuir responsabilidade clara.

Um componente pode conter:

* estrutura visual;
* interação;
* estado local de UI;
* composição de outros componentes.

Componentes não devem concentrar:

* regras complexas de negócio;
* chamadas HTTP diretamente;
* lógica de persistência;
* múltiplas responsabilidades não relacionadas.

### Evitar componentes excessivamente grandes

Se um componente acumular responsabilidades distintas, deve ser avaliada sua divisão.

Entretanto, não fragmentar componentes apenas para reduzir o número de linhas.

---

## 5. Hooks

Hooks devem encapsular comportamento relacionado à interface ou à interação com casos de uso.

Exemplos:

```text
useCustomerFilters
useCustomerForm
useDealPipeline
useCurrentUser
```

Evitar hooks que concentrem responsabilidades não relacionadas.

Não criar um hook apenas para encapsular uma única chamada trivial sem ganho de reutilização ou organização.

---

## 6. Comunicação com API

Componentes React não devem realizar chamadas HTTP diretamente.

Evitar:

```tsx
function CustomerPage() {
  const response = await fetch("/customers");
}
```

A comunicação deve ocorrer através de uma camada apropriada.

Exemplo:

```text
Component
    ↓
Hook
    ↓
Use Case
    ↓
Repository
    ↓
API
```

A implementação concreta do acesso à API deve permanecer na infraestrutura.

---

## 7. Estado

O estado deve ser mantido na menor camada possível.

Priorizar:

1. estado local;
2. estado da feature;
3. estado global somente quando necessário.

Não utilizar estado global para informações que pertencem exclusivamente a uma página ou componente.

Diferenciar:

* estado de UI;
* estado de servidor;
* estado global;
* dados derivados.

Não armazenar no estado informações que podem ser facilmente derivadas de outro estado.

---

## 8. Server State

Dados provenientes da API devem ser tratados como **server state**, e não como estado global comum.

Devem ser considerados:

* cache;
* loading;
* erro;
* invalidação;
* refetch;
* sincronização.

A biblioteca utilizada para gerenciamento de server state deve ser adotada de maneira consistente caso o projeto utilize uma.

---

## 9. Estado global

Estado global deve ser utilizado somente quando a informação realmente precisar ser compartilhada por diferentes partes da aplicação.

Exemplos possíveis:

* sessão do usuário;
* preferências globais;
* configurações da aplicação;
* estado global de UI quando necessário.

Não utilizar estado global simplesmente para evitar passar props.

---

## 10. Formulários

Formulários devem possuir:

* validação;
* estado de loading;
* tratamento de erros;
* prevenção de submissão duplicada;
* feedback de sucesso ou falha.

Regras específicas de negócio não devem ficar exclusivamente dentro do componente do formulário.

---

## 11. Componentes compartilhados

Componentes em `shared` devem ser realmente reutilizáveis.

Exemplos:

```text
Button
Input
Modal
Dropdown
Table
Pagination
Badge
Toast
```

Componentes específicos de uma feature devem permanecer dentro da própria feature.

Exemplo:

```text
features/
└── customers/
    └── components/
        ├── CustomerCard
        ├── CustomerForm
        └── CustomerFilters
```

Não mover um componente para `shared` apenas porque ele é utilizado duas vezes.

---

## 12. Design System

Componentes visuais devem utilizar o Design System definido pelo projeto.

Evitar valores visuais arbitrários espalhados pelo código.

Quando aplicável, centralizar:

* cores;
* espaçamentos;
* tipografia;
* tamanhos;
* bordas;
* sombras;
* breakpoints.

Não criar componentes visuais duplicados com pequenas diferenças quando um componente existente pode ser estendido adequadamente.

Os tokens de cor do projeto (superfície, texto, borda, accent, e as cores semânticas de status — sucesso, alerta, erro) são definidos em `src/index.css` no bloco `@theme` do Tailwind. Esse arquivo é a fonte da verdade; não redefinir cores soltas em componentes. As cores semânticas de status (`success`, `warning`, `danger`) devem ser usadas de forma consistente em toda a aplicação para representar o mesmo tipo de situação (ex.: prazo vencido, tarefa atrasada e documento rejeitado usam `danger`; prazo vencendo hoje e tarefa de prioridade alta usam `warning`; processo/tarefa concluído usa `success`) — não introduzir uma cor nova para o mesmo conceito de status em uma feature diferente.

---

## 13. Rotas

As rotas devem representar funcionalidades da aplicação.

Exemplo:

```text
/customers
/customers/:id
/leads
/deals
/tasks
/dashboard
```

Regras de proteção de rotas devem ser centralizadas.

Componentes de página não devem possuir lógica duplicada para verificar autenticação.

---

## 14. Tipagem

Quando TypeScript for utilizado, deve ser adotado de forma consistente.

Evitar `any` sem justificativa.

Os tipos devem representar o domínio real da aplicação.

Não criar múltiplos tipos equivalentes para representar a mesma informação sem necessidade.

---

## 15. Tratamento de estados assíncronos

Operações assíncronas devem considerar, quando aplicável:

```text
loading
success
error
empty
```

Listagens devem possuir estado vazio adequado.

Erros de API devem possuir tratamento apropriado na interface.

Não utilizar apenas `console.error()` como tratamento de erro para o usuário.

---

## 16. Performance

Não realizar otimizações prematuras.

Evitar:

* renderizações desnecessárias;
* requests duplicados;
* carregamento de dados que não são utilizados;
* listas enormes sem paginação ou virtualização quando necessário.

`useMemo`, `useCallback` e `React.memo` não devem ser utilizados indiscriminadamente.

Devem existir quando houver uma justificativa de performance ou estabilidade referencial.

---

## 17. Lazy Loading

Páginas ou módulos significativamente pesados podem utilizar carregamento sob demanda.

O lazy loading não deve ser aplicado indiscriminadamente a componentes pequenos.

A divisão deve priorizar pontos naturais da aplicação, principalmente rotas.

---

## 18. Acessibilidade

Componentes interativos devem possuir:

* suporte a teclado;
* foco visível;
* labels apropriados;
* HTML semântico;
* estados acessíveis.

Não utilizar elementos genéricos como substitutos de elementos semânticos quando isso prejudicar acessibilidade.

---

## 19. Responsividade

A aplicação deve respeitar os breakpoints definidos pelo projeto.

Não utilizar dimensões fixas que prejudiquem a interface em diferentes resoluções.

Tabelas, dashboards e pipelines devem possuir comportamento definido para telas menores.

---

## 20. Segurança

O frontend não deve ser considerado uma camada de segurança.

Validações realizadas no React existem principalmente para melhorar a experiência do usuário.

Regras de autorização devem ser garantidas pelo backend.

Nunca armazenar no código-fonte:

* secrets;
* chaves privadas;
* credenciais;
* tokens sensíveis desnecessários.

---

## 21. Boilerplate e abstrações

A criação de uma nova camada, classe, hook ou componente deve possuir uma justificativa.

Evitar estruturas como:

```text
Component
    ↓
Hook
    ↓
Service
    ↓
Manager
    ↓
Repository
```

quando algumas dessas camadas não possuem responsabilidade real.

Uma abstração deve existir quando proporcionar pelo menos um benefício concreto:

* redução de acoplamento;
* reutilização significativa;
* testabilidade;
* separação de responsabilidade;
* manutenção mais simples.

---

## 22. Código duplicado

Código duplicado deve ser evitado, mas não deve ser eliminado através de abstrações excessivamente genéricas.

Antes de criar uma abstração, avaliar:

* o comportamento é realmente igual?
* continuará sendo igual?
* a abstração facilita ou dificulta a compreensão?
* existe reutilização suficiente para justificá-la?

Preferir duplicação pequena e explícita a uma abstração complexa quando a relação entre os códigos não for realmente estável.

---

## 23. Utilitários

Funções utilitárias devem possuir responsabilidade específica.

Evitar arquivos genéricos como:

```text
utils.ts
helpers.ts
common.ts
```

contendo funções sem relação entre si.

Preferir organização por responsabilidade:

```text
formatCurrency.ts
formatDate.ts
validateEmail.ts
```

quando houver necessidade de reutilização.

---

## 24. Comentários

Comentários devem explicar decisões ou comportamentos que não sejam óbvios pelo código.

Não utilizar comentários para explicar código que poderia simplesmente ser escrito de forma mais clara.

Não manter código antigo comentado.

---

## 25. Regra de decisão

Quando existirem múltiplas implementações possíveis, priorizar:

1. simplicidade;
2. baixo acoplamento;
3. clareza;
4. reutilização real;
5. testabilidade;
6. performance quando necessária.

Não adicionar complexidade arquitetural sem uma necessidade concreta.

---

## 26. Regra principal

> **Clean Architecture deve organizar o código sem transformar um frontend React em uma estrutura burocrática.**

A quantidade de abstrações deve ser proporcional à complexidade real do CRM.

Código simples deve continuar simples.

---

## 27. Enforcement (obrigatório)

Regras descritas em texto não são suficientes para manter a arquitetura ao longo do tempo — devem ser reforçadas por ferramentas automatizadas, não apenas por revisão manual.

O projeto utiliza `dependency-cruiser` (configurado em `.dependency-cruiser.cjs`, script `npm run lint:boundaries`) para impedir, analisando o grafo de imports:

* `domain/` e `application/` importando de `infrastructure/` ou de `react`/`react-dom`/`react-router` (regras `no-infrastructure-in-domain-application` e `no-react-in-domain-application`);
* `presentation/` importando `infrastructure/` diretamente — deve passar por hook → caso de uso, com a instância concreta resolvida em `container.ts` da própria feature (regra `no-direct-infrastructure-in-presentation`);
* uma feature importando `domain`/`application`/`infrastructure`/`container` internos de outra feature — comunicação entre features deve ocorrer via `shared/` ou composição no nível de rotas/páginas (regra `no-cross-feature-internals`);
* `shared/` importando de dentro de `features/` — `shared/` deve ser agnóstico de feature (regra `shared-must-not-depend-on-features`).

(Optou-se por `dependency-cruiser` em vez de `eslint-plugin-boundaries` porque o projeto usa `oxlint`, que ainda não suporta esse plugin; `dependency-cruiser` roda como CLI independente do linter.)

`npm run lint:boundaries` deve rodar no CI, com o build falhando em caso de violação — não depende de o revisor perceber durante o code review.

As demais regras deste documento (nomeação, tamanho de componente, quando abstrair, quando duplicar) permanecem como critério de julgamento humano/revisão de PR — não são automatizáveis e não devem ser tratadas como se fossem.
