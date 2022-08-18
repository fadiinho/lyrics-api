# Lyrics Api

Uma api para buscar letras de músicas.

## Endpoints

Pesquisar a letra de uma música pelo título:
```ts
const response = await axios.get(`${BASE_URL}/search/title`)
```

Se a letra for encontrada a resposta será no seguinte formato:
```ts
interface Response {
  ok: boolean; // Indica que ocorreu tudo bem.
  data: [ // Um array contendo a letra e mais algumas informações. Talvez possa incluir vários sites.
    {
      lyrics: string; // A letra
      baseUrl: string; // O site que a letra foi encontrada
      url: string; // A url da letra
    }
  ];
}
```

> Por agora só um endpoint.

## TODO:
[x] Adicionar endpoint para pesquisar por título.
[ ] Adicionar endpoint para uma música aleatória.
  [ ] Por gênero?
  [ ] Por artista?
  [ ] Por idioma?
