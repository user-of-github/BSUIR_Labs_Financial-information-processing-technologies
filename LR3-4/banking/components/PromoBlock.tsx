import Image from 'next/image';
import clsx from 'clsx';

interface PromoBlockProps {
  title: string;
  description?: string;
  backgroundImage: string;
  color: string;
  isClickable?: boolean;
  className?: string;
  titleClassName?: string;
}

// TODO: rems
export const PromoBlock = ({
  title,
  titleClassName,
  description,
  backgroundImage,
  color,
  className,
  isClickable = true
}: PromoBlockProps): JSX.Element => {
  return (
    <section
      className={clsx(
        'relative flex h-72 max-md:h-full w-full select-none flex-row flex-nowrap justify-between overflow-hidden rounded-xl p-8 max-md:p-4 transition duration-200 ease-linear hover:shadow-lg active:scale-95',
        className,
        { 'pointer-events-none': !isClickable }
      )}
      style={{
        backgroundColor: color,
        cursor: isClickable ? 'pointer' : 'default'
      }}
    >
      <div className="flex w-full max-w-[66%] max-md:max-w-full z-10 flex-col gap-y-5">
        <h1 className={clsx('${titleClassName} text-[22px] font-bold max-md:text-[17px]', titleClassName)}>{title}</h1>
        <p className="space-x-0.5 text-[19px] font-light text-gray-700 max-md:text-[14px]">{description}</p>
      </div>

      <div className="absolute -bottom-3 -right-3 h-1/2 w-[200px] max-md:w-[100px] max-md:opacity-50 max-sm:opacity-30">
        <Image src={backgroundImage} alt={title} layout="fill" objectFit="contain" />
      </div>
    </section>
  );
};
