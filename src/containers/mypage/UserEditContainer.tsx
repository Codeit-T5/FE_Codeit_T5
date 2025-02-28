'use client';

import Header from '@/components/mypage/header/Header';
import { LoadingAnimation } from '@/components/mypage/LoadingAnimation';
import { useEditUserMutation, useUserQuery } from '@/hooks/mypage/queries/useUserQuery';
import Link from 'next/link';
import UserEdit from '@/components/mypage/UserEdit';

export default function UserEditContainer() {
  const { data, isLoading } = useUserQuery();
  const { isPending: isEditing } = useEditUserMutation();

  if (isLoading || isEditing) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <p>사용자 정보가 없습니다.</p>
        <Link href="/mypage" className="text-orange200">
          마이페이지로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="h-auto flex flex-col gap-4 mx-auto max-w-[584px] md:bg-background300 md:rounded-[32px] md:px-11 md:py-10 md:my-14 lg:my-10">
        <div className="py-10 px-4">
          <UserEdit />
        </div>
      </div>
    </>
  );
}
