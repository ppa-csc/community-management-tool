export const containers = {
  instagram: {
    comments: 'InstagramComments',
    posts: 'InstagramPosts',
  },
  facebook: {
    comments: 'FacebookComments',
  },
  youtube: {
    comments: 'YouTubeComments',
  },
  tiktok: {
    comments: 'TikTokComments',
  },
} as const;

export type Platform = keyof typeof containers;
