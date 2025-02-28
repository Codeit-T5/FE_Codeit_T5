'use client';

import AuthSelect from '@/components/auth/AuthSelect';
import TagInput from '@/components/common/TagInput';
import { useEditUserMutation, useUserQuery } from '@/hooks/mypage/queries/useUserQuery';
import { IUserEdit } from '@/types/mypage/user';
import { cn } from '@/utils/auth/ui.util';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Position = 'PM' | 'DESIGNER' | 'FRONTEND' | 'BACKEND';

interface IUserEditForm {
  email: string;
  nickname: string;
  position: Position;
  introduction: string;
  tags: string[];
  image: FileList | null;
}

export default function UserEdit() {
  const { data } = useUserQuery();
  const { mutate: editUser, isPending: isEditing } = useEditUserMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<IUserEditForm>({
    defaultValues: {
      email: '',
      nickname: '',
      position: 'PM',
      introduction: '',
      tags: [],
      image: null,
    },
  });

  // 데이터 초기화
  useEffect(() => {
    if (data) {
      setValue('email', data.email || '');
      setValue('nickname', data.nickname || '');
      setValue('position', (data.position as Position) || 'PM');
      setValue('introduction', data.introduction || '');
      setValue('tags', data.tags || []);
    }
  }, [data, setValue]);

  // 폼 제출 핸들러
  const onSubmit = (formData: IUserEditForm) => {
    const editData: IUserEdit = {
      ...formData,
      image: fileInputRef.current?.files?.[0] || null,
    };
    editUser(editData);
  };

  return (
    <>
      <form className="flex flex-col gap-6 mt-8 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-body-2-nomal font-medium text-gray-800">
            이메일 주소
          </label>
          <input
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
            type="text"
            id="email"
            placeholder="dothemeet@google.com"
            className={`rounded-xl text-gray700 bg-background400 px-4 py-[18px] placeholder:text-gray300 outline-none ${
              errors.email ? 'border-2 border-error focus:border-error' : ''
            }`}
          />
          {errors.email && (
            <span className="text-label-normal font-medium text-error">
              이메일 형식으로 입력해주세요.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="nickname" className="text-body-2-nomal font-medium text-gray-800">
            닉네임
          </label>
          <input
            {...register('nickname', {
              required: true,
              maxLength: 8,
            })}
            type="text"
            id="nickname"
            placeholder="두두씨"
            className={`rounded-xl text-gray700 bg-background400 px-4 py-[18px] placeholder:text-gray300 outline-none ${
              errors.nickname ? 'border-2 border-error focus:border-error' : ''
            }`}
          />
          <span
            className={`text-label-normal font-medium ${errors.nickname ? 'text-error' : 'text-gray300'}`}
          >
            최대 8글자까지 입력 가능해요
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="position" className="flex justify-start items-center gap-[2px]">
            <span className="text-body-2-nomal font-medium text-gray-800">직군</span>
            <span className="text-body-2-nomal font-medium text-error pt-1">*</span>
          </label>
          <Controller
            name="position"
            control={control}
            rules={{ required: '직군을 선택해주세요' }}
            render={({ field }) => (
              <AuthSelect
                options={[
                  { value: 'PM', label: 'PM' },
                  { value: 'DESIGNER', label: '디자이너' },
                  { value: 'FRONTEND', label: '프론트 개발자' },
                  { value: 'BACKEND', label: '백엔드 개발자' },
                ]}
                className={cn('h-[54px]', errors.position && 'focus-visible:ring-error')}
                placeholder="직군을 선택해주세요"
                {...field}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="introduction" className="text-body-2-nomal font-medium text-gray-800">
            소개
          </label>
          <textarea
            {...register('introduction', {
              required: true,
              maxLength: 20,
            })}
            id="introduction"
            placeholder="소개를 입력해주세요"
            className={`rounded-xl text-gray700 bg-background400 px-4 py-[18px] placeholder:text-gray300 resize-none outline-none ${
              errors.introduction ? 'border-2 border-error focus:border-error' : ''
            }`}
          />
          <span
            className={`text-label-normal font-medium ${errors.introduction ? 'text-error' : 'text-gray300'}`}
          >
            최대 20자까지 입력 가능해요
          </span>
        </div>

        <Controller
          name="tags"
          control={control}
          rules={{ required: true, validate: (tags) => tags.length <= 3 }}
          render={({ field }) => (
            <TagInput tags={field.value} onTagsChange={(newTags) => field.onChange(newTags)} />
          )}
        />

        <button
          type="submit"
          disabled={isEditing || !isValid}
          className={`w-full rounded-2xl py-[17px] ${isValid ? 'bg-orange200' : 'bg-gray950'}`}
        >
          <span
            className={`text-body-1-normal font-semibold ${
              isValid ? 'text-white' : 'text-gray600'
            }`}
          >
            수정완료
          </span>
        </button>
      </form>
    </>
  );
}
