import clsx from 'clsx';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  text: string | number | JSX.Element;
  onClick?: () => void;
  appearance: keyof typeof buttonStyles;
  className?: string;
  disabaled?: boolean;
}

export const Button = ({ type, text, onClick, appearance, className, disbaled }: ButtonProps): JSX.Element => {
  return (
    <button type={type} onClick={onClick} className={clsx(buttonStyles[appearance], animated, className)} disabled={disbaled}>
      {text}
    </button>
  );
};

const animated = 'transition active:scale-90' as const;
const buttonStyles = {
  primary:
    'disabled:pointer-events-none max-md:w-full git text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
  ordinary:
    'disabled:pointer-events-none max-md:w-full git py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700',
  dark: 'disabled:pointer-events-none max-md:w-full git text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700',
  light:
    'disabled:pointer-events-none max-md:w-full git text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
  purple:
    'disabled:pointer-events-none max-md:w-full git focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
} as const;
