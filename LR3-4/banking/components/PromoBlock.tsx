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

// TODO: rems, isClickable, clsx
export const PromoBlock = ({ title, titleClassName, description, backgroundImage, color, className, isClickable = true }: PromoBlockProps): JSX.Element => {
  return (
    <section
      className={clsx(
        'relative flex h-72 w-full select-none flex-row flex-nowrap justify-between overflow-hidden rounded-xl p-8 transition duration-200 ease-linear hover:shadow-lg active:scale-95',
        className,
        {'pointer-events-none': !isClickable}
      )}
      style={{
        backgroundColor: color,
        cursor: isClickable ? 'pointer' : 'default'
      }}
    >
      <div className="flex w-full max-w-[66%] flex-col gap-y-5">
        <h1 className={clsx(
          'text-[22px] font-bold ${titleClassName}',
          titleClassName
        )}>
          {title}
        </h1>
        <p className="space-x-0.5 text-[19px] font-light text-gray-700">{description}</p>
      </div>

      <div className="absolute bottom-2 right-1 h-1/2 w-[200px]">
        <Image src={backgroundImage} alt={title} layout="fill" objectFit="contain" />
      </div>
    </section>
  );
};
