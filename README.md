# 🛒 HandMarket

**HandMarket** é um aplicativo web para facilitar a organização e execução de compras de mercado, churrascos e outros eventos. O app permite criar listas personalizadas, adicionar produtos manualmente ou via Excel, marcar itens comprados e gerar checklists com somatório dos valores. Também há uma vitrine com produtos organizados por setor e integração com imagens automáticas.

---

## 📦 Tecnologias Utilizadas

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** para estilos
- **Notie.js** para notificações
- **localStorage** para cache offline
- **Axios** para comunicação com a API

### Backend

- **Google Apps Sheets** como banco de dados remoto

### Banco de Dados
- **Planilhas Google** (nome sugerido: `handmarket_db`)
- Estrutura(abas):
  - **users** (usuários)
  - **lists** (listas personalizadas)
  - **products** (produtos gerais)
  - **list_items** (produtos dentro das listas)
  - **sectors** (categorias como "Açougue", "Bebidas", etc.)
  - **settings** (configurações gerais)

---

## ✨ Funcionalidades

- ✅ Criação de listas de compras personalizadas (Ex: "Mercado", "Churrasco", etc.)
- ✅ Adição de produtos manualmente ou via planilha Excel
- ✅ Marcação de itens como comprados com somatório em tempo real
- ✅ Geração de checklist e controle de valores
- ✅ Vitrine de produtos com filtros por setor
- ✅ Renderização automática de imagens por setor
- ✅ Armazenamento em localStorage e fallback para API
- ✅ Edição e exclusão de produtos e listas
- ✅ Interface limpa, responsiva e moderna

---


# 📚 Modelo de Organização da Planilha

## 1. Aba: Products
Guarda todos os produtos cadastrados.

| ID  | Cod  | Descrição  | DescriçãoNfce | Categoria | Qtda | UN | Preço | Data de Criação |
|-----|------|------------|---------------|-----------|------|----|-------|-----------------|
| 1   | 123  | Sabonete   | nome da nota  | Limpeza   | 100  | Un | 4.99  | 2025-05-01      |
| 2   | 745  | Coca-Cola  | nome da nota  | Bebidas   | 50   | G  | 7.50  | 2025-01-25      |

---

## 2. Aba: Users
Guarda todos os usuários do sistema.

| ID  | Nome          | E-mail               | Telefone     | Status |
|-----|---------------|----------------------|--------------|--------|
| 1   | João Silva    | joao@example.com      | 1234567890   | Ativo  |
| 2   | Maria Oliveira| maria@example.com     | 9876543210   | Inativo|

---

## 3. Aba: Orders
Guarda pedidos ou registros de compra.

| ID Pedido | ID Usuário | Data do Pedido | Produtos (IDs) | Valor Total | Status |
|-----------|------------|-----------------|----------------|-------------|--------|
| 1         | 1          | 2025-05-01      | 1,2            | 12.49       | Concluído |
| 2         | 2          | 2025-05-02      | 2              | 7.50        | Pendente |

---

## 4. Aba: Settings (opcional)
Guarda configurações do sistema.

| Chave              | Valor                        |
|--------------------|------------------------------|
| lastProductId      | 57                           |
| availableCategories| Alimentos,Bebidas,Limpeza    |

---

## 5. Aba: Logs (opcional, para rastreamento de eventos)
Guarda ações do sistema (inclusão, alteração, exclusão).

| Data       | Usuário      | Ação        | Entidade | ID Entidade | Observações     |
|------------|--------------|-------------|----------|-------------|-----------------|
| 2025-05-01 | João Silva   | Inclusão    | Produto  | 1           | Produto cadastrado |
| 2025-05-02 | Maria Oliveira| Alteração  | Pedido   | 2           | Status alterado  |
