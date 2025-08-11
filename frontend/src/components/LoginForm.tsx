import { useNavigate } from "react-router-dom";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

const LoginForm = () => {
  const navigate = useNavigate();

  const goToCreateAccount = () => {
    navigate("/create-account");
  }

  return (
    <div className="flex flex-col gap-6">
      <form className="grid gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Acesse sua conta</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Entre ou crie um novo espaço organizacional
          </p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            className="bg-transparent"
            id="email" 
            type="email" 
            placeholder="seu.email@empresa.com" 
            required 
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input
            className="bg-transparent"
            id="password" 
            type="password" 
            placeholder="Digite sua senha"
            required 
          />
        </div>

        <div className="grid gap-3">
          <Button type="submit" className="w-full shadow-md">
            Entrar
          </Button>

          <Button 
            variant="muted" 
            className="w-full"
            onClick={goToCreateAccount}
          >
            Criar Conta    
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
