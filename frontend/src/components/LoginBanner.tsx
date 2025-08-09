const LoginBanner = () => {
    return (
        <div className="h-screen w-full relative">
            <img 
                src="/images/login-banner.svg"
                alt="Image"
                className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div className="absolute bottom-8 flex flex-col md:flex-row gap-6 w-full px-8">
                <div className="bg-white rounded-2xl py-0 p-6 shadow-lg flex items-center gap-4 flex-[1]">
                    <div className="flex-shrink-0 w-full h-full">
                        <img 
                            src="/images/logo-comitiva.svg" 
                            alt="Comitiva Pantaneira Logo" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                <div className="bg-white py-0 rounded-2xl p-6 shadow-lg flex items-center gap-4 flex-[2]">
                    <div className="flex-shrink-0 ">
                        <img 
                            src="/images/logo-inithub.svg" 
                            alt="Comitiva Pantaneira Logo" 
                        />
                    </div>
                    <div className="flex-1">
                        <div className="mt-2">
                            <p className="text-sm font-bold text-gray-800">Plataforma de Inovação Corporativa</p>
                            <p className="text-xs text-gray-600">Conecte ideias. Multiplique o seu impacto.</p>
                            <p className="text-xs text-gray-600">Transforme o futuro.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBanner;
