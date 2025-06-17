export const themes = [
  {
    id: 0,
    name: 'Classic',
    bg: {
      front: '/assets/theme_bg_01.png',
      back: '/assets/theme_cover_01.png'
    },
    highlight: {
      image: '/assets/theme_highlight_01.png'
    },
    shadow: {
      image: '/assets/theme_shadow_01.png'
    },
    numbers: {
      image: '/assets/theme_numbers_01.png'
    }
  },
  {
    id: 1,
    name: 'Modern',
    bg: {
      front: '/assets/theme_bg_02.png',
      back: '/assets/theme_cover_02.png'
    },
    highlight: {
      image: '/assets/theme_highlight_02.png'
    },
    shadow: {
      image: '/assets/theme_shadow_02.png'
    },
    numbers: {
      image: '/assets/theme_numbers_02.png'
    }
  },
  {
    id: 2,
    name: 'Elegant',
    bg: {
      front: '/assets/theme_bg_03.png',
      back: '/assets/theme_cover_03.png'
    },
    highlight: {
      image: '/assets/theme_highlight_03.png'
    },
    shadow: {
      image: '/assets/theme_shadow_03.png'
    },
    numbers: {
      image: '/assets/theme_numbers_03.png'
    }
  },
  {
    id: 3,
    name: 'Vintage',
    bg: {
      front: '/assets/theme_bg_04.png',
      back: '/assets/theme_cover_04.png'
    },
    highlight: {
      image: '/assets/theme_highlight_04.png'
    },
    shadow: {
      image: '/assets/theme_shadow_04.png'
    },
    numbers: {
      image: '/assets/theme_numbers_04.png'
    }
  },
  {
    id: 4,
    name: 'Royal',
    bg: {
      front: '/assets/theme_bg_05.png',
      back: '/assets/theme_cover_05.png'
    },
    highlight: {
      image: '/assets/theme_highlight_05.png'
    },
    shadow: {
      image: '/assets/theme_shadow_05.png'
    },
    numbers: {
      image: '/assets/theme_numbers_05.png'
    }
  }
];

export const getTheme = (themeId) => {
  return themes.find(theme => theme.id === themeId) || themes[0];
};