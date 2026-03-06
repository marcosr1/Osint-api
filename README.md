# 🔎 OSINT API

API simples para coleta de informações públicas (OSINT) sobre domínios e IPs.

Este projeto foi desenvolvido em **Node.js** e permite realizar consultas como:

* DNS lookup
* WHOIS
* GeoIP
* HTTP headers
* Status de sites

## 🚀 Tecnologias

* Node.js
* Express
* Axios
* DNS (Node)
* whois

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/seuusuario/osint-api.git
cd osint-api
```

Instale as dependências:

```bash
npm install
```

## ▶️ Executar o projeto

```bash
npm run dev
```

ou

```bash
node src/server.js
```

A API ficará disponível em:

```
http://localhost:3000
```

---

# 📡 Endpoints

## DNS Lookup

Obtém os IPs de um domínio.

```
GET /dns?domain=google.com
```

Exemplo de resposta:

```json
{
  "domain": "google.com",
  "addresses": [
    "142.250.79.14"
  ]
}
```

---

## HTTP Headers

Obtém os headers de um site.

```
GET /headers?url=https://google.com
```

Resposta:

```json
{
  "content-type": "text/html",
  "server": "gws"
}
```

---

## Status do site

Verifica se um site está online.

```
GET /status?url=https://google.com
```

Resposta:

```json
{
  "status": 200
}
```

---

## GeoIP

Obtém informações geográficas de um IP.

```
GET /geoip?ip=8.8.8.8
```

Resposta:

```json
{
  "country": "United States",
  "city": "Mountain View",
  "isp": "Google LLC"
}
```

---
## GetIP

Obtém informações do IP a partir do dominio.

```
GET /getip?domain=google.com
```

Resposta:

```json
{
    "domain": "google.com",
    "ip": "if",
    "family": 
}
```

---

## WHOIS

Obtém informações de registro de um domínio.

```bash
GET /whois?domain=google.com
```

Resposta:

```json
{
  "domain": "google.com",
  "registrar": "MarkMonitor",
  "creationDate": "1997-09-15"
}
```

---

# 📂 Estrutura do projeto

```bash
src/
 ├── routes/
 │    └── osintRoutes.js
 ├── services/
 │    └── osintService.js
 ├── app.js
 │ server.js
```

---

# ⚠️ Aviso

Esta API utiliza **informações públicas** e deve ser usada apenas para:

* pesquisa
* aprendizado
* segurança
* OSINT

Não utilize para atividades ilegais.

---

# 🧠 Melhorias futuras

* Scan completo de domínio
* Descoberta de subdomínios
* Verificação SSL
* Identificação de tecnologias
* Integração com APIs externas

---

# 📜 Licença

MIT License
