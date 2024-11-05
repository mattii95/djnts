/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string; // Declara aquí todas las variables de entorno que uses
    readonly VITE_SOME_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}