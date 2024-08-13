'use client';

import { deleteOrderAction } from '@/actions/delete-order-action';
import { Order } from '@/lib/types';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { Button } from './ui/button';

interface DeleteButtonProps {
  order: Order;
}

export default function DeleteButton({ order }: DeleteButtonProps) {
  const [state, formAction] = useFormState(deleteOrderAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.error === false) {
      toast.success(state.message);
      router.refresh();
    } else if (state?.error === true) {
      toast.error(state.message);
    }
  }, [state, state?.error, state?.message]);

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name="orderId"
        value={order?.id}
      />
      <Button
        variant="ghost"
        className=""
      >
        <Trash className="w-4 text-red-500" />
      </Button>
    </form>
  );
}
