import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MoneyBitcoinPayCard from './MoneyBitcoinPayCard';
import { MoneyBitcoinPayCardTestIds } from './MoneyBitcoinPayCard.testIds';
import { strings } from '../../../../../../locales/i18n';

describe('MoneyBitcoinPayCard', () => {
  it('renders the section title and subtitle', () => {
    const { getByText } = render(<MoneyBitcoinPayCard />);

    expect(getByText(strings('money.metamask_card.title'))).toBeOnTheScreen();
    expect(
      getByText(strings('money.metamask_card.subtitle')),
    ).toBeOnTheScreen();
  });

  it('renders virtual card row', () => {
    const { getByText, getByTestId } = render(<MoneyBitcoinPayCard />);

    expect(
      getByText(strings('money.metamask_card.virtual_card')),
    ).toBeOnTheScreen();
    expect(
      getByText(strings('money.metamask_card.cashback', { percentage: '1' })),
    ).toBeOnTheScreen();
    expect(
      getByTestId(MoneyBitcoinPayCardTestIds.VIRTUAL_CARD_ROW),
    ).toBeOnTheScreen();
  });

  it('renders metal card row', () => {
    const { getByText, getByTestId } = render(<MoneyBitcoinPayCard />);

    expect(
      getByText(strings('money.metamask_card.metal_card')),
    ).toBeOnTheScreen();
    expect(
      getByText(strings('money.metamask_card.cashback', { percentage: '3' })),
    ).toBeOnTheScreen();
    expect(
      getByTestId(MoneyBitcoinPayCardTestIds.METAL_CARD_ROW),
    ).toBeOnTheScreen();
  });

  it('calls onGetNowPress with "virtual" when virtual card Get now is pressed', () => {
    const mockGetNow = jest.fn();
    const { getAllByText } = render(
      <MoneyBitcoinPayCard onGetNowPress={mockGetNow} />,
    );

    const getNowButtons = getAllByText(strings('money.metamask_card.get_now'));
    fireEvent.press(getNowButtons[0]);

    expect(mockGetNow).toHaveBeenCalledWith('virtual');
  });

  it('calls onGetNowPress with "metal" when metal card Get now is pressed', () => {
    const mockGetNow = jest.fn();
    const { getAllByText } = render(
      <MoneyBitcoinPayCard onGetNowPress={mockGetNow} />,
    );

    const getNowButtons = getAllByText(strings('money.metamask_card.get_now'));
    fireEvent.press(getNowButtons[1]);

    expect(mockGetNow).toHaveBeenCalledWith('metal');
  });
});
