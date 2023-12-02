import clsx from 'clsx';

interface BadgeProps {
  title: string;
  text?: string | JSX.Element;
  className?: string;
}
export const SuccessBadge = ({ title, text, className }: BadgeProps): JSX.Element => (
  <div
    className={clsx(
      'mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400 flex flex-row items-center',
      className
    )}
    role="alert"
  >
    <span className="font-medium">{title} </span>{' '}{text}
  </div>
);

export const ErrorBadge = ({ title, text, className }: BadgeProps): JSX.Element => (
  <div
    className={clsx('mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400', className)}
    role="alert"
  >
    <span className="font-medium">{title} </span>{' '}{text}
  </div>
);

export const InfoBadge = ({ title, text, className }: BadgeProps): JSX.Element => (
  <div
    className={clsx('mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400', className)}
    role="alert"
  >
    <span className="font-medium">{title} </span>{' '}{text}
  </div>
);
