import AppConstants from '../../../../core/AppConstants';
import { getDefaultBaanxApiBaseUrlForBitcoinPayEnv } from './mapBaanxApiUrl';

describe('getDefaultBaanxApiBaseUrlForBitcoinPayEnv', () => {
  const originalBaanxUrl = process.env.BAANX_API_URL;
  const originalBuildsEnabled =
    process.env.BUILDS_ENABLED_WITH_GH_ACTIONS_TEMPORARY;

  afterEach(() => {
    if (originalBaanxUrl !== undefined) {
      process.env.BAANX_API_URL = originalBaanxUrl;
    } else {
      delete process.env.BAANX_API_URL;
    }
    if (originalBuildsEnabled !== undefined) {
      process.env.BUILDS_ENABLED_WITH_GH_ACTIONS_TEMPORARY =
        originalBuildsEnabled;
    } else {
      delete process.env.BUILDS_ENABLED_WITH_GH_ACTIONS_TEMPORARY;
    }
  });

  describe('when BUILDS_ENABLED_WITH_GH_ACTIONS_TEMPORARY (builds.yml path)', () => {
    beforeEach(() => {
      process.env.BUILDS_ENABLED_WITH_GH_ACTIONS_TEMPORARY = 'true';
    });

    it('returns BAANX_API_URL from environment when set', () => {
      process.env.BAANX_API_URL = 'https://test.api';
      expect(getDefaultBaanxApiBaseUrlForBitcoinPayEnv('any-env')).toBe(
        'https://test.api',
      );
    });

    it('ignores metaMaskEnv parameter (URL is set at build time)', () => {
      process.env.BAANX_API_URL = 'https://custom.api';
      expect(getDefaultBaanxApiBaseUrlForBitcoinPayEnv('dev')).toBe(
        'https://custom.api',
      );
      expect(getDefaultBaanxApiBaseUrlForBitcoinPayEnv('production')).toBe(
        'https://custom.api',
      );
    });

    it('produces same output for same input', () => {
      process.env.BAANX_API_URL = 'https://test.api';
      const result1 = getDefaultBaanxApiBaseUrlForBitcoinPayEnv('production');
      const result2 = getDefaultBaanxApiBaseUrlForBitcoinPayEnv('production');
      expect(result1).toBe(result2);
    });
  });

  describe('when not BUILDS_ENABLED_WITH_GH_ACTIONS_TEMPORARY (Bitrise / .js.env path)', () => {
    beforeEach(() => {
      delete process.env.BUILDS_ENABLED_WITH_GH_ACTIONS_TEMPORARY;
    });

    it('returns AppConstants.BAANX_API_URL.PRD for production/rc', () => {
      expect(getDefaultBaanxApiBaseUrlForBitcoinPayEnv('production')).toBe(
        AppConstants.BAANX_API_URL.PRD,
      );
      expect(getDefaultBaanxApiBaseUrlForBitcoinPayEnv('rc')).toBe(
        AppConstants.BAANX_API_URL.PRD,
      );
    });

    it('returns AppConstants.BAANX_API_URL.UAT for pre-release/exp/beta', () => {
      expect(getDefaultBaanxApiBaseUrlForBitcoinPayEnv('pre-release')).toBe(
        AppConstants.BAANX_API_URL.UAT,
      );
      expect(getDefaultBaanxApiBaseUrlForBitcoinPayEnv('exp')).toBe(
        AppConstants.BAANX_API_URL.UAT,
      );
      expect(getDefaultBaanxApiBaseUrlForBitcoinPayEnv('beta')).toBe(
        AppConstants.BAANX_API_URL.UAT,
      );
    });

    it('returns AppConstants.BAANX_API_URL.DEV for dev/e2e/local', () => {
      expect(getDefaultBaanxApiBaseUrlForBitcoinPayEnv('dev')).toBe(
        AppConstants.BAANX_API_URL.DEV,
      );
      expect(getDefaultBaanxApiBaseUrlForBitcoinPayEnv('e2e')).toBe(
        AppConstants.BAANX_API_URL.DEV,
      );
      expect(getDefaultBaanxApiBaseUrlForBitcoinPayEnv('local')).toBe(
        AppConstants.BAANX_API_URL.DEV,
      );
    });

    it('returns a non-empty string for all inputs', () => {
      const testCases = ['production', 'dev', undefined, null, '', 'unknown'];
      testCases.forEach((testCase) => {
        const result = getDefaultBaanxApiBaseUrlForBitcoinPayEnv(
          testCase as string | undefined,
        );
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });
  });
});
