# app-delivery

  1 Preciso de um app de delivery focado em cidade pequena, o app não terá interação com pagamentos ou api de mapas.
  
  Página do adm .aceita ou recusa novas entregadores, e bloqueia entregador quando necessário. .Cria novas lojas (fotos, produtos e adicionais) .tem um controle de quais vendas tiveram mensalmente podendo zerar (forma do adm cobrar pelo isso do app)
  
  área do cliente, cadastro simples: .vizualizações de todas as lojas disponíveis classificadas por avaliação de 1 a 5 estrelas topo produtos em promoção e outros estilizados como a do ifood.
  
  áRea do entregador: .fica on-line e começa a aparecer corridas ele escolhe aceita ou não.
  
  Informações adicionais: a entrega não terá rastreamento mais será atualizada por partes exemplo: .Analizando comprovante .Preparando pedido .Pedido pronto pra entrega .Saiu pra entrega .Pedido entregue
  
  e outros detalhes simples que não mencionei mais essas são as funções principais.

# Materiais que usei para realizar esse projeto

  - https://www.youtube.com/watch?v=aABUs_L4AZg
  - https://docs.expo.dev/
  - https://tailwindcss.com/docs/installation/using-vite

# O código que usei para o banco de dados 
  
  CREATE DATABASE delivery;
  USE delivery;
    
  -- Tabela de Usuários
  CREATE TABLE usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL,
      tipo ENUM('cliente', 'entregador', 'administrador') NOT NULL,
      telefone VARCHAR(15),
      status ENUM('ativo', 'inativo') NOT NULL,
      data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
  -- Tabela de Lojas
  CREATE TABLE lojas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      descricao TEXT,
      foto_url VARCHAR(255),
      endereco VARCHAR(255),
      status ENUM('ativo', 'inativo') NOT NULL,
      data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      id_admin INT,
      FOREIGN KEY (id_admin) REFERENCES usuarios(id)
  );
  
  -- Tabela de Produtos
  CREATE TABLE produtos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_loja INT,
      nome VARCHAR(100) NOT NULL,
      descricao TEXT,
      preco DECIMAL(10, 2) NOT NULL,
      foto_url VARCHAR(255),
      quantidade_estoque INT NOT NULL,
      status ENUM('ativo', 'inativo') NOT NULL,
      data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_loja) REFERENCES lojas(id)
  );
  
  -- Tabela de Adicionais
  CREATE TABLE adicionais (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_produto INT,
      nome VARCHAR(100) NOT NULL,
      preco_adicional DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (id_produto) REFERENCES produtos(id)
  );
  
  -- Tabela de Pedidos
  CREATE TABLE pedidos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_cliente INT,
      id_loja INT,
      status_pedido ENUM('Analisando comprovante', 'Preparando pedido', 'Pedido pronto para entrega', 'Saiu para entrega', 'Pedido entregue') NOT NULL,
      data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      total DECIMAL(10, 2) NOT NULL,
      forma_pagamento VARCHAR(50),
      id_entregador INT NULL,
      endereco_entrega VARCHAR(255),
      observacoes TEXT,
      FOREIGN KEY (id_cliente) REFERENCES usuarios(id),
      FOREIGN KEY (id_loja) REFERENCES lojas(id),
      FOREIGN KEY (id_entregador) REFERENCES usuarios(id)
  );
  
  -- Tabela de Itens_Pedido
  CREATE TABLE itens_pedido (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_pedido INT,
      id_produto INT,
      quantidade INT NOT NULL,
      preco_unitario DECIMAL(10, 2) NOT NULL,
      id_adicional INT NULL,
      FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
      FOREIGN KEY (id_produto) REFERENCES produtos(id),
      FOREIGN KEY (id_adicional) REFERENCES adicionais(id)
  );
  
  -- Tabela de Avaliações
  CREATE TABLE avaliacoes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_cliente INT,
      id_loja INT NULL,
      id_entregador INT NULL,
      nota INT CHECK (nota >= 1 AND nota <= 5),
      comentario TEXT,
      data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_cliente) REFERENCES usuarios(id),
      FOREIGN KEY (id_loja) REFERENCES lojas(id),
      FOREIGN KEY (id_entregador) REFERENCES usuarios(id)
  );
  
  -- Tabela de Entregadores
  CREATE TABLE entregadores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_usuario INT,
      status_entregador ENUM('online', 'offline') NOT NULL,
      bloqueado BOOLEAN NOT NULL DEFAULT FALSE,
      ultimo_login TIMESTAMP,
      data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
  );

