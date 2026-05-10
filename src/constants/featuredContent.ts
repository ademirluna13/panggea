import type { Article } from '../types/content';

export const FEATURED_ARTICLES: Article[] = [
  {
    id: '1',
    category: 'Featured Gaming',
    title: 'The Fall of Titans: Esports Reckoning',
    author: 'Alex Vance',
    readTime: '4 Min Read',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070',
    isFeatured: true,
  },
  {
    id: '2',
    category: 'Hardware Tech',
    title: 'RTX 5090 "Molten" Leak: What We Know',
    author: 'Gage Reed',
    readTime: '3 Min Read',
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abf0980c?q=80&w=2070',
  },
  {
    id: '3',
    category: 'Anime',
    title: 'New "Chainsaw Man" Arc Confirmed',
    author: 'Kenji Tanaka',
    readTime: '2 Min Read',
    imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2070',
  },
  {
    id: '4',
    category: 'Consulting Software',
    title: 'High-Performance Stacks for Modern Web',
    author: 'Pangea Core',
    readTime: '5 Min Read',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070',
  },
];