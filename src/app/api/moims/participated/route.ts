import {
  TMoimClient,
  TMoimsJoined,
  TParticipatedMoimsJoined,
} from '@/types/supabase/supabase-custom.type';
import { mapMoimsToClient } from '@/utils/common/mapMoims';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getUser } from '../../auth/getUser';

// 내가 참여한 모임 조회
export async function GET() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { isSuccess, message, user, status: userStatus } = await getUser(supabase);

  if (!isSuccess) {
    return NextResponse.json({ message }, { status: userStatus });
  }

  const { data: foundUser, error: foundUserError } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email)
    .single();

  if (foundUserError) {
    return NextResponse.json({ message: foundUserError?.message }, { status: 500 });
  }

  const {
    data: participatedMoims,
    error: participatedMoimsError,
  }: { data: TParticipatedMoimsJoined[] | null; error: PostgrestError | null } = await supabase
    .from('participated_moims')
    .select(
      '*, moims (*, reviews (created_at, user_uuid, review, rate, user_email, user_image, user_nickname), participated_moims (user_uuid, user_email, user_image, user_nickname), liked_moims (user_uuid))',
    )
    .eq('user_uuid', foundUser.id);

  if (participatedMoimsError) {
    return NextResponse.json({ message: participatedMoimsError?.message }, { status: 500 });
  }

  if (!participatedMoims) {
    return NextResponse.json({ message: '참여한 모임이 없어요' }, { status: 404 });
  }

  const mappedMoims: TMoimsJoined[] = participatedMoims.map((participatedMoim) => ({
    ...participatedMoim.moims,
    reviews: participatedMoim.moims.reviews,
    participated_moims: participatedMoim.moims.participated_moims,
    liked_moims: participatedMoim.moims.liked_moims,
  }));

  const moimsToClient: TMoimClient[] = mapMoimsToClient(mappedMoims);

  return NextResponse.json(moimsToClient, { status: 200 });
}
