import { useState } from "react";
import { trackLead } from "@/lib/pixel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegistrationFormInlineProps {
  evento: string;
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
});

type FormData = z.infer<typeof formSchema>;

const STEP_ONE_FIELDS = ["name", "email", "phone"] as const;

const RegistrationFormInline = ({ evento }: RegistrationFormInlineProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
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

  const handleAdvance = async () => {
    const stepOneIsValid = await trigger([...STEP_ONE_FIELDS]);
    if (stepOneIsValid) setStep(2);
  };

  // Envio, integração e redirecionamento permanecem idênticos ao fluxo original.
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
        body: JSON.stringify({ ...data, evento })
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
    window.location.href = "https://chat.whatsapp.com/BxXxLl9oORFDK16nmeBaX7";

    reset();
    setIsSubmitting(false);
  };

  return (
    <div>
      <div className="mb-5 md:mb-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg md:text-2xl font-bold text-foreground">
            Garanta seu acesso gratuito
          </h3>
          <span className="shrink-0 text-xs md:text-sm font-semibold text-primary">
            Etapa {step} de 2
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="proj-name" className="text-base text-foreground">Nome completo</Label>
              <Input
                id="proj-name"
                {...register("name")}
                placeholder="Seu nome"
                className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
              />
              {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="proj-email" className="text-base text-foreground">E-mail</Label>
              <Input
                id="proj-email"
                type="email"
                {...register("email")}
                placeholder="seu@email.com"
                className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
              />
              {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="proj-phone" className="text-base text-foreground">WhatsApp</Label>
              <Input
                id="proj-phone"
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
              type="button"
              variant="cta-green"
              size="lg"
              className="w-full mt-6 h-12 rounded-full text-base"
              onClick={handleAdvance}
            >
              CONTINUAR
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              <div className="space-y-1.5 col-span-2 sm:col-span-4">
                <Label htmlFor="proj-city" className="text-base text-foreground">Cidade</Label>
                <Input
                  id="proj-city"
                  {...register("city")}
                  placeholder="Ex: São Paulo"
                  className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
                />
                {errors.city && <p className="text-destructive text-xs">{errors.city.message}</p>}
              </div>

              <div className="space-y-1.5 col-span-1">
                <Label htmlFor="proj-state" className="text-base text-foreground">Estado</Label>
                <select
                  id="proj-state"
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

            <div className="flex flex-col gap-3 mt-6 sm:flex-row-reverse">
              <Button
                type="submit"
                variant="cta-green"
                size="lg"
                className="w-full h-12 rounded-full text-base"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Redirecionando..." : "GARANTIR MINHA VAGA"}
              </Button>
              <Button
                type="button"
                variant="cta-green-soft"
                size="lg"
                className="w-full h-12 rounded-full text-base sm:w-auto sm:px-6"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
              >
                Voltar
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default RegistrationFormInline;
