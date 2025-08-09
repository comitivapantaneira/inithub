import LoginBanner from "../components/LoginBanner";
import LoginForm from "../components/LoginForm";

const Login = () => {
    return (
        <div className="min-h-screen">
            <div className="hidden lg:block fixed left-0 top-0 h-screen w-[60%]">
                <LoginBanner />
            </div>

            <div className="flex flex-col gap-4 p-6 md:p-10 bg-muted lg:ml-[60%] min-h-screen">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
