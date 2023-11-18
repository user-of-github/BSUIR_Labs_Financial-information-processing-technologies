
interface BadgeProps {
  title: string;
  text?: string;
}
export const SuccessBadge = ({title, text}: BadgeProps): JSX.Element => (
  <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
    <span className="font-medium">{title}</span> {text}
  </div>
);

export const ErrorBadge = ({title, text}: BadgeProps): JSX.Element => (
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">{title}</span> {text}
  </div>
);
