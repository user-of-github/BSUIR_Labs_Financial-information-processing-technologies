import clsx from 'clsx';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  text: string | number | JSX.Element;
  onClick?: () => void;
  appearance: keyof typeof buttonStyles;
  className?: string;
  disabled?: boolean;
}

export const Button = ({ type, text, onClick, appearance, className, disabled }: ButtonProps): JSX.Element => {
  return (
    <button type={type} onClick={onClick} className={clsx(buttonStyles[appearance], animated, className)} disabled={disabled}>
      {text}
    </button>
  );
};

const animated = 'transition active:scale-90' as const;
const buttonStyles = {
  primary:
    'disabled:pointer-events-none disabled:cursor-default max-md:w-full git text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none',
  ordinary:
    'disabled:pointer-events-none disabled:cursor-default max-md:w-full git py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200',
  dark: 'disabled:pointer-events-none max-md:w-full git text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2',
  light:
    'disabled:pointer-events-none disabled:cursor-default max-md:w-full git text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2',
  purple:
    'disabled:pointer-events-none disabled:cursor-default max-md:w-full git focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'
} as const;
