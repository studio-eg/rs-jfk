import * as migration_20260903_201051_add_page_sections_blocks from './20260903_201051_add_page_sections_blocks';
import * as migration_20260906_132659_add_header_global from './20260906_132659_add_header_global';
import * as migration_20260906_135724_add_header_logo from './20260906_135724_add_header_logo';

export const migrations = [
  {
    up: migration_20260903_201051_add_page_sections_blocks.up,
    down: migration_20260903_201051_add_page_sections_blocks.down,
    name: '20260903_201051_add_page_sections_blocks',
  },
  {
    up: migration_20260906_132659_add_header_global.up,
    down: migration_20260906_132659_add_header_global.down,
    name: '20260906_132659_add_header_global',
  },
  {
    up: migration_20260906_135724_add_header_logo.up,
    down: migration_20260906_135724_add_header_logo.down,
    name: '20260906_135724_add_header_logo'
  },
];
