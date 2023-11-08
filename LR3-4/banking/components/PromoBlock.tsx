import Image from 'next/image';

interface PromoBlockProps {
    title: string;
    description?: string;
    backgroundImage: string;
    color: string;
    isClickable?: boolean;
    className?: string;
}

// TODO: rems, isClickable, clsx
export const PromoBlock = ({title, description, backgroundImage, color, className, isClickable = true}: PromoBlockProps): JSX.Element => {
    return (
        <section
            className={`select-none relative overflow-hidden flex justify-between flex-row flex-nowrap w-full h-72 p-8
            rounded-xl transition ease-linear duration-200 hover:shadow-lg active:scale-95 ${className}`}
            style={{backgroundColor: color, cursor: isClickable ? 'pointer' : 'default'}}
        >
            <div className="flex flex-col gap-y-5 w-full max-w-[66%]">
                <h1 className="font-bold text-[22px]">{title}</h1>
                <p className="font-light space-x-0.5 text-gray-700 text-[19px]">{description}</p>
            </div>

            <div className="w-[200px] h-1/2 absolute bottom-2 right-1">
                <Image src={backgroundImage} alt={title} layout="fill" objectFit="contain"/>
            </div>
        </section>
    );
};
