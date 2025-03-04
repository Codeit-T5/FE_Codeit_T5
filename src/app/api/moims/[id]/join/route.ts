import { getUser } from '@/app/api/auth/getUser';
import { TMe } from '@/types/auth/auth.type';
import { TMoimsJoined } from '@/types/supabase/supabase-custom.type';
import { mapMoimsToClient } from '@/utils/common/mapMoims';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { isSuccess, message, user, status: userStatus } = await getUser(supabase);

  if (!isSuccess) {
    return NextResponse.json({ message }, { status: userStatus });
  }

  const {
    data: foundUser,
    error: foundUserError,
  }: { data: TMe | null; error: PostgrestError | null } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email)
    .single();

  if (foundUserError) {
    return NextResponse.json({ message: foundUserError?.message }, { status: 500 });
  }

  if (!foundUser) {
    return NextResponse.json({ message: '사용자 정보가 없어요' }, { status: 401 });
  }

  const { data: existingLike } = await supabase
    .from('participated_moims')
    .select('*')
    .eq('moim_uuid', id)
    .eq('user_uuid', foundUser.id)
    .single();

  if (existingLike) {
    return NextResponse.json({ message: '이미 참여한 모임이에요' }, { status: 400 });
  }

  const { data: participatedData, error: participatedError } = await supabase
    .from('participated_moims')
    .upsert({
      moim_uuid: id,
      user_uuid: foundUser.id,
      user_email: foundUser.email,
      user_image: foundUser.image,
      user_nickname: foundUser.nickname,
    })
    .select();

  if (participatedError) {
    return NextResponse.json({ message: participatedError?.message }, { status: 500 });
  }

  if (!participatedData) {
    return NextResponse.json({ message: '모임 참여 실패' }, { status: 500 });
  }

  const {
    data: moim,
    error: moimError,
  }: {
    data: TMoimsJoined | null;
    error: PostgrestError | null;
  } = await supabase
    .from('moims')
    .select(
      '*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid)',
    )
    .eq('id', id)
    .single();

  if (moimError) {
    return NextResponse.json({ message: moimError?.message }, { status: 500 });
  }

  if (!moim) {
    return NextResponse.json({ message: '모임 정보가 없어요' }, { status: 404 });
  }

  if (moim.master_email === user.email) {
    return NextResponse.json({ message: '자신이 개설한 모임은 참여할 수 없어요' }, { status: 400 });
  }

  const response = {
    message: '모임 참여가 성공적으로 완료되었습니다',
    data: mapMoimsToClient([moim])[0],
  };

  return NextResponse.json(response, { status: 200 });
}
