import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';

import { setCookie } from '@/utils/auth/auth-server.util';
import { createClient } from '@/utils/supabase/server';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';
  const authorization = (await headers()).get('authorization');
  const token = authorization?.split(' ')[1] ?? null;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // console.log('토큰 해쉬 =>', token_hash);
  // console.log('타입 =>', type);
  // console.log('다음 주소 =>', next);

  // 패스워드 변경 플로우 인데 만약에 로그인 중이면 로그아웃 시킬것
  // let user: User | null;
  // let error: AuthError | null;
  // if (token) {
  //   ({
  //     data: { user },
  //     error,
  //   } = await supabase.auth.getUser(token));
  // } else {
  //   ({
  //     data: { user },
  //     error,
  //   } = await supabase.auth.getUser());
  // }

  // if (error) {
  //   return NextResponse.json({ message: '문제가 발생했습니다' }, { status: 500 });
  // }

  // if (user) {
  //   const { error: logoutError } = await supabase.auth.signOut();
  //   if (logoutError) {
  //     return NextResponse.json({ message: '로그아웃에 실패했습니다' }, { status: 500 });
  //   }
  // }

  if (token_hash && type) {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (session?.access_token && session?.refresh_token) {
      setCookie({
        name: 'access_token',
        value: session?.access_token,
        maxAge: 60 * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      setCookie({
        name: 'refresh_token',
        value: session?.refresh_token,
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    }

    if (error) {
      redirect('/');
    }

    if (user && !error) {
      // console.log('컨펌에서 데이터 잘 받아오는가? =>', data);
      // redirect user to specified redirect URL or root of app
      // revalidatePath("/recover");
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/');
}
