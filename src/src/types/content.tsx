export interface Article {
  id: string;
  category: string;
  title: string;
  author: string;
  readTime: string;
  imageUrl: string;
  isFeatured?: boolean; // Para decidir si es la imagen grande
}