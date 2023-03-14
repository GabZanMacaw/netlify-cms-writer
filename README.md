Documentação do Netlify CMS (Decap CMS): https://decapcms.org/docs/intro/

# Como instalar o Netlify CMS (Decap CMS) em um projeto Next.js

No seu projeto Next.js, crie um arquivo `/public/admin/index.html` e cole nele o seguinte conteúdo:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    <title>Administrador de Conteúdo</title>
    <style>
      .css-1265b6l-TopBarContainer {
        padding: 0 !important;
      }

      .css-182avcw {
        padding: 0px 14px 0px !important;
      }

      .css-18u0cxx-StyledWrapper-StyledDropdown {
        margin-top: 12px !important;
        margin-bottom: 8px !important;
      }

      .css-1rsca1y-ControlContainer:first-of-type {
        margin-top: 16px !important;
      }

      .css-1rsca1y-ControlContainer:last-of-type {
        margin-bottom: 14px !important;
      }

      .css-83wr9v,
      .css-wesa1q-TextControl,
      .css-188efjc,
      .css-3yr7zq-TextControl,
      .css-1gic66b-NestedObjectLabel {
        padding: 4px 6px !important;
      }

      .css-1hvrgvd-CollectionTopContainer-card-cardTop {
        padding: 6px 10px !important;
      }

      .css-1t9i08i-ListCardLink {
        padding: 6px 12px !important;
      }
    </style>
  </head>
  <body>
    <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  </body>
</html>
```

Na página inicial do seu site `/src/pages/index.tsx` cole os seguintes códigos:

```tsx
// No topo da página:
<Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />

// No fundo da página:
<Script>
  {`if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }`}
</Script>
```

Clone este repositório `netlify-cms-writer` para o seu computador
e instale as dependências com `npm i`.

Agora, no `netlify-cms-writer`, acesse o arquivo `index.js`.
Ele contém vários comentários e informações sobre como configurar o seu CMS usando umas funções
que eu criei para facilitar.

Depois de terminar de programar a sua configuração, rode o comando `npm run build`
(ou `node ./index.js`). Um arquivo `config.yml` será criado nessa pasta.

Copie este arquivo `config.yml` e cole-o, com o mesmo nome, na pasta `/public/admin`
do seu projeto Next.js.

# Como adicionar e editar conteúdo

Primeiro, verifique se você criou todos os arquivos JSON vazios de File collection
entries necessários (mais explicações no `index.js`).

Para iniciar o servidor local, primeiro, descomente a linha `//local_backend: true` no `index.js`.
Rode `npm run build` para gerar um novo `config.yml` e coloque-o no seu projeto Next.js.

Depois, abra um terminal e rode `npx netlify-cms-proxy-server`.

Agora é só ir para a página `/admin` (ou `/admin/index.html` se não funcionar) do seu site local
e começar a editar.

***Lembre-se de retirar a linha `local_backend: true` do arquivo `config.yml` do seu projeto Next.js antes de commitar***

# Como usar o conteúdo do CMS no site

Todo o conteúdo criado no CMS é salvo em arquivos na pasta `/content` do seu projeto Next.js.

Crie um arquivo em `/src/lib/fileHandlers.ts` e cole nele o seguinte conteúdo:

```typescript
import fs from "fs/promises";
import path from "path";

export async function getContentFromFolder(folder: string) {
  const files = (await fs.readdir(path.resolve(process.cwd(), folder))).filter(
    (filename) => filename.includes(".")
  );

  const responseFiles = [];

  for (const filename of files) {
    const file = await fs.readFile(
      path.resolve(process.cwd(), `${folder}/${filename}`),
      "utf8"
    );
    const matterData = JSON.parse(file);

    responseFiles.push({
      data: matterData,
      slug: filename.slice(
        filename.lastIndexOf("/") + 1,
        filename.indexOf(".")
      ),
    });
  }

  return responseFiles;
}

export async function getContentFromFile(filepath: string) {
  const file = await fs.readFile(path.resolve(process.cwd(), filepath), "utf8");
  const matterData = JSON.parse(file);

  return {
    data: matterData,
    slug: filepath.slice(filepath.lastIndexOf("/") + 1, filepath.indexOf(".")),
  };
}

export async function getCmsEntry(filepath: string) {
  return await getContentFromFile(
    `content/${filepath.replace(/^\/+|\/+$/g, "")}.json`
  );
}

export async function getCmsCollection(path: string) {
  return await getContentFromFolder(`content/${path.replace(/^\/+|\/+$/g, "")}`);
}

```

Então, você pode obter o conteúdo, por exemplo, de uma home e uns produtos, assim:

```typescript
import { getCmsEntry } from "@/lib/fileHandlers";

export async function getStaticProps() {
  // Obtém o conteúdo do arquivo /content/home.json
  // Retorna um objeto com duas propriedades: data (contém o conteúdo em si) e slug (o nome do arquivo)
  const home = await getCmsEntry("home");

  // Obtém o conteúdo de todos os arquivos da pasta /content/produtos
  // Retorna uma lista de objetos com as mesmas propriedades, data e slug.
  const products = await getCmsCollection("produtos");

  return {
    props: {
      home: home.data,
      products,
    },
  };
}
```

# Como fazer deploy de um site usando Netlicy CMS (Decap CMS) na Netlify

Faça login na conta da MacawBrasil na Netlify (usando GitHub).

Clique em "Add new site -> import an existing project", permita acesso aos repositórios
do GitHub e selecione o repositório do seu projeto Next.js.

Configure o que precisar e clique em "Deploy site".

Na Dashboard do seu novo site, vá para a aba "Site settings", desça para a aba "Identity".

Clique em "Enable identity".

Em "Registration preferences", clique em "Edit settings" e mude para "Invite only".

Em "Git Gateway", clique em "Enable Git Gateway".

Agora é só convidar editores. Para fazer isso, na aba superior da Dashboard do site, vá para
"Integrations". Dentro, vá para "Identity -> View".

Clique em "Invite Users" e convide os emails que você quiser.

# Flow de registro para os usuários

Os usuários receberão um email e devem clicar em "Click here to accept the invite".

Ao aceitar o convite, eles serão levados para o site e terão que criar uma senha. Depois, é só eles
irem para a página `/admin` do site e começar a editar.
