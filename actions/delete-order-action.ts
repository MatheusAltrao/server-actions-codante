'use server';

export const deleteOrderAction = async (prevState: any, formData: FormData) => {
  const orderId = formData.get('orderId') as string;

  const res = await fetch(`https://apis.codante.io/api/orders-api/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return {
      error: true,
      message: 'Ocorreu um erro ao retornar o pedido',
    };
  } else {
    return {
      error: false,
      message: 'Pedido deletado com sucesso',
    };
  }
};
