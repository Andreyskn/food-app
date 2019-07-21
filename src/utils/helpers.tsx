import React, { Fragment } from 'react';

export const price = (price: number) => <Fragment><b>{price}</b><small>₽</small></Fragment>;
export const minutes = (minutes: number) => <Fragment><b>{minutes}</b><small>мин.</small></Fragment>;
