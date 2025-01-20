import React, { useState } from 'react';
import { useMakeStore } from '@/stores/make/makeStore';
import CameraIcon from '../home/icons/CameraIcon';
import DeleteFillIcon from '../home/icons/DeleteFillIcon';

export default function DescriptionStep() {
  const { name, description, image, setName, setDescription, setImage } = useMakeStore();
  const [error, setError] = useState<string | null>();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length > 0) setError(null);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (e.target.value.length > 0) setError(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col space-y-4 px-5 h-[680px]">
      {/* 소개 */}
      <div className="flex flex-col items-start mb-10">
        <h1 className="text-title-2 font-semibold">모임을 소개해주세요</h1>
        <p className="text-body-2-normal text-gray400">모임에서 어떤 활동을 할까요?</p>
      </div>
      {/* 제목 입력 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          제목 <span className="text-orange200">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="제목을 입력해주세요 (최대 20자)"
          maxLength={20}
          className="w-full min-h-[54px] p-4 mt-3 border bg-background400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange200"
        />
        <p className="text-label-normal text-gray500 mt-1.5">
          모임을 대표하는 한 줄 소개를 입력하면 좋아요
        </p>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>

      {/* 설명 입력 */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          내용 <span className="text-orange200">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="모임의 내용을 입력해주세요 (최대 200자)"
          maxLength={200}
          rows={4}
          className="w-full p-4 mt-3 border border-gray-300 bg-background400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange200"
        />
      </div>

      {/* 이미지 업로드 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">이미지</label>
        <div className="relative w-[120px] h-[120px] mt-2 bg-background400 rounded-md flex items-center justify-center">
          {image ? (
            <div className="relative w-full h-full group">
              <img src={image} alt="uploaded" className="w-full h-full object-cover rounded-2xl" />
              <button
                onClick={() => setImage('')}
                className="absolute top-0 hidden group-hover:flex bg-gray900 bg-opacity-40 w-full h-full rounded-2xl text-white text-lg items-center justify-center"
              >
                <DeleteFillIcon className='fill-[#c4c4c4]' />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <CameraIcon />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>
        <p className="text-label-normal text-gray500 mt-1.5">
          관련 이미지가 있다면 넣어주세요(선택)
        </p>
      </div>
    </div>
  );
}
