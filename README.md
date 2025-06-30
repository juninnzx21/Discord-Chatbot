# Bot de controle Para servidor de discord Roleplay Policial
Olá, eu sou  [Juninnzx](https://github.com/juninnzx21), desenvolvedor do bot de controle policial para o Discord. Com este bot, é possível ter controle sobre os membros, gerenciando suas ausências, marcando ponto, gerando rankings e muito mais. Iniciei este projeto com o intuito de vendê-lo, ainda estou desenvolvendo e aprimorando o bot para que no futuro ele possa gerenciar tudo sozinho bastando apenas os administradores execultarem os comandos nescessarios para isso.


## Instalação

para instalar o projeto utilize o comando:

```bash
  npm install
```
apos execultar a Instalação procure o [arquivo (config.json)](https://github.com/juninnzx21/Discord-Chatbot/blob/main/config.json) e complete os campos 
    
```bash
{
    "token": "",
    "embedcolor" : "2f3136",
    "relatoriolog" : "",
    "batepontolog" : "",
    "ausenciaLog": "",
    "siglaguarnição" : "",

    "AUSENCIA":{
        "cargo_verificador":"",
        "cargo_ausencia":""
    },

    "TICKET":{
        "cargo": "",
        "ticketlogs": "",
        "categoria": ""
 {
    "token": "TOKEN DO BOT",
    "embedcolor" : "2f3136",
    "relatoriolog" : "ID",
    "batepontolog" : "ID",
    "ausenciaLog": "ID",
    "siglaguarnição" : "SIGLA EX> PMESP, PMERJ ",

    "AUSENCIA":{
        "cargo_verificador":"ID",
        "cargo_ausencia":"ID"
    },

    "TICKET":{
        "cargo": "ID",
        "ticketlogs": "ID",
        "categoria": "ID"
    },


    "ADVERTENCIAS": {
        "advertanciacanal":"",
        "exonerascanal": "",
        "cargoadv_verbal":"",
        "cargoadv_1":"",
        "cargoadv_2":""
    },
    "HIERARQUIA": [
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID",
       "CARGO ID"


    ]

}
```
Completanndo os campos verifique a integridade dos arquivos e inicalize o projeto com:

```
node .
```

Perfeito se tudo estiver correto o bot inicalizará sozinho.


## Funcionalidades

- Controle de Membros Exoneração, Advertencia, Etc...
- Sistema de Bate-ponto completo com (ranking)
- Sistema de Verificação de tempo de ponto aberto
- Sistema de envio de mensagens base por comando
- Sistema de Ausencia com total controle de membros 


## Referência

 - [Discord.js](https://discord.js.org/) - Sistema Utilizado para criação do bot
 - [SqlLite](https://www.sqlite.org/index.html) -  Sistema estudado para armazenagem de arquivo em modo local.


## Liscensas

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


