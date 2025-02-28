'use client';

import { sendPasswordResetEmail } from '@/apis/userInfo';
import Header from '@/components/mypage/header/Header';
import { LoadingAnimation } from '@/components/mypage/LoadingAnimation';
import { useEditUserMutation, useUserQuery } from '@/hooks/mypage/queries/useUserQuery';
import { CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import UserEdit from '@/components/mypage/UserEdit';

export default function UserEditContainer() {
  const { data, isLoading } = useUserQuery();
  const { isPending: isEditing } = useEditUserMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

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

  // 즉시실행
  const imgSrc = (() => {
    if (previewImage) {
      return previewImage;
    }

    if (data?.image) {
      return data.image;
    }

    return '/images/mypage/profile-edit-default.svg';
  })();

  const onClickUpdatePasswordBtn = async () => {
    try {
      await sendPasswordResetEmail(data.email);
      toast.success('이메일 발송 완료', {
        description: '비밀번호 변경 메일을 발송했습니다.',
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        duration: 4000,
        position: 'top-right',
      });
    } catch (error: any) {
      console.error('비밀번호 변경 이메일 전송 에러:', error);

      let errorMessage = '비밀번호 변경 이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.';

      // 보안상의 이유로 48초 후에 시도해야하여 1분으로 변경
      if (error.response?.data?.error?.includes('48 seconds')) {
        errorMessage = '1분 후에 다시 시도해주세요.';
      } else if (error.response?.status === 405) {
        errorMessage = '현재 비밀번호 변경 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.response?.status === 400) {
        errorMessage = '이메일 형식이 올바르지 않습니다.';
      }

      toast.error('비밀번호 변경 중 오류가 발생했습니다.', {
        description: errorMessage,
        icon: <XCircle className="w-5 h-5 text-red-500" />,
        duration: 4000,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <Header />
      <div className="h-auto flex flex-col gap-4 mx-auto max-w-[584px] md:bg-background300 md:rounded-[32px] md:px-11 md:py-10 md:my-14 lg:my-10">
        <div className="py-10 px-4">
          <div className="flex flex-col items-center gap-6">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Image
                src={imgSrc}
                alt="profile"
                width={86}
                height={86}
                className="cursor-pointer rounded-full w-16 h-16"
                onClick={handleImageClick}
              />
            </div>
            {!data.is_social && (
              <button
                onClick={onClickUpdatePasswordBtn}
                className="text-label-normal font-medium text-orange200"
              >
                비밀번호 변경
              </button>
            )}
            <UserEdit />
          </div>
        </div>
      </div>
    </>
  );
}
