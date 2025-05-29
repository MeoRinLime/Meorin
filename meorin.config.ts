import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const MeorinConfig: Configuration = {
  title: "Meorin",
  subTitle: "Meorin Blog Site",
  brandTitle: "Meorin",

  description: "Demo Site",

  site: "https://meorin.top",

  locale: "en", // set for website language and date format

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "/",
    },
    {
      nameKey: I18nKeys.nav_bar_archive,
      href: "/archive",
    },
    {
      nameKey: I18nKeys.nav_bar_about,
      href: "/about",
    },
    {
      nameKey: I18nKeys.nav_bar_github,
      href: "https://github.com/MeoRinLime/Meorin",
    },
  ],

  username: "MeorinLime 梦灵",
  sign: "キズナアイ最高～",
  avatarUrl: "https://images.meorin.top/avatar.jpg",
  socialLinks: [
    {
      icon: "line-md:github-loop",
      link: "https://github.com/MeoRinLime",
    },
    {
      icon: "mingcute:bilibili-line",
      link: "https://space.bilibili.com/14708393",
    },
    {
      icon: "mingcute:netease-music-line",
      link: "https://music.163.com/#/user/home?id=123792314",
    },
  ],
  maxSidebarCategoryChip: 6, // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: [
    "https://images.meorin.top/banner/aichan1.png",
    "https://images.meorin.top/banner/aichan2.png",
    "https://images.meorin.top/banner/aichan3.jpg",
    "https://images.meorin.top/banner/alice.png",
    "https://images.meorin.top/banner/aichan3.png",
    "https://images.meorin.top/banner/kaf.jpg",
  ],

  slugMode: "HASH", // 'RAW' | 'HASH'

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default MeorinConfig;
