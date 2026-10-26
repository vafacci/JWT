# JWT Authentication – simpel skitse

Baseret på:

1. [JWT Explained In Under 10 Minutes](https://www.youtube.com/watch?v=Y2H3DXDeS3Q) – **hvad** JWT er  
2. [JWT Authentication Tutorial – Node.js](https://www.youtube.com/watch?v=mbsmsi7l3r4) – **hvordan** man bygger det  

---

## De vigtigste begreber (video 1)

| Begreb | Betydning |
|--------|-----------|
| **Authentication** | Hvem er du? (login med credentials) |
| **Authorization** | Må du gøre det her? (tjek af JWT) |
| **Access token** | Kortlevet JWT – sendes med hvert API-kald |
| **Refresh token** | Længerelevet – bruges til at få nye access tokens |
| **Stateless** | Serveren behøver ikke huske sessionen; alt ligger i tokenet |

En JWT har 3 dele: `header.payload.signature`  
Den er **Base64-kodet** (alle kan læse payload) – **ikke** hemmelig. Signaturen sørger for, at ingen kan ændre indholdet uden secret.

---

## Flowet i denne skitse

```
1. POST /login          → accessToken + refreshToken
2. GET  /posts          → send accessToken i header: Authorization: Bearer ...
3. POST /token          → nyt accessToken (når det gamle er udløbet)
4. DELETE /logout       → slet refreshToken
```

- **authServer.js** (port 4000) = login / refresh / logout  
- **server.js** (port 3000) = API (posts) – verificerer kun JWT  

---

## Kom i gang

```bash
npm install
```

Åbn **to terminaler**:

```bash
npm run devStart        # API på :3000
npm run devStartAuth    # Auth på :4000
```

Test med filen `request.rest` (VS Code-udvidelsen **REST Client**) eller Postman / curl.

1. Kør **Login** → kopier `accessToken`  
2. Indsæt det i GET `/posts` efter `Bearer `  
3. Vent 15 sekunder → GET fejler (403)  
4. Brug **Refresh** med `refreshToken` → nyt accessToken  
5. **Logout** → refresh virker ikke længere  

Prøv også at logge ind som `"Jim"` i stedet for `"Kyle"` – så får du kun Jims post.

---

## Tip: se indeni et token

Kopiér et accessToken ind på [jwt.io](https://jwt.io) – du kan se payload (`name`, `iat`, `exp`).  
Ændrer du noget, matcher signaturen ikke længere → serveren afviser med 403.
