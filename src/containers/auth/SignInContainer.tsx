'use client';

import { SignInForm } from '@/components/auth';
import AuthQuestions from '@/components/auth/AuthQuestions';
import AuthSelectEmailKakao from '@/components/auth/AuthSelectEmailKakao';
import { useSearchParams } from 'next/navigation';

export default function SignInContainer() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full min-w-dvw min-h-dvh flex flex-col items-center justify-center bg-background200 text-gray800">
        <section className="w-full h-auto min-h-dvh flex flex-col items-center justify-center bg-background200 text-gray800">
          {/** 즉시실행함수로 처리 */}
          {(() => {
            if (type === null) {
              return (
                <AuthSelectEmailKakao>
                  <AuthQuestions type="signin" />
                </AuthSelectEmailKakao>
              );
            } else if (type === 'email') {
              return <SignInForm />;
            }
          })()}
        </section>
      </div>
    </div>
  );
}
