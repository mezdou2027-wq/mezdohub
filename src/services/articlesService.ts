// Dynamic Articles & Content Management Service for MezdoHub
// Enables the site owner to Add, Edit, and Delete any guide or opportunity in real time.

import { CONTENT_HUB_ARTICLES, ContentArticle } from '../data/contentHubArticles';

const STORAGE_CUSTOM_ARTICLES = 'mezdohub_custom_articles';
const STORAGE_DELETED_ARTICLES = 'mezdohub_deleted_article_ids';

export function getAllArticles(): ContentArticle[] {
  try {
    const deletedIds: string[] = JSON.parse(localStorage.getItem(STORAGE_DELETED_ARTICLES) || '[]');
    const customArticles: ContentArticle[] = JSON.parse(localStorage.getItem(STORAGE_CUSTOM_ARTICLES) || '[]');

    // Filter out deleted base articles
    const activeBase = CONTENT_HUB_ARTICLES.filter(a => !deletedIds.includes(a.id) && !deletedIds.includes(a.slug));

    // Map custom articles to replace or prepend
    const customMap = new Map<string, ContentArticle>();
    customArticles.forEach(a => customMap.set(a.id, a));

    const result: ContentArticle[] = [];

    // Push updated base articles or custom overrides
    for (const base of activeBase) {
      if (customMap.has(base.id)) {
        result.push(customMap.get(base.id)!);
        customMap.delete(base.id);
      } else {
        result.push(base);
      }
    }

    // Append newly created custom articles to the front
    return [...Array.from(customMap.values()), ...result];
  } catch {
    return CONTENT_HUB_ARTICLES;
  }
}

export function saveArticle(article: ContentArticle): void {
  try {
    const customArticles: ContentArticle[] = JSON.parse(localStorage.getItem(STORAGE_CUSTOM_ARTICLES) || '[]');
    const existingIndex = customArticles.findIndex(a => a.id === article.id);

    if (existingIndex >= 0) {
      customArticles[existingIndex] = article;
    } else {
      customArticles.unshift(article);
    }

    localStorage.setItem(STORAGE_CUSTOM_ARTICLES, JSON.stringify(customArticles));

    // Remove from deleted list if it was previously marked as deleted
    const deletedIds: string[] = JSON.parse(localStorage.getItem(STORAGE_DELETED_ARTICLES) || '[]');
    const filteredDeleted = deletedIds.filter(id => id !== article.id && id !== article.slug);
    localStorage.setItem(STORAGE_DELETED_ARTICLES, JSON.stringify(filteredDeleted));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mezdohub_articles_change'));
    }
  } catch (err) {
    console.error('Failed to save article:', err);
  }
}

export function deleteArticle(articleId: string): void {
  try {
    // 1. Remove from custom articles
    const customArticles: ContentArticle[] = JSON.parse(localStorage.getItem(STORAGE_CUSTOM_ARTICLES) || '[]');
    const filteredCustom = customArticles.filter(a => a.id !== articleId && a.slug !== articleId);
    localStorage.setItem(STORAGE_CUSTOM_ARTICLES, JSON.stringify(filteredCustom));

    // 2. Add to deleted IDs list
    const deletedIds: string[] = JSON.parse(localStorage.getItem(STORAGE_DELETED_ARTICLES) || '[]');
    if (!deletedIds.includes(articleId)) {
      deletedIds.push(articleId);
      localStorage.setItem(STORAGE_DELETED_ARTICLES, JSON.stringify(deletedIds));
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mezdohub_articles_change'));
    }
  } catch (err) {
    console.error('Failed to delete article:', err);
  }
}

export function resetArticlesToDefault(): void {
  try {
    localStorage.removeItem(STORAGE_CUSTOM_ARTICLES);
    localStorage.removeItem(STORAGE_DELETED_ARTICLES);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mezdohub_articles_change'));
    }
  } catch {}
}
