import { useState } from "react";

const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "medical system"); // your unsigned preset name

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dmxa7h4vt/image/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      console.log("Cloudinary response:", result);
      setImageUrl(result.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" style={{ width: "200px" }} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
