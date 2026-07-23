import { useState } from "react";
import { trackLead } from "@/lib/pixel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CheckoutLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evento: string;
  checkoutUrl: string;
}

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(14, "Telefone incompleto"),
});

type FormData = z.infer<typeof formSchema>;

/**
 * Modal de conversão da imersão presencial.
 *
 * Captura o lead (nome, e-mail, telefone), grava no mesmo webhook dos demais
 * formulários de evento do repo e, na sequência, redireciona para o checkout
 * externo. Mesma máscara de celular e mesmo endpoint do RegistrationDialog.
 */
const CheckoutLeadDialog = ({ open, onOpenChange, evento, checkoutUrl }: CheckoutLeadDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", phone: "" },
  });

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 7) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }

    setValue("phone", formattedValue, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const username = "admin";
      const password = "123456";
      const credentials = btoa(`${username}:${password}`);

      const response = await fetch("https://webhook.lp-youconprojetos.com.br/webhook/eventos-youcon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({ ...data, evento }),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status} ${response.statusText}`);
      }

      console.log("Webhook enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados para o webhook:", error);
    }

    trackLead();

    await new Promise((resolve) => setTimeout(resolve, 300));
    // Redireciona para o checkout externo. Cole o link real em CHECKOUT_URL.
    window.location.href = checkoutUrl;

    reset();
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md mx-auto bg-card border-primary/20 p-4 md:p-6 rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center text-foreground">
            Garanta sua vaga
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            Preencha seus dados para seguir com a inscrição.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-3 md:mt-4">
          <div className="space-y-1.5">
            <Label htmlFor="conv-name" className="text-base text-foreground">Nome completo</Label>
            <Input
              id="conv-name"
              {...register("name")}
              placeholder="Seu nome"
              className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
            />
            {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="conv-email" className="text-base text-foreground">E-mail</Label>
            <Input
              id="conv-email"
              type="email"
              {...register("email")}
              placeholder="seu@email.com"
              className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
            />
            {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="conv-phone" className="text-base text-foreground">Telefone</Label>
            <Input
              id="conv-phone"
              type="tel"
              {...register("phone")}
              onChange={handlePhoneChange}
              placeholder="(00) 00000-0000"
              className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
              maxLength={15}
            />
            {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
          </div>

          <Button
            type="submit"
            variant="cta-green"
            size="lg"
            className="w-full mt-4 h-12 rounded-full text-base"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Redirecionando..." : "Ir para o checkout"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutLeadDialog;
