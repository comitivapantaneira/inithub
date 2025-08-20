import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Button } from "@/ui/button";

interface CreateAccountFormStep2Props {
    onBack: () => void;
}

const CreateAccountFormStep2 = ({ onBack }: CreateAccountFormStep2Props) => {
  return (
    <div className="flex flex-col gap-6">
      <form className="grid gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Informações Pessoais</h1>
            <p className="text-balance text-sm text-muted-foreground">
                Preencha seus dados para criar uma nova conta
            </p>
        </div>

        <div className="grid gap-2">
            <Label htmlFor="email">Email Corporativo</Label>
            <Input 
                className="bg-transparent"
                id="email" 
                type="email" 
                placeholder="admin@inithub.com" 
                required 
            />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input 
            className="bg-transparent"
            id="password" 
            type="password" 
            placeholder="Digite sua senha"
            required 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input 
            className="bg-transparent"
            id="confirmPassword" 
            type="password" 
            placeholder="Digite sua senha novamente"
            required 
          />
        </div>

        <div className="grid gap-3">
          <Button type="submit" className="w-full shadow-md">
            Criar Sua Conta
          </Button>

          <Button 
            variant="muted" 
            className="w-full"
            onClick={onBack}
            type="button"
          >
            Voltar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccountFormStep2;
