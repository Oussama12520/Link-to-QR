import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, Link, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function QRCodeGenerator() {
  const [url, setUrl] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setQrDataUrl(null);
      setError(null);
      return;
    }

    const generateQR = async () => {
      try {
        const dataUrl = await QRCode.toDataURL(url, {
          width: 400,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });
        setQrDataUrl(dataUrl);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to generate QR code');
        setQrDataUrl(null);
      }
    };

    // Debounce generation
    const timer = setTimeout(() => {
      generateQR();
    }, 500);

    return () => clearTimeout(timer);
  }, [url]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6 bg-slate-800 rounded-2xl shadow-xl border border-slate-700"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-500/10 rounded-xl">
          <QrCode className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">QR Code Generator</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="url-input" className="text-sm font-medium text-slate-300 ml-1">
            Enter URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="block w-full pl-10 pr-3 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-xl border border-slate-700 min-h-[300px] overflow-hidden relative">
          <AnimatePresence mode="wait">
            {qrDataUrl ? (
              <motion.div
                key="qr-code"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative group"
              >
                <img 
                  src={qrDataUrl} 
                  alt="QR Code" 
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-slate-500"
              >
                <QrCode className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Enter a link to generate a QR code</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm text-center"
          >
            {error}
          </motion.p>
        )}

        <button
          onClick={handleDownload}
          disabled={!qrDataUrl}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
            qrDataUrl
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
              : 'bg-slate-700 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Download className="w-5 h-5" />
          Download QR Code
        </button>
      </div>
    </motion.div>
  );
}
