import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { authService } from "@/services/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const userId = searchParams.get('userId');
    if (userId) {
      authService.getUserForAuth(userId).then((data) => {
        if (data) {
          setEmail(data.email);
        }
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailToUse = email.trim() || 'admin@inithub.com';

    try {
      const response = await authService.login(emailToUse, password);
      
      if (response.isAuthenticated) {
        authService.saveUserToLocalStorage(response.user);
        navigate('/home');
      }
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const goToCreateAccount = () => {
    navigate("/create-account");
  }

  return (
    <div className="flex flex-col gap-6">
      <form className="grid gap-6" onSubmit={handleSubmit}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grid gap-3">
          <Button 
            type="submit" 
            className="w-full shadow-md"
          >
            Entrar
          </Button>

          <Button 
            type="button"
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
