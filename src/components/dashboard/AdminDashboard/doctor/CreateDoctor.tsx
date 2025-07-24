import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useCreateDoctorMutation } from "../../../../Features/doctor/doctorAPI";

const CreateDoctor = () => {
  const [createDoctor, { isLoading }] = useCreateDoctorMutation({
    fixedCacheKey: "createDoctor",
  });

  const [formData, setFormData] = useState<{
    user_id: string;
    first_name: string;
    last_name: string;
    specialization: string;
    contact_phone: string;
    available_days: string;
  }>({
    user_id: "",
    first_name: "",
    last_name: "",
    specialization: "",
    contact_phone: "",
    available_days: "",
  });

  // Image state
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.user_id || !formData.first_name || !formData.last_name) {
        toast.error("User ID, First Name and Last Name are required.");
        return;
      }

      // default image
      let image_url =
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

      // if an image is selected, upload to Cloudinary
      if (image) {
        setIsUploading(true);
        const formDataImg = new FormData();
        formDataImg.append("file", image);
        formDataImg.append("upload_preset", "medical system"); // use your preset

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dmxa7h4vt/image/upload",
          formDataImg
        );

        setIsUploading(false);

        if (response.data && response.data.secure_url) {
          image_url = response.data.secure_url;
        } else {
          toast.error("Image upload failed. Please try again.");
          return;
        }
      }

      await createDoctor({
        user_id: Number(formData.user_id),
        first_name: formData.first_name,
        last_name: formData.last_name,
        specialization: formData.specialization || undefined,
        contact_phone: formData.contact_phone || undefined,
        available_days: formData.available_days || undefined,
        image_url, // ✅ include the image url
      }).unwrap();

      toast.success("Doctor created successfully!");
      (document.getElementById("create_doctor_modal") as HTMLDialogElement)?.close();
      setFormData({
        user_id: "",
        first_name: "",
        last_name: "",
        specialization: "",
        contact_phone: "",
        available_days: "",
      });
      setImage(null);
    } catch (error) {
      setIsUploading(false);
      console.error("Error creating doctor:", error);
      toast.error("Failed to create doctor. Please try again.");
    }
  };

  return (
    <dialog id="create_doctor_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create Doctor</h3>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="number"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            placeholder="User ID (must exist in Users table)"
            className="input input-bordered text-black"
            required
          />

          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="input input-bordered text-black"
            required
          />

          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="input input-bordered text-black"
            required
          />

          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Specialization (optional)"
            className="input input-bordered text-black"
          />

          <input
            type="text"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            placeholder="Contact Phone (optional)"
            className="input input-bordered text-black"
          />

          <input
            type="text"
            name="available_days"
            value={formData.available_days}
            onChange={handleChange}
            placeholder="Available Days (e.g. Mon,Tue,Wed)"
            className="input input-bordered text-black"
          />

          
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
              />
            )}
          </div>

          <div className="modal-action flex gap-4 mt-6">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || isUploading}
            >
              {isLoading || isUploading ? (
                <>
                  <span className="loading loading-spinner text-primary" /> Saving...
                </>
              ) : (
                "Create Doctor"
              )}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() =>
                (document.getElementById("create_doctor_modal") as HTMLDialogElement)?.close()
              }
              disabled={isLoading || isUploading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateDoctor;
