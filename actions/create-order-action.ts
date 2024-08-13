'use server';

import { revalidatePath } from 'next/cache';

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const amount = formData.get('amount_in_cents') as string;

  if (amount) {
    const amountArray = amount.split(',');
    if (amountArray.length > 1) {
      formData.set('amount_in_cents', amountArray.join('.'));
    }
  }

  const rawData = {
    customer_name: formData.get('customer_name'),
    customer_email: formData.get('customer_email'),
    status: formData.get('status'),
    order_date: formData.get('order_date'),
    amount_in_cents: Number(formData.get('amount_in_cents')) * 100,
  };

  const res = await fetch('https://apis.codante.io/api/orders-api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rawData),
  });

  revalidatePath('/');

  if (res.ok) {
    return {
      error: false,
      message: 'Pedido cadastrado com sucesso!',
    };
  } else {
    return {
      error: true,
      message: 'Ocorreu um erro ao cadastrar',
    };
  }
};
