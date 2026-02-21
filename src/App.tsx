import QRCodeGenerator from './components/QRCodeGenerator';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Link to <span className="text-indigo-400">QR Code</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Generate high-quality QR codes for your links instantly. 
            Dark mode enabled for comfortable viewing.
          </p>
        </div>
        
        <QRCodeGenerator />
        
        <footer className="mt-16 text-center text-slate-600 text-sm">
          <p>Generated QR codes are downloadable as PNG images.</p>
        </footer>
      </div>
    </div>
  );
}
