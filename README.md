![Logo](https://imagensfree.com.br/wp-content/uploads/2021/11/entregador-ifood-png-bicicleta-300x276.png)

<h1 align="center">
     Desafio-iFood-Back - Equipe Traceback (6)
</h1>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=FINALIZADO&color=GREEN&style=for-the-badge)

Tópicos
=================
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Interface Web](#-interface-web)
   * [Informações Gerais](#-informações-gerais)
   * [Pré-requisitos](#-pré-requisitos)
   * [Editar a aplicação ou rodar localmente](#-editar-a-aplicação-ou-rodar-localmente)
   * [Tecnologias](#-tecnologias)
   * [Time de desenvolvimento](#-time-de-desenvolvimento)


## 💻 Sobre o projeto

Em resumo, o processo se dará através:

entregador se conecta no sistema (estilo web app), e faz seu login;
verifica em uma lista os pedidos em "aberto" e escolhe um destes para fazer a entrega;
após a confirmação de aceite do pedido, o entregador passa a ser monitorado através da telemetria (latitude e longitude) até completar a entrega.
quando finalizar a "entrega" o entregador avisa via sistema que fará o fechamento do pedido. Há também a possibilidade de cancelar o pedido.
link para o repositório de Back: https://github.com/Pam18/desafio1-ifood-back.git
### :calling: Interface Web
<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="smathphone" title="#smathphone" src="https://github.com/Pam18/desafio1-ifood-front/blob/readme_2/Componentes/assets/mobile.png" width="40px">
  <img alt="smathphone" title="#smathphone" src="https://raw.githubusercontent.com/jeandsontb/project-banc-inter/main/frontend-app/screen/interfront.png" width="40px">
</p>
## ⚙️ Informações Gerais


O sistema guardará estas informações para poder exibir relatórios do histórico de entrega baseado nesta telemetria armazenada, sendo a persistência dos dados feito num SGBD Postgres.


O que foi implementado durante o projeto:
1) Logar entregador com autorização e armazenamento de token e id
2) Verificar se há login expirado no banco de dados ao se comunicar e, si houver, dar continuidade ao pedido com exibição na tela.
3) Apresentar uma lista de pedidos em aberto para as entregas ser realizadas pelo entregador.
4) Seleção da entrega através da lista visual para o entregador.
5) Função de iniciar corrida que altera o estado de aberto para trânsito.
6) Função de confirmar corrida e cancelar corrida.
8) Passagem de tela a tela.
9) Função de logout para a saída da aplicação.

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git], [Vscode].

## :octocat:  Editar a aplicação ou rodar localmente


```bash

# Clone este repositório em sua máquina  
$ git clone https://github.com/Pam18/desafio1-ifood-front.git

```
---

## 🛠 Linguagem

As seguintes linguagens/tecnologias foram usadas na construção do projeto:
- [JavaScript][javaScript]
## 🛠 Tecnologias
- [Bootstrap][bootstrap]
- [Vscode][vscode]
- [Trello][trello]
- [Notion][notion]
- [Git][git]
---

## 🦸 Time de desenvolvimento

⚙️**Bianca Padilha** - [GitHub](https://github.com/Padilha27) [Linkedin](https://www.linkedin.com/in/bianca-padilha-070772174/) 

⚙️**Yhaohannah Lima** - [GitHub](https://github.com/Pam18) [Linkedin](https://www.linkedin.com/in/yhaohannah-lima-954690216/)

⚙️**Eduardo Gomes** - [GitHub](https://github.com/Eduardo377) [Linkedin](https://www.linkedin.com/in/eduardogomes377/)

⚙️**Franklin Percicotte** - [GitHub](https://github.com/frankpercicotte) [Linkedin](https://www.linkedin.com/in/franklinpercicotte/)

⚙️**Guilherme Campos** - [GitHub](https://github.com/GuilhermeFelipeCampos) [Linkedin](https://www.linkedin.com/in/guilhermefelipecampos/)

---
[trello]: https://trello.com/b/vpS2rAnJ/desafio/
[notion]: https://www.notion.so/
[vscode]: https://code.visualstudio.com/
[bootstrap]: https://www.notion.so/9ac83364a717462d8cca8711970507ac?v=2e3b3fa0208a4880a77c291e995f2f73/
[javascript]: https://www.ecma-international.org/
[git]:https://git-scm.com/