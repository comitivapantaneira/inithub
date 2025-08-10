import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CreateAccountForm = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <form className="grid gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Preencha seus dados para criar uma nova conta
          </p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="fullName">Nome Completo</Label>
          <Input 
            id="fullName" 
            type="text" 
            placeholder="Digite seu nome completo" 
            required 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email Corporativo</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="seu.email@empresa.com" 
            required 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="role">Cargo</Label>
          <Input 
            id="role" 
            type="text" 
            placeholder="Digite seu cargo" 
            required 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="photo">Foto</Label>
          <Input 
            id="photo" 
            type="file" 
            accept="image/*"
            required 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Digite sua senha"
            required 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input 
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
            onClick={goBack}
            type="button"
          >
            Voltar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccountForm;
