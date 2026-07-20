import { useState } from "react";
import { trackLead } from "@/lib/pixel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

const STEP_ONE_FIELDS = ["name", "email", "phone", "city", "state"] as const;

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
              <Label htmlFor="inc-name" className="text-base text-foreground">Nome completo</Label>
              <Input
                id="inc-name"
                {...register("name")}
                placeholder="Seu nome"
                className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
              />
              {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="inc-email" className="text-base text-foreground">E-mail</Label>
              <Input
                id="inc-email"
                type="email"
                {...register("email")}
                placeholder="seu@email.com"
                className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
              />
              {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="inc-phone" className="text-base text-foreground">WhatsApp</Label>
              <Input
                id="inc-phone"
                type="tel"
                {...register("phone")}
                onChange={handlePhoneChange}
                placeholder="(00) 00000-0000"
                className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
                maxLength={15}
              />
              {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              <div className="space-y-1.5 col-span-2 sm:col-span-4">
                <Label htmlFor="inc-city" className="text-base text-foreground">Cidade</Label>
                <Input
                  id="inc-city"
                  {...register("city")}
                  placeholder="Ex: São Paulo"
                  className="bg-background border-muted-foreground/20 focus:border-primary h-12 text-base"
                />
                {errors.city && <p className="text-destructive text-xs">{errors.city.message}</p>}
              </div>

              <div className="space-y-1.5 col-span-1">
                <Label htmlFor="inc-state" className="text-base text-foreground">Estado</Label>
                <select
                  id="inc-state"
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
            <div className="space-y-2">
              <Label className="text-base text-foreground">Já possui terreno?</Label>
              <RadioGroup
                onValueChange={(value) => setValue("hasLot", value as "sim" | "nao", { shouldValidate: true })}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="inc-lot-yes" className="border-primary text-primary" />
                  <Label htmlFor="inc-lot-yes" className="text-base text-foreground cursor-pointer">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="inc-lot-no" className="border-primary text-primary" />
                  <Label htmlFor="inc-lot-no" className="text-base text-foreground cursor-pointer">Não</Label>
                </div>
              </RadioGroup>
              {errors.hasLot && <p className="text-destructive text-xs">{errors.hasLot.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-base text-foreground">Você já possui projeto arquitetônico?</Label>
              <RadioGroup
                onValueChange={(value) => setValue("hasProject", value as "sim" | "nao", { shouldValidate: true })}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="inc-project-yes" className="border-primary text-primary" />
                  <Label htmlFor="inc-project-yes" className="text-base text-foreground cursor-pointer">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="inc-project-no" className="border-primary text-primary" />
                  <Label htmlFor="inc-project-no" className="text-base text-foreground cursor-pointer">Não</Label>
                </div>
              </RadioGroup>
              {errors.hasProject && <p className="text-destructive text-xs">{errors.hasProject.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-base text-foreground">Quanto você planeja investir na sua obra?</Label>
              <RadioGroup
                onValueChange={(value) => setValue("investmentAmount", value as any, { shouldValidate: true })}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Entre R$ 100 mil e R$ 500 mil" id="inc-invest-100-500" className="border-primary text-primary" />
                  <Label htmlFor="inc-invest-100-500" className="text-base text-foreground cursor-pointer">Entre R$ 100 mil e R$ 500 mil</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Entre R$ 600 mil e R$ 800 mil" id="inc-invest-600-800" className="border-primary text-primary" />
                  <Label htmlFor="inc-invest-600-800" className="text-base text-foreground cursor-pointer">Entre R$ 600 mil e R$ 800 mil</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Entre R$ 800 mil e R$ 1,2 milhão" id="inc-invest-800-1200" className="border-primary text-primary" />
                  <Label htmlFor="inc-invest-800-1200" className="text-base text-foreground cursor-pointer">Entre R$ 800 mil e R$ 1,2 milhão</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Entre R$ 1,2 milhão e R$ 2 milhões ou mais" id="inc-invest-1200-plus" className="border-primary text-primary" />
                  <Label htmlFor="inc-invest-1200-plus" className="text-base text-foreground cursor-pointer">Entre R$ 1,2 milhão e R$ 2 milhões ou mais</Label>
                </div>
              </RadioGroup>
              {errors.investmentAmount && <p className="text-destructive text-xs">{errors.investmentAmount.message}</p>}
            </div>

            <div className="flex flex-col gap-3 mt-6 sm:flex-row-reverse">
              <Button
                type="submit"
                variant="cta-green"
                size="lg"
                className="w-full h-12 rounded-full text-base"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Redirecionando..." : "CONFIRMAR INSCRIÇÃO"}
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
