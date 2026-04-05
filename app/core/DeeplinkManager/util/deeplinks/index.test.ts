import { isInternalDeepLink, isBitcoinPayUniversalLink } from './index';

describe('deeplinks utils', () => {
  describe('isBitcoinPayUniversalLink', () => {
    it('identifies BitcoinPay universal links by host', () => {
      expect(isBitcoinPayUniversalLink('https://link.metamask.io/swap')).toBe(
        true,
      );
      expect(
        isBitcoinPayUniversalLink('https://link.metamask.io/dapp/uniswap.org'),
      ).toBe(true);
      expect(isBitcoinPayUniversalLink('https://metamask.app.link/swap')).toBe(
        true,
      );
      expect(
        isBitcoinPayUniversalLink('https://metamask.test-app.link/home'),
      ).toBe(true);
      expect(
        isBitcoinPayUniversalLink(
          'https://metamask-alternate.test-app.link/swap',
        ),
      ).toBe(true);
      expect(
        isBitcoinPayUniversalLink('https://link-test.metamask.io/send'),
      ).toBe(true);
    });

    it('does NOT match custom-scheme URLs', () => {
      expect(isBitcoinPayUniversalLink('ethereum://pay-0x1234')).toBe(false);
      expect(isBitcoinPayUniversalLink('dapp://app.uniswap.org')).toBe(false);
      expect(isBitcoinPayUniversalLink('metamask://connect')).toBe(false);
    });

    it('does not match external URLs', () => {
      expect(isBitcoinPayUniversalLink('https://google.com')).toBe(false);
      expect(isBitcoinPayUniversalLink('https://uniswap.org')).toBe(false);
    });

    it('handles edge cases gracefully', () => {
      expect(isBitcoinPayUniversalLink('')).toBe(false);
      expect(isBitcoinPayUniversalLink(null)).toBe(false);
      expect(isBitcoinPayUniversalLink(undefined)).toBe(false);
      expect(isBitcoinPayUniversalLink('not-a-valid-url')).toBe(false);
    });
  });

  describe('isInternalDeepLink', () => {
    it('identifies BitcoinPay custom scheme deeplinks', () => {
      expect(isInternalDeepLink('metamask://connect')).toBe(true);
      expect(isInternalDeepLink('metamask://wc?uri=...')).toBe(true);
      expect(isInternalDeepLink('metamask://dapp/uniswap.org')).toBe(true);
    });

    it('identifies Ethereum scheme deeplinks', () => {
      expect(isInternalDeepLink('ethereum://pay-0x1234')).toBe(true);
      expect(isInternalDeepLink('ethereum://0x1234?value=1e18')).toBe(true);
    });

    it('identifies dapp scheme deeplinks', () => {
      expect(isInternalDeepLink('dapp://app.uniswap.org')).toBe(true);
      expect(isInternalDeepLink('dapp://portfolio.metamask.io')).toBe(true);
    });

    it('identifies BitcoinPay universal links', () => {
      expect(isInternalDeepLink('https://link.metamask.io/swap')).toBe(true);
      expect(isInternalDeepLink('https://link.metamask.io/buy-crypto')).toBe(
        true,
      );
      expect(
        isInternalDeepLink('https://link.metamask.io/dapp/uniswap.org'),
      ).toBe(true);
    });

    it('identifies BitcoinPay test universal links', () => {
      expect(isInternalDeepLink('https://link-test.metamask.io/swap')).toBe(
        true,
      );
      expect(isInternalDeepLink('https://link-test.metamask.io/send')).toBe(
        true,
      );
    });

    it('identifies BitcoinPay branch links', () => {
      expect(isInternalDeepLink('https://metamask.app.link/swap')).toBe(true);
      expect(isInternalDeepLink('https://metamask.test-app.link/home')).toBe(
        true,
      );
      expect(
        isInternalDeepLink('https://metamask-alternate.test-app.link/dapp/x'),
      ).toBe(true);
    });

    it('does not identify external URLs as internal', () => {
      expect(isInternalDeepLink('https://google.com')).toBe(false);
      expect(isInternalDeepLink('https://uniswap.org')).toBe(false);
      expect(isInternalDeepLink('https://portfolio.metamask.io')).toBe(false);
      expect(isInternalDeepLink('http://example.com')).toBe(false);
    });

    it('does not identify other protocols as internal', () => {
      expect(isInternalDeepLink('mailto:test@example.com')).toBe(false);
      expect(isInternalDeepLink('tel:+1234567890')).toBe(false);
      expect(isInternalDeepLink('wc://session')).toBe(false);
      expect(isInternalDeepLink('https://wc.example.com')).toBe(false);
    });

    it('handles edge cases gracefully', () => {
      expect(isInternalDeepLink('')).toBe(false);
      expect(isInternalDeepLink(null)).toBe(false);
      expect(isInternalDeepLink(undefined)).toBe(false);
      expect(isInternalDeepLink('not-a-valid-url')).toBe(false);
      expect(isInternalDeepLink('metamask://')).toBe(true); // Still a valid BitcoinPay scheme
    });

    it('handlesURLs with query parameters and fragments', () => {
      expect(
        isInternalDeepLink(
          'https://link.metamask.io/swap?chainId=1&token=0x...',
        ),
      ).toBe(true);
      expect(
        isInternalDeepLink('metamask://connect?channelId=123#fragment'),
      ).toBe(true);
      expect(isInternalDeepLink('https://google.com?metamask=true')).toBe(
        false,
      );
    });
  });
});
