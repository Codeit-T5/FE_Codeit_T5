import React from 'react';

const FilterIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_76_27441)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.71429 2C2.44673 2 2.2016 2.14953 2.07917 2.38744C1.95674 2.62535 1.97753 2.91173 2.13305 3.12946L9.14286 12.9432V21.2857C9.14286 21.5491 9.28785 21.7911 9.5201 21.9154C9.75236 22.0397 10.0342 22.0261 10.2534 21.88L14.5391 19.0229C14.7378 18.8904 14.8571 18.6674 14.8571 18.4286V12.9432L21.867 3.12946C22.0224 2.91173 22.0433 2.62535 21.9209 2.38744C21.7984 2.14953 21.5533 2 21.2857 2H2.71429Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_76_27441">
          <rect width="20" height="20" transform="translate(2 2)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FilterIcon;
