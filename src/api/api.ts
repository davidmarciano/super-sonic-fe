export const fetchRecommendedApps = (query: string) => fetch(`/recommended-apps?${query}`);

export const fetchRecommendedApp = (appId: string) => fetch(`/recommended-apps/app-id/${appId}`);

export const fetchCategories = (query: string) => fetch('/recommended-apps/categories');