
<table>
    <tr>
        <th style="width:35%; font-size:20px;"><a href="https://furia-fans.vercel.app/">Deploy - Furia Fans 🚀</a></th>
	    <th style="width:35%; font-size:20px;"><a href="https://docs.google.com/document/d/1_QlS5TYwq8F9tFdWsrCBjOkJOK-gvLrjTQP5OPQafYc/edit?usp=sharing">📑 Escopo do Projeto </a></th>
        <th style="width:35%; font-size:20px;"><a href="https://api-dashboard-furia.onrender.com/swagger-ui">🧩 SpringDoc - SwaggerUI </a></th>
    </tr>
</table>
<br>

# Furia Fans

Plataforma interativa criada para os fãs e torcedores da equipe FURIA, oferecendo uma rede social exclusiva com recursos de feed, eventos, perfis personalizados e muito mais.

---

## Objetivo

O **Furia Fans** foi desenvolvido para conectar os torcedores da FURIA entre si e com a própria organização. Através da plataforma, os usuários podem:

- Interagir com postagens no feed (criar, responder e deletar).
- Acompanhar os próximos eventos da equipe.
- Visualizar e editar seus perfis, incluindo redes sociais e jogos favoritos.
- Filtrar usuários por jogos preferidos.
- Alternar entre temas **claro** e **escuro**.

Além disso, a plataforma ajuda a FURIA a conhecer melhor seu público-alvo.

> Projeto desenvolvido para o processo seletivo de Assistente de Engenharia de Software, com o objetivo de demonstrar minhas habilidades técnicas em frontend e backend.

---

## Tecnologias Utilizadas

### <img width="20px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" /> Backend

#### Repositório: [API-dashboard-furia](https://github.com/rudr1gu/api-dashboard-furia)

- Java 17
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- Spring Docs (Swagger UI)

### <img width="20px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" /> Banco de Dados

- MySQL (desenvolvimento)
- PostgreSQL (produção)

### <img width="20px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" /> Frontend

- ReactJS com TypeScript
- Tailwind CSS

### <img width="20px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" /> Clound
- Render para o backend e banco de dados
- Vercel Para o frontend

---

```mermaid
erDiagram
  USUARIO ||--o{ REDE_SOCIAL : possui
  USUARIO ||--o{ POSTAGEM : cria
  USUARIO ||--o{ RESPOSTA : escreve
  USUARIO ||--o{ INTERACAO : reage
  USUARIO }o--o{ JOGO : joga
  USUARIO }o--o{ EVENTO : participa
  USUARIO }o--o{ CONQUISTA : ganha
  USUARIO }|--|| NIVEL : tem

  POSTAGEM ||--o{ RESPOSTA : recebe
  POSTAGEM ||--o{ INTERACAO : tem
  POSTAGEM }o--|| JOGO : relacionado_a

  REDE_SOCIAL {
    int id
    string plataforma
    string link
  }

  USUARIO {
    int id
    string nome
    string nickname
    string email
    string senha
    string avatar
    datetime data_cadastro
    int nivel_id
  }

  POSTAGEM {
    int id
    text conteudo
    datetime data
  }

  RESPOSTA {
    int id
    text conteudo
    datetime data
  }

  INTERACAO {
    int id
    string tipo
  }

  JOGO {
    int id
    string nome
    string imagem
  }

  EVENTO {
    int id
    string titulo
    text descricao
    datetime data_evento
    string link
    string local
    string imagem
  }

  NIVEL {
    int id
    string nome
  }

  CONQUISTA {
    int id
    string titulo
    text descricao
    string icone
  }


```

## Futuras Implementações

- Gamificação com níveis: Bronze, Ouro e Platina, conforme engajamento.
- Transformar a aplicação em PWA e integrar notificações via Firebase.
- Refatoração do backend com uso de DTOs e melhor tratamento de exceções.

---

## 📷 Demonstrações

<img src="./public/home.png" width="80%">
<img src="./public/fans.png" width="80%">
<img src="./public/eventos.png" width="80%">
<img src="./public/perfil.png" width="80%">



---

## Autor

**Rodrigo Santos Silva**  
Desenvolvedor Fullstack  
📧 rodrigo.santos.ii@hotmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/rudr1gu) | [GitHub](https://github.com/rudr1gu) | [Portifólio](https://rudr1gu.vercel.app)

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
