import { QRCodeSVG } from "qrcode.react";
import { X, Printer } from "lucide-react";
import type { CarItem } from "@/types/car";
import { useRef } from "react";

interface QRCodeModalProps {
    car: CarItem;
    onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ car, onClose }) => {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code - ${car.make} ${car.model}</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              font-family: sans-serif;
            }
            .qr-container {
              text-align: center;
              border: 2px solid #000;
              padding: 40px;
              border-radius: 20px;
            }
            .car-title {
              font-size: 24px;
              font-weight: bold;
              margin-top: 20px;
              margin-bottom: 10px;
            }
            .car-price {
              font-size: 32px;
              font-weight: 900;
              color: #000;
            }
            @media print {
              body { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            ${printContent.innerHTML}
            <div class="car-title">${car.make} ${car.model} (${car.year})</div>
            <div class="car-price">$${car.price.toLocaleString()}</div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              }
            }
          </script>
        </body>
      </html>
    `);
        printWindow.document.close();
    };

    const qrUrl = `${window.location.origin}/inventory/${car.id}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-900">Vehicle QR Code</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition text-slate-500 hover:text-slate-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 flex flex-col items-center gap-6">
                    <div ref={printRef} className="bg-white p-4 rounded-xl border-2 border-slate-100">
                        <QRCodeSVG
                            value={qrUrl}
                            size={256}
                            level="H"
                            includeMargin={true}
                        />
                    </div>

                    <div className="text-center">
                        <h4 className="font-bold text-xl text-slate-900">{car.make} {car.model}</h4>
                        <p className="text-slate-500 font-medium">{car.year} • ${car.price.toLocaleString()}</p>
                    </div>

                    <div className="flex gap-3 w-full">
                        <button
                            onClick={handlePrint}
                            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition active:scale-95"
                        >
                            <Printer className="w-5 h-5" />
                            Print Label
                        </button>
                    </div>

                    <p className="text-xs text-center text-slate-400">
                        Scan to view details on {window.location.host}
                    </p>
                </div>
            </div>
        </div>
    );
};
