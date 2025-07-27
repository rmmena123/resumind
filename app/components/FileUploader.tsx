import { useCallback, useState, useEffect } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { formatSize, cn } from "~/lib/utils";

interface FileUploaderProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUploader = ({ file, onFileChange }: FileUploaderProps) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setError(null);

      if (fileRejections.length > 0) {
        const firstError = fileRejections[0].errors[0];

        if (firstError.code === "file-too-large") {
          setError("Arquivo muito grande. O máximo é 20 MB.");
        } else if (firstError.code === "file-invalid-type") {
          setError("Tipo de arquivo inválido. Apenas PDFs são aceitos.");
        } else {
          setError("Erro ao carregar o arquivo.");
        }

        onFileChange(null);

        return;
      }

      onFileChange(acceptedFiles[0] || null);
    },
    [onFileChange]
  );

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const maxFileSize = 20 * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
    disabled: !!file,
  });

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onFileChange(null);
  };

  return (
    <div className="w-full gradient-border">
      <div
        {...getRootProps()}
        className={cn(
          "uploader-drag-area",
          isDragActive && "bg-blue-50 border-blue-400",
          !file && "cursor-pointer",
          file && "cursor-default"
        )}
      >
        <input {...getInputProps()} />

        <div className="space-y-4">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="PDF Icon" className="size-10" />

              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Remove file"
                className="p-2 cursor-pointer"
                onClick={handleRemoveFile}
              >
                <img src="/icons/cross.svg" alt="" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                <img
                  src="/icons/info.svg"
                  alt="Upload icon"
                  className="size-20"
                />
              </div>

              <p className="text-lg text-gray-500">
                <span className="font-semibold">Clique para carregar</span> ou
                arraste e solte
              </p>

              <p className="text-lg text-gray-500">PDF (máx 20 MB)</p>
            </div>
          )}
          {error && (
            <p className="text-sm text-red-600 text-center animate-in fade-in">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
