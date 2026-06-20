import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface RegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(14, "Telefone incompleto"),
  city: z.string().min(2, "Informe a cidade"),
  state: z.string().min(2, "Selecione o estado"),
  hasLot: z.enum(["sim", "nao"], {
    required_error: "Selecione uma opção",
  }),
  hasProject: z.enum(["sim", "nao"], {
    required_error: "Selecione uma opção",
  }),
  investmentAmount: z.enum([
    "Entre R$ 100 mil e R$ 500 mil",
    "Entre R$ 600 mil e R$ 800 mil",
    "Entre R$ 800 mil e R$ 1,2 milhão",
    "Entre R$ 1,2 milhão e R$ 2 milhões ou mais",
  ], {
    required_error: "Selecione uma faixa de investimento",
  }),
});

type FormData = z.infer<typeof formSchema>;

const RegistrationDialog = ({ open, onOpenChange }: RegistrationDialogProps) => {
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
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      hasLot: undefined,
      hasProject: undefined,
      investmentAmount: undefined,
    },
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
      const username = 'admin';
      const password = '123456';
      const credentials = btoa(`${username}:${password}`);

      const response = await fetch("https://webhook.lp-youconprojetos.com.br/webhook/eventos-youcon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${credentials}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status} ${response.statusText}`);
      }

      console.log("Webhook enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados para o webhook:", error);
    }

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    window.location.href = "https://chat.whatsapp.com/BxXxLl9oORFDK16nmeBaX7";

    reset();
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md mx-auto bg-card border-primary/20 p-4 md:p-6 rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center text-foreground">
            Garanta seu acesso gratuito
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-3 md:mt-4">
          {/* 1. Nome completo */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-base text-foreground">Nome completo</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Seu nome"
              className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
            />
            {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
          </div>

          {/* 2. E-mail */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-base text-foreground">E-mail</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="seu@email.com"
              className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
            />
            {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
          </div>

          {/* 3. WhatsApp */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-base text-foreground">WhatsApp</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              onChange={handlePhoneChange}
              placeholder="(00) 00000-0000"
              className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
              maxLength={15}
            />
            {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
          </div>

          <div className="grid grid-cols-5 gap-3">
            {/* 4. Cidade */}
            <div className="space-y-1.5 col-span-4">
              <Label htmlFor="city" className="text-base text-foreground">Cidade</Label>
              <Input
                id="city"
                {...register("city")}
                placeholder="Ex: São Paulo"
                className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
              />
              {errors.city && <p className="text-destructive text-xs">{errors.city.message}</p>}
            </div>

            {/* 5. Estado */}
            <div className="space-y-1.5 col-span-1">
              <Label htmlFor="state" className="text-base text-foreground">Estado</Label>
              <select
                id="state"
                {...register("state")}
                className="flex h-12 w-full rounded-md border border-muted-foreground/20 bg-background px-3 py-2 text-base text-foreground ring-offset-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                defaultValue=""
              >
                <option value="" disabled className="text-muted-foreground">
                  UF
                </option>
                {brazilianStates.map((uf) => (
                  <option key={uf} value={uf} className="bg-background text-foreground">
                    {uf}
                  </option>
                ))}
              </select>
              {errors.state && <p className="text-destructive text-xs">{errors.state.message}</p>}
            </div>
          </div>

                    {/* 7. Já possui terreno? */}
          <div className="space-y-2">
            <Label className="text-base text-foreground">Já possui terreno?</Label>
            <RadioGroup
              onValueChange={(value) => setValue("hasLot", value as "sim" | "nao", { shouldValidate: true })}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="lot-yes" className="border-primary text-primary" />
                <Label htmlFor="lot-yes" className="text-base text-foreground cursor-pointer">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="lot-no" className="border-primary text-primary" />
                <Label htmlFor="lot-no" className="text-base text-foreground cursor-pointer">Não</Label>
              </div>
            </RadioGroup>
            {errors.hasLot && <p className="text-destructive text-xs">{errors.hasLot.message}</p>}
          </div>

          {/* 8. Já possui projeto? */}
          <div className="space-y-2">
            <Label className="text-base text-foreground">Você já possui projeto arquitetônico?</Label>
            <RadioGroup
              onValueChange={(value) => setValue("hasProject", value as "sim" | "nao", { shouldValidate: true })}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="project-yes" className="border-primary text-primary" />
                <Label htmlFor="project-yes" className="text-base text-foreground cursor-pointer">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="project-no" className="border-primary text-primary" />
                <Label htmlFor="project-no" className="text-base text-foreground cursor-pointer">Não</Label>
              </div>
            </RadioGroup>
            {errors.hasProject && <p className="text-destructive text-xs">{errors.hasProject.message}</p>}
          </div>

          {/* 10. Previsão de custo */}
          <div className="space-y-2">
            <Label className="text-base text-foreground">Quanto você planeja investir na sua obra?</Label>
            <RadioGroup
              onValueChange={(value) => setValue("investmentAmount", value as any, { shouldValidate: true })}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Entre R$ 100 mil e R$ 500 mil" id="invest-100-500" className="border-primary text-primary" />
                <Label htmlFor="invest-100-500" className="text-base text-foreground cursor-pointer">Entre R$ 100 mil e R$ 500 mil</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Entre R$ 600 mil e R$ 800 mil" id="invest-600-800" className="border-primary text-primary" />
                <Label htmlFor="invest-600-800" className="text-base text-foreground cursor-pointer">Entre R$ 600 mil e R$ 800 mil</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Entre R$ 800 mil e R$ 1,2 milhão" id="invest-800-1200" className="border-primary text-primary" />
                <Label htmlFor="invest-800-1200" className="text-base text-foreground cursor-pointer">Entre R$ 800 mil e R$ 1,2 milhão</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Entre R$ 1,2 milhão e R$ 2 milhões ou mais" id="invest-1200-plus" className="border-primary text-primary" />
                <Label htmlFor="invest-1200-plus" className="text-base text-foreground cursor-pointer">Entre R$ 1,2 milhão e R$ 2 milhões ou mais</Label>
              </div>
            </RadioGroup>
            {errors.investmentAmount && <p className="text-destructive text-xs">{errors.investmentAmount.message}</p>}
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full mt-6 h-12 text-base"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Redirecionando..." : "CONFIRMAR INSCRIÇÃO"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
