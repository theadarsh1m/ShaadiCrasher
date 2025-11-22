import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UploadCloud, Loader2, X } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreatePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const uploadToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", CLOUD_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Cloudinary upload failed");

      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload an image!");

    setLoading(true);
    try {
      const formData = new FormData(e.target);

      const imageUrl = await uploadToCloudinary(file);

      await addDoc(collection(db, "invites"), {
        venue: formData.get("venue"),
        date: formData.get("date"),
        imageUrl: imageUrl,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      navigate("/feed");
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <div className="flex items-center mb-6 text-rose-600 font-semibold">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/feed")}
            className="mr-2 hover:bg-rose-50 text-rose-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          ADD NEW INVITE
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="venue">Venue Location</Label>
            <Input
              name="venue"
              id="venue"
              placeholder="e.g. Grand Palace, Mumbai"
              required
              className="focus-visible:ring-rose-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Wedding Date</Label>
            <Input
              type="date"
              name="date"
              id="date"
              required
              className="focus-visible:ring-rose-500 block w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Image</Label>
            {!preview ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-32 cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition">
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  Click to upload invite
                </span>
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
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="text-white w-8 h-8 bg-rose-600 rounded-full p-1" />
                </button>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-lg py-6 cursor-pointer"
            disabled={!file || loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Post Invite"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
