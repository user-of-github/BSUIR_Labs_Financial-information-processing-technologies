'use client';

import { QrScanner } from '@yudiel/react-qr-scanner';

interface QrScannerComponentProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export const QrScannerComponent = ({ onScan }: QrScannerComponentProps): JSX.Element => {
  return <QrScanner onDecode={onScan} onError={(error) => console.log(error?.message)} />;
};
