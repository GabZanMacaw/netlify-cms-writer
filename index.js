import { stringify } from "yaml";
import * as fs from "fs";
import * as cms from "./cmsUtil";

// https://decapcms.org/docs/intro/
// Escreva o seu objeto de configuração abaixo, dentro da função `stringify`.
// (O Netlify CMS mudou de nome para Decap CMS, mas é a mesma coisa)
// OBS: O que não está comentado não deve ser alterado.
const content = stringify({
  // https://decapcms.org/docs/configuration-options/#backend
  // Aqui você só precisa se preocupar com a opção "branch"
  backend: {
    name: "git-gateway",

    // Coloque aqui o nome do branch em que o site está.
    branch: "master",
  },

  // https://decapcms.org/docs/beta-features/#working-with-a-local-git-repository
  // Descomente essa linha e rode `npx netlify-cms-proxy-server` para testar o CMS localmente:
  //local_backend: true

  // A pasta onde as imagens subidas serão armazenadas.
  // Se quiser trocar, mantenha o `public` para que as imagens sejam acessíveis pelo navegador.
  media_folder: "/public/uploads",

  // A localização das imagens no site final, acessíveis pelo navegador.
  public_folder: "/uploads",

  display_url: "/",

  // Idioma do CMS, não do site.
  locale: "pt",

  // https://decapcms.org/docs/collection-types/
  // Aqui é onde você define os tipos de conteúdo do CMS.
  // Há dois tipos de coleção: Folder e File.
  //
  // Uma File collection é como uma coleção de Single Types do Strapi:
  // - Agrega arquivos estáticos, *não-repetíveis*.
  // - Cada arquivo pode ter uma estrutura diferente.
  // - Editores só podem editar o conteúdo, não podem criar ou deletar entradas.
  // - Bom para homes, páginas de sobre, SEO, ou qualquer outro tipo de conteúdo que não precisa repetir.
  //
  // Uma Folder collection é como um Collection Type do Strapi:
  // - Coleção de arquivos repetíveis.
  // - Todos os arquivos na coleção seguem a mesma estrutura.
  // - Editores podem criar, deletar e editar entradas.
  // - Bom para produtos, postagens de blog, serviços, eventos, ou qualquer outro componente repetível.
  collections: [
    // Comece definindo uma File collection para os conteúdos das páginas estáticas do site:
    // Sintaxe: `cms.fileCollection(nome, opções (null == usar padrões), lista de entradas)`
    cms.fileCollection("Páginas", null, [
      // Dentro da lista de entradas dessa coleção, você define cada página do seu site.
      // Nesse exemplo, os conteúdos da Home serão salvos no arquivo `/content/home.json`
      // -----------------
      // IMPORTANTE: Antes de editar uma entrada em uma File collection, o arquivo precisa EXISTIR e ser VÁLIDO.
      // Ou seja, você deve criar o arquivo `/content/home.json` manualmente com o conteúdo `{}` antes de
      // poder editá-lo no CMS.
      // Isso não precisa ser feito para as Folder collections.
      // -----------------
      // Sintaxe: `cms.fileCollectionEntry(nome, opções (null == usar padrões), lista de campos editáveis)`
      cms.fileCollectionEntry("Home", null, [
        // Dentro da lista de campos da página, você define cada campo do seu conteúdo.
        // Todas as funções estão documentadas em JSDoc, então se ficar com dúvida de como usar
        // alguma função, passe o mouse por cima no VSCode para ver uma descrição.
        //
        // Alguns exemplos de campos que você pode criar (é só descomentar a linha ou digitar abaixo):
        //cms.string("Título")
        //cms.text("Descrição", { hint: "Descrição da página." })
        //cms.markdown("Corpo do texto")
        //cms.number("Preço")
        //cms.boolean("Ativo?", { default: true })
        //cms.datetime("Data de lançamento")
        //cms.image("Imagem")
        //cms.file("Catálogo")
        //cms.lista("Banners", null, [cms.string("Título"), cms.image("Imagem")])
        //cms.object("Seção de contato", null, [cms.string("E-mail"), cms.string("Telefone")])
        //
        // Eu não criei funções pra uns tipos de campos mais complexos, mas você pode escrevê-los como um objeto normal:
        //{ label: "Categoria", name: "categoria", widget: "relation", collection: "categorias", search_fields: ["nome"], value_field: "filename", display_fields: ["nome"] }
        //{ label: "Cidade", name: "cidade", widget: "select", options: [{ label: "Caxias do Sul", value: "CXS" }, { label: "Porto Alegre", value: "POA" }, { label: "Farroupilha", value: "FRP" }] }
        //
        // ...campos vão aqui
      ]),
    ]),

    // Você também pode criar uma Folder collection para conteúdos repetíveis do site:
    // Sintaxe: `cms.folderCollection(nome, opções (null == usar padrões), lista de campos editáveis)`
    cms.folderCollection("Serviços", null, [
      // Aqui dentro vão as mesmas opções de campos que a File collection entry criada acima.
      //
      // ...campos vão aqui
    ]),

    // Você pode criar quantas coleções você quiser, de ambos os tipos (File e Folder).
  ],
});

// O arquivo de configuração será salvo nessa pasta em `config.yml`.
fs.writeFileSync("config.yml", content);
