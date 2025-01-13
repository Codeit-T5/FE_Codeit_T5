import Link from 'next/link';
import AuthButton from './AuthButton';
import AuthKakao from './AuthKakao';
import DothemeetCharacter from './DothemeetCharacter';

interface AuthSelectEmailKakaoProps {
  children: React.ReactNode;
}

export default function AuthSelectEmailKakao({ children }: AuthSelectEmailKakaoProps) {
  return (
    <div className="w-[327px] min-h-dvh flex flex-col items-center justify-center">
      <div className="flex-1 flex items-center justify-center">
        <DothemeetCharacter />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4 pb-12">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <Link href="/auth/signin?type=kakao" className="w-full">
            <AuthButton>
              <AuthKakao className="w-5 h-5" /> 카카오로 시작하기
            </AuthButton>
          </Link>
          <Link href="/auth/signup" className="w-full">
            <AuthButton>이메일로 시작하기</AuthButton>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
