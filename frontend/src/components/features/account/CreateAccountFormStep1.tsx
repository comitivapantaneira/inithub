import { useNavigate } from "react-router-dom";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Button } from "@/ui/button";

interface CreateAccountFormStep1Props {
  onNext: () => void;
}

const CreateAccountFormStep1 = ({ onNext }: CreateAccountFormStep1Props) => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/");
    }

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
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                        className="bg-transparent"
                        id="fullName" 
                        type="text" 
                        placeholder="Digite seu nome completo" 
                        required 
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="role">Cargo</Label>
                    <Input 
                        className="bg-transparent"
                        id="role" 
                        type="text" 
                        placeholder="Digite seu cargo" 
                        required 
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="photo">Foto</Label>
                    <Input 
                        className="bg-transparent"
                        id="photo" 
                        type="file" 
                        accept="image/*"
                        required 
                    />
                </div>

                <div className="grid gap-3">
                    <Button type="button" className="w-full shadow-md" onClick={onNext}>
                        Próximo
                    </Button>
                    <Button 
                        onClick={goToLogin}
                        variant="muted" 
                        className="w-full" 
                        type="button"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateAccountFormStep1;
