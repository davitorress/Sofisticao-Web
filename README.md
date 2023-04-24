
![Logo](./assets/img/readme/readme.svg)


# Sofisticão

Sofisticaão é um e-commerce que oferece roupas e acessórios para animais de estimação. Seu objetivo é fornecer produtos de alta qualidade e confortáveis para os animais, enquanto mantém a elegância e sofisticação.

A empresa entende que os animais de estimação fazem parte da família e merecem o melhor tratamento possível. Por isso, eles oferecem uma ampla gama de produtos, desde roupas até acessórios para gatos, cães e outros animais.


## Tabela de conteúdos
<!--ts-->
- [Sofisticão](#sofisticão)
  - [Tabela de conteúdos](#tabela-de-conteúdos)
  - [Como usar](#como-usar)
    - [Pré-requisitos](#pré-requisitos)
    - [Configurando ambiente MongoDB com PHP](#configurando-ambiente-mongodb-com-php)
    - [🎲 Rodando o Back End (API)](#-rodando-o-back-end-api)
    - [🛠 Tecnologias](#-tecnologias)
<!--te-->
## Como usar
Passo a passo de como configurar o ambiente e rodar a aplicação

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[XAMPP](https://www.apachefriends.org/pt_br/download.html) com a versão do PHP 8.1. Para a base de dados utilizaremos o [MongoDB](https://www.mongodb.com/try/download/community) versão 5.0.16.
É necessário ter o gerenciador de dependências [Composer](https://getcomposer.org/) versão 2.5.5 instalado na máquina.
Além disto terá que ter o editor [VSCode](https://code.visualstudio.com/) com a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

### Configurando ambiente MongoDB com PHP

- Baixe o [MongoDB Driver](https://pecl.php.net/package/mongodb/1.13.0/windows) para PHP versão 1.13
- Extraia os arquivos e coloque o arquivo php_mongodb.dll dentro da pasta C:\xampp\php\ext
- Vá até o arquivo php.ini dentro da pasta C:\xampp\php e na sessão Dynamic Extensions adicione a seguinte linha:
  ```bash
    extension=php_mongodb.dll
  ```

### 🎲 Rodando o Back End (API)

```bash
# Clone este repositório
$ git clone https://github.com/joao-arthr/SofisticaoAPI.git
```
```bash
#Acesse o XAMPP e vá na opção Shell, lá inicie o server php na pasta public da API utilizando o endereço localhost:8000, igual o comando abaixo,
#Lembre-se que o Shell abrira no diretório c:\\xampp 
$ php -S localhost:8000 -t htdocs/SofisticaoAPI/public

# O servidor local onde está rodando a API é <http://localhost:8000>
'''


### 🎲 Importando o Banco de Dados (MongoDB)
    Crie o banco de dados com nome 'Sofisticao' com as coleções User e Product
    Após clonar o Projeto acesse a pasta SofisticaoAPI/app/models/assets e importe os arquivos 'User.json' e 'Product.json' nas coleções User e Product respectivamente

### 📱 Rodando o Front End (Web)

```bash
# Clone este repositório
$ git clone https://github.com/davitorress/Sofisticao-Web.git

```
Abra o repositório do 'Sofisticao-Web' no VS Code e inicie a extensão Live Server. Ela iniciará um servidor para o Site. Sem o servidor o Front não consegue consumir a API.

Para acessar o CMS utilize o link e adicione /cms.
O login do CMS é email 'admin@admin.com' e senha 'admin', tal qual está salvo na base de dados.



### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Xampp](https://www.apachefriends.org/pt_br/download.html)
- [PHP](https://php.net/)
- [Composer](https://getcomposer.org/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)
- HTML
- JavaScript
- CSS


