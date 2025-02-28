'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { resetPassword } from '@/apis/userInfo';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface IFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordInput = ({
  id,
  label,
  placeholder,
  showPassword,
  register,
  error,
  onToggleVisibility,
}: {
  id: keyof IFormInputs;
  label: string;
  placeholder: string;
  showPassword: boolean;
  register: any;
  error?: string;
  onToggleVisibility: () => void;
}) => (
  <div className="flex flex-col gap-3">
    <label htmlFor={id} className="flex justify-start items-center gap-[2px] px-2">
      <span className="text-body-2-nomal font-medium text-gray-800">{label}</span>
      <span className="text-body-2-nomal font-medium text-error pt-1">*</span>
    </label>
    <div className="relative rounded-xl bg-background400 px-4 py-[18px]">
      <input
        type={showPassword ? 'text' : 'password'}
        {...register(id, {
          required: '비밀번호를 입력해주세요',
          minLength: { value: 8, message: '비밀번호는 최소 8자 이상이어야 합니다' },
          maxLength: { value: 20, message: '비밀번호는 최대 20자까지 가능합니다' },
          pattern: {
            value: /^(?=.*[!@#$%^&*])/,
            message: '특수문자를 포함해야 합니다',
          },
        })}
        placeholder={placeholder}
        className="bg-background400 w-full placeholder:text-gray300 outline-none"
      />
      <Image
        src={
          showPassword ? '/images/mypage/visibility_on.svg' : '/images/mypage/visibility_off.svg'
        }
        alt="password visibility"
        width={24}
        height={24}
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={onToggleVisibility}
      />
    </div>
    {error && <span className="text-error text-label-normal px-2">{error}</span>}
    <span className="text-label-normal font-medium text-gray300 px-2">
      특수문자 포함 8~20자 사이로 입력해주세요
    </span>
  </div>
);

export default function EditPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    mode: 'onChange',
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const router = useRouter();

  const onSubmit = async (data: IFormInputs) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('비밀번호 확인 실패', {
        description: '새 비밀번호가 일치하지 않습니다',
        icon: <XCircle className="w-5 h-5 text-red-500" />,
      });
      return;
    }

    const result = await resetPassword(data.newPassword);

    if (!result.redirectUrl) {
      toast.error('비밀번호 변경 실패', {
        description: '비밀번호 변경에 실패했습니다',
        icon: <XCircle className="w-5 h-5 text-red-500" />,
        duration: 4000,
        position: 'top-right',
      });
      return;
    }

    router.push(result.redirectUrl);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="h-auto flex flex-col gap-6 mx-auto max-w-[584px] md:bg-background300 md:rounded-[32px] md:px-11 md:py-10 md:my-14 lg:my-10">
      <p className="text-title-1 font-semibold text-gray-800">비밀번호 변경</p>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput
          id="currentPassword"
          label="현재 비밀번호"
          placeholder="현재 비밀번호를 입력해주세요"
          showPassword={passwordVisibility.current}
          register={register}
          error={errors.currentPassword?.message}
          onToggleVisibility={() => togglePasswordVisibility('current')}
        />

        <PasswordInput
          id="newPassword"
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해주세요"
          showPassword={passwordVisibility.new}
          register={register}
          error={errors.newPassword?.message}
          onToggleVisibility={() => togglePasswordVisibility('new')}
        />

        <PasswordInput
          id="confirmPassword"
          label="새 비밀번호 확인"
          placeholder="새 비밀번호를 다시 입력해주세요"
          showPassword={passwordVisibility.confirm}
          register={register}
          error={errors.confirmPassword?.message}
          onToggleVisibility={() => togglePasswordVisibility('confirm')}
        />

        <div className="flex flex-col items-center justify-center gap-4 w-full mt-[98px]">
          <Link
            href="/mypage/editUser"
            className="text-label-normal font-semibold text-gray-600 underline"
          >
            다음에 변경하기
          </Link>
          <button
            type="submit"
            className={`${
              isValid ? 'bg-orange200 text-white' : 'bg-gray950 text-gray600'
            } font-semibold text-body-1-nomal rounded-2xl py-[17px] w-full`}
          >
            비밀번호 변경
          </button>
        </div>
      </form>
    </div>
  );
}
