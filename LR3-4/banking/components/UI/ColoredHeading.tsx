import clsx from 'clsx';

interface ColoredHeadingProps {
  coloredText?: string;
  ordinaryText?: string;
  headingLevel: keyof typeof headings;
  className?: string;
  swap?: boolean;
}

interface HeadingProps {
  children?: any;
  className?: string;
}

const headings = {
  1: {
    element: (props: HeadingProps) => <h1 className={props.className}>{props.children}</h1>,
    style: 'mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl'
  },
  2: {
    element: (props: HeadingProps) => <h2 className={props.className}>{props.children}</h2>,
    style: 'mb-4 text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl'
  },
  3: {
    element: (props: HeadingProps) => <h3 className={props.className}>{props.children}</h3>,
    style: 'mb-4 text-xl font-extrabold text-gray-900 md:text-xl lg:text-2xl'
  }
};
export const ColoredHeading = ({
  coloredText,
  ordinaryText,
  headingLevel,
  className,
  swap
}: ColoredHeadingProps): JSX.Element => {
  const Component = headings[headingLevel].element;
  const headingStyles = headings[headingLevel].style;
  const colorStyle = 'bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent' as const;

  return (
    <Component className={clsx(headingStyles, className)}>
      {!swap && (
        <>
          <span className={colorStyle}>{coloredText}</span>
          {ordinaryText}
        </>
      )}
      {swap && (
        <>
          {coloredText}
          <span className={colorStyle}>{ordinaryText}</span>
        </>
      )}
    </Component>
  );
};
