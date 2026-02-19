# Gerenciador de Tarefas (CRUD)

🇺🇸 Read in English: [README.md](README.md)

Um aplicativo web simples de gerenciamento de tarefas em estilo de cards, feito com **HTML, CSS e JavaScript**.

## Funcionalidades

- Criar tarefas com título e descrição
- Visualizar tarefas em cards responsivos
- Editar tarefas existentes
- Excluir tarefas
- Definir status da tarefa como:
  - Pendente
  - Em progresso
  - Concluída
- Filtrar tarefas por status (Todas, Pendente, Em progresso, Concluída)
- Alternar entre modo Claro/Escuro
- Persistir dados usando `localStorage`

## Estrutura do Projeto

- `index.html` – layout da aplicação e controles
- `styles.css` – estilo dos cards e temas
- `app.js` – lógica de CRUD, filtros, status e persistência

## Executar Localmente

### Opção 1: Abrir diretamente

Abra o `index.html` no seu navegador.

### Opção 2: Usar servidor local (recomendado)

Se você tiver Python instalado:

```bash
python -m http.server
```

Depois abra:

```text
http://localhost:8000
```

## Observações

- As tarefas e o tema selecionado são salvos no armazenamento do navegador.
- Para resetar os dados, limpe o `localStorage` desse site no navegador.

## Licença

Este projeto é para estudo e uso pessoal.
