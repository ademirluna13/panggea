/// <reference types="astro/client" />

declare module "sanity:client" {
  export const sanityClient: import("@sanity/client").SanityClient;
}

// Esto ayuda si vas a usar variables de entorno (.env) después
interface ImportMetaEnv {
  readonly SANITY_PROJECT_ID: string;
  readonly SANITY_DATASET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}