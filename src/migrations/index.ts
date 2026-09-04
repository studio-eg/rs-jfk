import * as migration_20260903_201051_add_page_sections_blocks from './20260903_201051_add_page_sections_blocks';

export const migrations = [
  {
    up: migration_20260903_201051_add_page_sections_blocks.up,
    down: migration_20260903_201051_add_page_sections_blocks.down,
    name: '20260903_201051_add_page_sections_blocks'
  },
];
