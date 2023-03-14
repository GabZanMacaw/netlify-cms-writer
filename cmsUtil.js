import slug from "slug";

function opt(options, defaults) {
  let obj = { ...defaults, ...options };

  return obj;
}

function slugify(text) {
  return slug(text, {
    replacement: "_",
    lower: true,
    trim: true,
  });
}

/**
 * Cria uma `FileCollection`, uma coleção de entradas (arquivos) **não-repetíveis**, cada uma com uma estrutura de campos diferente.
 * @param {string} label - O nome dessa coleção no editor. Ex: `Páginas`
 * @param {* | null} options - Um objeto contendo quaisquer [opções de coleção](https://decapcms.org/docs/collection-types/) que você quiser. Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * name: "[slug do nome da coleção]"
 * ```
 * @param {any[]} files - Uma lista de `FileCollectionEntry`s que serão editáveis pelo CMS. Cada arquivo é uma entrada diferente no CMS.
 * @returns {FileCollection}
 */
export function fileCollection(label, options, files) {
  return {
    label,
    ...opt(options, { name: slugify(label) }),
    files,
  };
}

/**
 * Cria uma `FolderCollection`, um tipo de entrada **repetível**. Permite criar, editar e deletar entradas, todas com a mesma estrutura de campos.
 * @param {string} label - O nome dessa coleção no editor. Ex: `Produtos`
 * @param {any | null} options - Um objeto contendo [opções de coleção](https://decapcms.org/docs/collection-types/). Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * name: "[slug do nome da coleção]"
 * extension: json
 * folder: /content/[slug do nome da coleção]
 * create: true
 * identifier_field: titulo # MUDE ISSO se esse tipo não tiver o campo titulo
 * ```
 * @param {Field[]} fields - Uma lista de `Field`s, ou seja, os campos dessa coleção.
 * @returns {FolderCollection}
 */
export function folderCollection(label, options, fields) {
  const slug = options?.name || slugify(label);
  return {
    label,
    fields,
    ...opt(options, {
      name: slug,
      extension: "json",
      create: true,
      identifier_field: "titulo",
      folder: `/content/${slug}`,
    }),
  };
}

/**
 * Cria uma `FileCollectionEntry`, um arquivo em uma `FileCollection`. Pode representar, por exemplo, uma Home, ou uma página Sobre, ou qualquer outro tipo de conteúdo que não precisa repetir.
 * @param {string} label - O nome dessa entrada no editor. Ex: `Home`
 * @param {any | null} options - Um objeto contendo opções de arquivo. Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * i18n: true
 * name: "[slug do nome do arquivo]"
 * file: /content/[slug do nome do arquivo].json
 * ```
 * @param {Field[]} fields - Uma lista de `Field`s, ou seja, os campos dessa coleção.
 * @returns {FileCollectionEntry}
 */
export function fileCollectionEntry(label, options, fields) {
  const slug = options?.name || slugify(label);
  return {
    label,
    fields,
    ...opt(options, {
      i18n: true,
      name: slug,
      file: `/content/${slug}.json`,
    }),
  };
}

/**
 * Cria um campo de string.
 * @param {string} label - O nome desse campo no editor. Ex: `Título`
 * @param {any | null} options - Um objeto contendo [opções de widget](https://decapcms.org/docs/widgets/#string). Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * i18n: true
 * name: "[slug do nome do campo]"
 * required: false
 * ```
 * @returns {Field<string>}
 */
export function string(label, options) {
  return {
    label,
    widget: "string",
    ...opt(options, {
      name: slugify(label),
      required: false,
      i18n: true,
    }),
  };
}

/**
 * Cria um campo de texto multilinha.
 * @param {string} label - O nome desse campo no editor. Ex: `Descrição`
 * @param {any | null} options - Um objeto contendo [opções de widget](https://decapcms.org/docs/widgets/#text). Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * i18n: true
 * name: [slug do nome do campo]
 * required: false
 * ```
 * @returns {Field<string>}
 */
export function text(label, options) {
  return {
    label,
    widget: "text",
    ...opt(options, {
      name: slugify(label),
      required: false,
      i18n: true,
    }),
  };
}

/**
 * Cria um campo de texto formatado (markdown).
 * @param {string} label - O nome desse campo no editor. Ex: `Corpo do texto`
 * @param {any | null} options - Um objeto contendo [opções de widget](https://decapcms.org/docs/widgets/#markdown). Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * i18n: true
 * name: "[slug do nome do campo]"
 * required: false
 * ```
 * @returns {Field<string>}
 */
export function markdown(label, options) {
  return {
    label,
    widget: "markdown",
    ...opt(options, {
      name: slugify(label),
      required: false,
      i18n: true,
    }),
  };
}

/**
 * Cria um campo de boolean.
 * @param {string} label - O nome desse campo no editor. Ex: `Mostrar no rodapé`
 * @param {any | null} options - Um objeto contendo [opções de widget](https://decapcms.org/docs/widgets/#boolean). Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * default: false
 * i18n: duplicate
 * name: "[slug do nome do campo]"
 * required: false
 * ```
 * @returns {Field<boolean>}
 */
export function boolean(label, options) {
  return {
    label,
    widget: "boolean",
    ...opt(options, {
      default: false,
      name: slugify(label),
      required: false,
      i18n: "duplicate",
    }),
  };
}

/**
 * Cria um campo de número.
 * @param {string} label - O nome desse campo no editor. Ex: `Preço`
 * @param {any | null} options - Um objeto contendo [opções de widget](https://decapcms.org/docs/widgets/#number). Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * default: 0.0
 * value_type: float
 * i18n: duplicate
 * name: "[slug do nome do campo]"
 * required: false
 * ```
 * @returns {Field<number>}
 */
export function number(label, options) {
  return {
    label,
    widget: "number",
    ...opt(options, {
      default: 0.0,
      value_type: "float",
      name: slugify(label),
      required: false,
      i18n: "duplicate",
    }),
  };
}

/**
 * Cria um campo de seleção de data e hora. Por padrão, salva como uma string no formato ISO8601, que pode ser transformada em um objeto `Date` em Javascript usando `new Date()`.
 * @param {string} label - O nome desse campo no editor. Ex: `Data e hora`
 * @param {any | null} options - Um objeto contendo [opções de widget](https://decapcms.org/docs/widgets/#datetime). Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * date_format: DD/MM/YYYY
 * time_format: HH:mm
 * format: YYYY-MM-DDTHH:mm:ssZ
 * i18n: duplicate
 * name: "[slug do nome do campo]"
 * required: false
 * ```
 * @returns {Field<string>}
 */
export function datetime(label, options) {
  return {
    label,
    widget: "datetime",
    ...opt(options, {
      name: slugify(label),
      required: false,
      i18n: "duplicate",
      date_format: "DD/MM/YYYY",
      time_format: "HH:mm",
      format: "YYYY-MM-DDTHH:mm:ssZ",
    }),
  };
}

/**
 * Cria um campo de seleção de arquivo. O arquivo será salvo na pasta indicada na configuração `media_folder`.
 * @param {string} label - O nome desse campo no editor. Ex: `Catálogo`
 * @param {any | null} options - Um objeto contendo [opções de widget](https://decapcms.org/docs/widgets/#file). Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * i18n: duplicate
 * name: "[slug do nome do campo]"
 * required: false
 * ```
 * @returns {Field<string>}
 */
export function file(label, options) {
  return {
    label,
    widget: "file",
    ...opt(options, {
      name: slugify(label),
      required: false,
      i18n: "duplicate",
    }),
  };
}

/**
 * Cria um campo de seleção de imagem. O arquivo será salvo na pasta indicada na configuração `media_folder`.
 * @param {string} label - O nome desse campo no editor. Ex: `Banner`
 * @param {any | null} options - Um objeto contendo [opções de widget](https://decapcms.org/docs/widgets/#image). Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * i18n: duplicate
 * name: "[slug do nome do campo]"
 * required: false
 * ```
 * @returns {Field<string>}
 */
export function image(label, options) {
  return {
    label,
    widget: "image",
    ...opt(options, {
      name: slugify(label),
      required: false,
      i18n: "duplicate",
    }),
  };
}

/**
 * Cria um campo de objeto, ou seja, uma coleção de outros campos. Pode ser pensado como um componente.
 * @param {string} label - O nome desse campo no editor. Ex: `Informações de contato`
 * @param {any | null} options - Um objeto contendo [opções de widget](https://decapcms.org/docs/widgets/#object). Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * i18n: duplicate
 * name: "[slug do nome do campo]"
 * required: false
 * ```
 * @param {Field[]} fields - Uma lista de `Field`s, ou seja, os campos desse objeto.
 * @returns {Field<any>}
 */
export function object(label, options, fields) {
  return {
    label,
    widget: "object",
    fields,
    ...opt(options, {
      i18n: true,
      name: slugify(label),
      summary: label,
    }),
  };
}

/**
 * Cria um campo de lista. Ela permite que o editor crie, edite e exclua itens compostos de um ou mais campos.
 * @param {string} label - O nome desse campo no editor. Ex: `Benefícios`
 * @param {any | null} options - Um objeto contendo [opções de widget](https://decapcms.org/docs/widgets/#image). Deixe como `null` para usar só os padrões.
 * Padrões:
 * ```yaml
 * i18n: duplicate
 * name: "[slug do nome do campo]"
 * required: false
 * ```
 * @param {Field[]} fields - Uma lista de `Field`s, ou seja, os campos dessa lista.
 * @returns {Field<any[]>}
 */
export function list(label, options, fields) {
  if (fields.length === 1) {
    return {
      label,
      widget: "list",
      field: fields,
      ...opt(options, { i18n: true, name: slugify(label), summary: label }),
    };
  }
  return {
    label,
    widget: "list",
    fields,
    ...opt(options, { i18n: true, name: slugify(label), summary: label }),
  };
}
