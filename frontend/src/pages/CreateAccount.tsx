import { useState } from "react";
import LoginBanner from "@/components/LoginBanner";
import CreateAccountFormStep1 from "@/components/CreateAccountFormStep1";
import CreateAccountFormStep2 from "@/components/CreateAccountFormStep2";

const CreateAccount = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(2);
    }

    const previousStep = () => {
        setStep(1);
    }

    return (
        <div className="min-h-screen">
            <div className="hidden lg:block fixed left-0 top-0 h-screen w-[60%]">
                <LoginBanner />
            </div>

            <div className="flex flex-col gap-4 p-6 md:p-10 bg-muted lg:ml-[60%] min-h-screen">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        {step === 1 ? (
                            <CreateAccountFormStep1 onNext={nextStep} />
                        ) : (
                            <CreateAccountFormStep2 onBack={previousStep} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;