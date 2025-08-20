import Banner from "@/components/layout/Banner";
import LoginForm from "@/components/features/auth/LoginForm";

const Login = () => {
    return (
        <div className="min-h-screen">
            <div className="hidden lg:block fixed left-0 top-0 h-screen w-[60%]">
                <Banner />
            </div>

            <div className="flex flex-col gap-4 p-6 md:p-10 bg-muted lg:ml-[60%] min-h-screen">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xl lg:max-w-2xl">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
