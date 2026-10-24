// vite/client объявляет только строчные расширения картинок (*.jpg),
// а в attached_assets есть файлы с .JPG/.PNG/.jpeg в разном регистре.
declare module "*.JPG" {
  const src: string;
  export default src;
}
declare module "*.PNG" {
  const src: string;
  export default src;
}
declare module "*.JPEG" {
  const src: string;
  export default src;
}
