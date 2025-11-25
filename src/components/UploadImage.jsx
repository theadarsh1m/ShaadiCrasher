import React, { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function UploadImage({ setFile }) {
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  return (
    <div className="space-y-2">
      <Label>Upload Image</Label>
      {!preview ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-32 cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition">
          <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Click to upload invite</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative h-48 rounded-md overflow-hidden group border">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
              type="button"
              size="icon"
              variant="destructive"
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
            </div>
        </div>
      )}
    </div>
  );
}
