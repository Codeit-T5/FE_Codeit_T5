'use client';

import Image from 'next/image';
import { getUserInfo, editUserInfo } from '@/apis/userInfo';
import defaultProfile from '../../../../public/images/dude.png';
import { IUser } from '@/types/user';
import { useEffect, useState } from 'react';
import Header from '@/components/mypage/header/Header';

export default function EditUser() {
  const [userInfo, setUserInfo] = useState<IUser>();
  //   const [editUser, setEditUser] = useState<IUser>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setUserInfo(data);
    };
    fetchUserInfo();
  }, []);

  //   const handleEditUser = async () => {
  //     if (!editUser) return;
  //     const data = await editUserInfo(userInfo?.id || 0, editUser);
  //     setEditUser(data);
  //   };

  return (
    <div>
      <Header />
      <div className="py-10 px-4">
        <div className="flex flex-col items-center gap-6">
          <Image src={userInfo?.image ?? defaultProfile} alt="profile" width={86} height={86} />
          <span className="text-label-normal font-medium text-orange200">비밀번호 변경</span>
        </div>

        <div className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col gap-3">
            <label htmlFor="email">이메일 주소</label>
            <input
              type="text"
              id="email"
              placeholder="dothemeet@google.com"
              className="rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="nickName">닉네임</label>
            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                id="nickName"
                placeholder="두두두두"
                className="rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300"
              />
              <span className="text-label-normal font-medium text-gray300">
                최대 8글자까지 입력 가능해요
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="textarea">소개</label>
            <div className="flex flex-col gap-1.5">
              <textarea
                id="textarea"
                placeholder="소개를 입력해주세요"
                className="rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300"
              />
              <span className="text-label-normal font-medium text-gray300">
                최대 20글자까지 입력 가능해요
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="tag">태그</label>
            <span className="max-w-[76px] rounded-xl bg-background400 px-3 py-2 text-caption-normal font-medium text-gray300">
              # 태그추가
            </span>
            <span className="text-label-normal font-medium text-gray300">
              최대 5글자까지 입력 가능해요
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
