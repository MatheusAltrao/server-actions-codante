import { createOrderAction } from '@/actions/create-order-action';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { DatePicker } from './ui/date-picker';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Loading from './ui/loading';

interface OrderFormProps {
  setOpen: (v: boolean) => void;
}

export default function OrderForm({ setOpen }: OrderFormProps) {
  const [orderDate, setOrderDate] = useState<Date>();
  const [state, formAction] = useFormState(createOrderAction, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.message);
      setOpen(true);
    }
    if (!state?.error && state?.message) {
      toast.success(state.message);
      setOpen(false);
    }
  }, [state, state?.error, state?.message]);

  return (
    <form
      action={formAction}
      className="grid items-start gap-4"
    >
      <div className="grid gap-2">
        <Label htmlFor="customer_name">Nome do Cliente</Label>
        <Input
          required
          name="customer_name"
          id="customer_name"
          placeholder="José Carlos da Silva"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="customer_email">Email do Cliente</Label>
        <Input
          required
          name="customer_email"
          type="email"
          id="customer_email"
          placeholder="jose@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status">
          <SelectTrigger className="">
            <SelectValue placeholder="Pendente | Completo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="completed">Completo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Data do Pedido</Label>
        <DatePicker
          onSelect={(value) => {
            setOrderDate(value);
          }}
        />
        <input
          required
          type="hidden"
          name="order_date"
          value={orderDate && format(orderDate, 'yyyy-MM-dd')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="amount_in_cents">Valor do Pedido</Label>
        <Input
          required
          name="amount_in_cents"
          id="amount_in_cents"
          placeholder="100,00"
        />
        <SubmitButton />
      </div>
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
    >
      {pending ? <Loading /> : 'Cadastrar'}
    </Button>
  );
};
