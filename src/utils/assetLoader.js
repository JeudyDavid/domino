const ASSETS = [
  // Images
  '/assets/background.png',
  '/assets/background_p.png',
  '/assets/logo.png',
  '/assets/logo_p.png',
  '/assets/button_play.png',
  '/assets/button_start.png',
  '/assets/button_next.png',
  '/assets/button_online.png',
  '/assets/button_local.png',
  '/assets/button_arrow_left.png',
  '/assets/button_arrow_right.png',
  '/assets/button_plus.png',
  '/assets/button_minus.png',
  '/assets/item_number.png',
  '/assets/item_player_stats.png',
  '/assets/item_player_stats_highlight.png',
  '/assets/item_status.png',
  '/assets/item_draw_bg.png',
  '/assets/item_draw_bg_p.png',
  '/assets/item_tile_highlight.png',
  '/assets/item_score.png',
  '/assets/item_score_top.png',
  '/assets/item_score_divide.png',
  '/assets/button_facebook.png',
  '/assets/button_twitter.png',
  '/assets/button_whatsapp.png',
  '/assets/button_continue.png',
  '/assets/item_pop.png',
  '/assets/item_pop_p.png',
  '/assets/button_confirm.png',
  '/assets/button_cancel.png',
  '/assets/button_fullscreen.png',
  '/assets/button_sound_on.png',
  '/assets/button_sound_off.png',
  '/assets/button_music_on.png',
  '/assets/button_music_off.png',
  '/assets/button_exit.png',
  '/assets/button_settings.png',
  
  // Theme assets
  '/assets/theme_bg_01.png',
  '/assets/theme_bg_02.png',
  '/assets/theme_bg_03.png',
  '/assets/theme_bg_04.png',
  '/assets/theme_bg_05.png',
  '/assets/theme_cover_01.png',
  '/assets/theme_cover_02.png',
  '/assets/theme_cover_03.png',
  '/assets/theme_cover_04.png',
  '/assets/theme_cover_05.png',
  '/assets/theme_shadow_01.png',
  '/assets/theme_shadow_02.png',
  '/assets/theme_numbers_01.png',
  '/assets/theme_numbers_02.png',
  '/assets/theme_numbers_03.png',
  '/assets/theme_numbers_04.png',
  '/assets/theme_numbers_05.png',
  '/assets/theme_highlight_01.png',
  '/assets/theme_highlight_02.png',
  '/assets/theme_highlight_03.png',
  '/assets/theme_highlight_04.png',
  '/assets/theme_highlight_05.png',
  
  // Sounds
  '/assets/sounds/sound_click.ogg',
  '/assets/sounds/sound_domino_pick.ogg',
  '/assets/sounds/sound_domino1.ogg',
  '/assets/sounds/sound_domino2.ogg',
  '/assets/sounds/sound_domino3.ogg',
  '/assets/sounds/sound_point.ogg',
  '/assets/sounds/sound_round.ogg',
  '/assets/sounds/sound_winner.ogg',
  '/assets/sounds/sound_shuffle_in.ogg',
  '/assets/sounds/sound_shuffle_out.ogg',
  '/assets/sounds/sound_result.ogg',
  '/assets/sounds/sound_alert.ogg',
  '/assets/sounds/music_game.ogg',
  '/assets/sounds/music_main.ogg'
];

export const preloadAssets = (onProgress) => {
  return new Promise((resolve, reject) => {
    let loadedCount = 0;
    const totalCount = ASSETS.length;
    const errors = [];

    const updateProgress = () => {
      const progress = (loadedCount / totalCount) * 100;
      onProgress(progress);
      
      if (loadedCount === totalCount) {
        if (errors.length > 0) {
          console.warn('Some assets failed to load:', errors);
        }
        resolve();
      }
    };

    ASSETS.forEach((assetPath) => {
      if (assetPath.includes('.ogg') || assetPath.includes('.mp3')) {
        // Preload audio
        const audio = new Audio();
        audio.addEventListener('canplaythrough', () => {
          loadedCount++;
          updateProgress();
        });
        audio.addEventListener('error', () => {
          errors.push(assetPath);
          loadedCount++;
          updateProgress();
        });
        audio.src = assetPath;
      } else {
        // Preload image
        const img = new Image();
        img.addEventListener('load', () => {
          loadedCount++;
          updateProgress();
        });
        img.addEventListener('error', () => {
          errors.push(assetPath);
          loadedCount++;
          updateProgress();
        });
        img.src = assetPath;
      }
    });
  });
};