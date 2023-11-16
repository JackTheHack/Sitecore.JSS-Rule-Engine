interface Plugin {
  /**
   * A function which will be called during path extraction
   */
  exec(path: string): string;
}

import { normalizePersonalizedRewrite } from '../../lib/personalizationUtils';

export class ScPersonalizePlugin implements Plugin {
  exec(path: string) {
    // Remove personalize rewrite segment from the path
    return normalizePersonalizedRewrite(path);
  }
}

export const scpersonalizePlugin = new ScPersonalizePlugin();
