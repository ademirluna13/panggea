import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from 'sanity:client';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  // .auto('format') es magia: sirve WebP o AVIF automáticamente si el navegador lo soporta
  // .fit('max') asegura que la imagen no se deforme si intentas estirarla de más
  return builder.image(source).auto('format').fit('max');
}