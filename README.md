# Gerenciador de Tarefas

🇺🇸 Read in English: [README.en.md](README.en.md)

Aplicativo web responsivo de gerenciamento de tarefas, feito com **HTML, CSS e JavaScript puros** (sem frameworks e sem dependencias externas).

## Funcionalidades

- **CRUD completo**: criar, listar, editar e excluir tarefas
- **Prioridade por tarefa**: Nenhuma, Baixa, Media e Alta, com badges e ordenacao automatica
- **Data limite**: definicao de prazo por tarefa, com destaque visual para tarefas atrasadas
- **Busca em tempo real**: filtro instantaneo por titulo ou descricao
- **Fluxo de status**: Pendente, Em Andamento e Concluida, incluindo restauracao de tarefa concluida para pendente
- **Filtros por status com contador**: Todas, Pendente, Em Andamento e Concluida com contagem dinamica
- **Reordenacao por arrastar e soltar**: reorganizacao de cards no desktop
- **Tema Claro/Escuro**: alternancia de tema com persistencia no `localStorage`
- **Interface bilingue**: alternancia entre Portugues (pt-BR) e Ingles (en)
- **Persistencia local**: tarefas, tema e idioma salvos no `localStorage`

## Stack Tecnologica

| Camada      | Tecnologia |
| ----------- | ---------- |
| Estrutura   | HTML5 semantico |
| Estilos     | CSS3 (variaveis, Grid/Flex e responsividade) |
| Logica      | JavaScript Vanilla (ES2022+) |
| Armazenamento | Web Storage API (`localStorage`) |
| IDs         | `crypto.randomUUID()` |

## Estrutura do Projeto

```
index.html   - estrutura da interface e controles
styles.css   - estilos, temas e layout responsivo
app.js       - CRUD, status, prioridade, data limite, filtros, busca, drag-and-drop, i18n e persistencia
```

## Como Executar

Versao online (GitHub Pages): https://mihawkx.github.io/gestao-tarefas/

**Opcao 1 - Abrir direto no navegador**

Abra `index.html` no navegador.

**Opcao 2 - Servidor local (recomendado)**

Com Python:

```bash
python -m http.server
```

Depois, abra `http://localhost:8000`.

Com Node.js (`npx`):

```bash
npx serve .
```

## Observacoes

- O aplicativo nao usa backend nem faz requisicoes de rede em runtime.
- O idioma padrao (sem preferencia salva) e **pt-BR**.
- O tema padrao (sem preferencia salva) e **escuro**.
- Para resetar os dados, limpe o `localStorage` desse site no navegador.

## Licenca

Projeto para estudo e uso pessoal.
