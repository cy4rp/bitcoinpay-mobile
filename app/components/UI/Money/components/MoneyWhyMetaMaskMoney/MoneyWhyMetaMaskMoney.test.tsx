import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MoneyWhyBitcoinPayMoney from './MoneyWhyBitcoinPayMoney';
import { MoneyWhyBitcoinPayMoneyTestIds } from './MoneyWhyBitcoinPayMoney.testIds';
import { strings } from '../../../../../../locales/i18n';

describe('MoneyWhyBitcoinPayMoney', () => {
  it('renders the section title', () => {
    const { getByText } = render(<MoneyWhyBitcoinPayMoney />);

    expect(
      getByText(strings('money.why_metamask_money.title')),
    ).toBeOnTheScreen();
  });

  it('renders benefit rows', () => {
    const { getByText } = render(<MoneyWhyBitcoinPayMoney />);

    expect(
      getByText(strings('money.why_metamask_money.benefit_dollar_backed')),
    ).toBeOnTheScreen();
    expect(
      getByText(strings('money.why_metamask_money.benefit_liquidity')),
    ).toBeOnTheScreen();
    expect(
      getByText(strings('money.why_metamask_money.benefit_global')),
    ).toBeOnTheScreen();
  });

  it('renders the Learn more button', () => {
    const { getByTestId } = render(<MoneyWhyBitcoinPayMoney />);

    expect(
      getByTestId(MoneyWhyBitcoinPayMoneyTestIds.LEARN_MORE_BUTTON),
    ).toBeOnTheScreen();
  });

  it('calls onLearnMorePress when Learn more button is pressed', () => {
    const mockLearnMore = jest.fn();
    const { getByTestId } = render(
      <MoneyWhyBitcoinPayMoney onLearnMorePress={mockLearnMore} />,
    );

    fireEvent.press(
      getByTestId(MoneyWhyBitcoinPayMoneyTestIds.LEARN_MORE_BUTTON),
    );

    expect(mockLearnMore).toHaveBeenCalledTimes(1);
  });
});
