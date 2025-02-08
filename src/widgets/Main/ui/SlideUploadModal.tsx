import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type SlideInfo } from '@/types';

interface SlideUploadModalProps {
  slides: SlideInfo[];
  onClose: () => void;
  onUpload: (slide: SlideInfo) => void;
}

export const SlideUploadModal = ({ slides, onClose, onUpload }: SlideUploadModalProps) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    try {
      // 여기에 실제 파일 업로드 로직 구현
      const newSlide: SlideInfo = {
        id: slides.length + 1,
        title,
        html_content: `<div class="relative h-[200px]"><img src="${preview}" alt="${title}" class="w-full h-full object-cover"/></div>`,
        image_url: preview
      };
      
      onUpload(newSlide);
      onClose();
    } catch (error) {
      console.error('Failed to upload slide:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">사진 업로드</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">제목</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="슬라이드 제목을 입력하세요"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">이미지</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          {preview && (
            <div className="mt-4">
              <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded" />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">
              업로드
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlideUploadModal; 