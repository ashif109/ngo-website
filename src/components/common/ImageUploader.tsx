import React, { useState, useRef } from 'react';
import { Upload, Link, X, Loader2, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '../../services/api';

interface ImageUploaderProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
  label?: string;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentUrl,
  onUpload,
  label = 'Upload Image',
  className = ''
}) => {
  const [mode, setMode] = useState<'url' | 'file'>('url');
  const [urlInput, setUrlInput] = useState(currentUrl || '');
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [preview, setPreview] = useState(currentUrl || '');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;
    setPreview(urlInput.trim());
    onUpload(urlInput.trim());
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setUploading(true);
    setStatus('idle');
    setErrorMsg('');

    const result = await uploadImage(file);
    setUploading(false);

    if (result.success && result.url) {
      setPreview(result.url);
      setUrlInput(result.url);
      onUpload(result.url);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Upload failed. Check Cloudinary configuration.');
      // Still let admin use the URL input as fallback
    }
  };

  const clearImage = () => {
    setPreview('');
    setUrlInput('');
    onUpload('');
    setStatus('idle');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-[10px] font-black text-secondary-light uppercase tracking-wider">
          {label}
        </label>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative w-full h-40 rounded-sm overflow-hidden border border-white/10 bg-primary-dark/30">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={() => setPreview('')}
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {!preview && (
        <div className="w-full h-24 rounded-sm border-2 border-dashed border-white/10 flex items-center justify-center bg-primary-dark/20">
          <ImageIcon size={28} className="text-secondary-light/40" />
        </div>
      )}

      {/* Mode Toggle */}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-sm cursor-pointer transition-all ${
            mode === 'url' ? 'bg-accent text-white' : 'bg-white/5 text-secondary-light hover:bg-white/10'
          }`}
        >
          <Link size={10} className="inline mr-1" />URL
        </button>
        <button
          type="button"
          onClick={() => setMode('file')}
          className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-sm cursor-pointer transition-all ${
            mode === 'file' ? 'bg-accent text-white' : 'bg-white/5 text-secondary-light hover:bg-white/10'
          }`}
        >
          <Upload size={10} className="inline mr-1" />Upload File
        </button>
      </div>

      {/* URL Input */}
      {mode === 'url' && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 p-2.5 bg-primary-dark/40 border border-white/10 rounded-sm text-white text-xs outline-none focus:ring-1 focus:ring-orange-500"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-3 py-2 bg-accent hover:bg-orange-700 text-white rounded-sm text-[10px] font-black uppercase cursor-pointer transition-all"
          >
            Set
          </button>
        </div>
      )}

      {/* File Input */}
      {mode === 'file' && (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`file-upload-${label?.replace(/\s/g, '-')}`}
          />
          <label
            htmlFor={`file-upload-${label?.replace(/\s/g, '-')}`}
            className={`flex items-center justify-center gap-2 w-full p-3 border-2 border-dashed rounded-sm cursor-pointer transition-all ${
              uploading
                ? 'border-secondary/50 bg-accent/5'
                : 'border-white/10 bg-white/5 hover:border-secondary/50 hover:bg-accent/5'
            }`}
          >
            {uploading ? (
              <><Loader2 size={14} className="animate-spin text-orange-400" /> <span className="text-xs text-secondary-light font-bold">Uploading...</span></>
            ) : (
              <><Upload size={14} className="text-secondary-light" /> <span className="text-xs text-secondary-light font-bold">Choose image file (max 10MB)</span></>
            )}
          </label>
        </div>
      )}

      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-center gap-1 text-green-400 text-[10px] font-bold">
          <CheckCircle2 size={12} /> Image saved successfully
        </div>
      )}
      {status === 'error' && (
        <div className="text-red-300 text-[10px] font-bold space-y-1">
          <div className="flex items-center gap-1"><AlertCircle size={12} /> {errorMsg}</div>
          <div className="text-secondary-light font-normal">Tip: You can still paste an image URL directly instead.</div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
