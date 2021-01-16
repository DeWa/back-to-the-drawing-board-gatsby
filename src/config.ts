export interface ISiteConfig {
  siteUrl: string;
  siteTitle: string;
  siteDescription: string;
  siteLogo: string;
  siteFBAppID: string;
  userTwitter: string;
  pathPrefix: string;
  userName: string;
  userEmail: string;
  userLocation: string;
}
export default {
  siteUrl: 'https://blog.joonas.dev',
  siteTitle: 'Back to the Drawing Board',
  siteDescription: 'Code, Gadgets and Experiments',
  siteLogo: 'todo',
  siteFBAppID: '',
  userTwitter: '',
  pathPrefix: '/',
  userName: 'Joonas Reinikka',
  userEmail: 'me@joonas.dev',
  userLocation: 'Tampere, Finland',
} as ISiteConfig;
