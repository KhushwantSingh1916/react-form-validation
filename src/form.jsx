import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    name: "",
    country: "",
    zipCode: "",
    email: "",
    sex: "",
    language: []
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.userId || formData.userId.length < 5 || formData.userId.length > 12) {
      newErrors.userId = "Required and must be of length 5 to 12.";
    }

    if (!formData.password || formData.password.length < 7 || formData.password.length > 12) {
      newErrors.password = "Required and must be of length 7 to 12.";
    }

    if (!formData.name || !/^[A-Za-z]+$/.test(formData.name)) {
      newErrors.name = "Required and must contain only alphabets.";
    }

    if (!formData.country) {
      newErrors.country = "Required. Must select a country.";
    }

    if (!formData.zipCode || !/^[0-9]+$/.test(formData.zipCode)) {
      newErrors.zipCode = "Required. Must be numeric only.";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Required. Must be a valid email.";
    }

    if (!formData.sex) {
      newErrors.sex = "Required.";
    }

    if (formData.language.length === 0) {
      newErrors.language = "Required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          language: checked ? [...prev.language, value] : prev.language.filter((lang) => lang !== value),
        };
      } else {
        return { ...prev, [name]: value };
      }
    });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  return (
    <form className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-center mb-4">Registration Form</h2>

      <label className="block mb-2">User ID:</label>
      <input type="text" name="userId" value={formData.userId} onChange={handleChange} className="w-full p-2 border rounded" />
      {errors.userId && <p className="text-red-500 text-sm">{errors.userId}</p>}

      <label className="block mt-3 mb-2">Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

      <label className="block mt-3 mb-2">Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <label className="block mt-3 mb-2">Country:</label>
      <select name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Select a country</option>
        <option value="USA">USA</option>
        <option value="India">India</option>
      </select>
      {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}

      <label className="block mt-3 mb-2">ZIP Code:</label>
      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full p-2 border rounded" />
      {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}

      <label className="block mt-3 mb-2">Email:</label>
      <input type="text" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <label className="block mt-3 mb-2">Sex:</label>
      <div className="flex gap-4">
        <label><input type="radio" name="sex" value="Male" checked={formData.sex === "Male"} onChange={handleChange} /> Male</label>
        <label><input type="radio" name="sex" value="Female" checked={formData.sex === "Female"} onChange={handleChange} /> Female</label>
      </div>
      {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}

      <label className="block mt-3 mb-2">Language:</label>
      <div className="flex gap-4">
        <label><input type="checkbox" name="language" value="English" checked={formData.language.includes("English")} onChange={handleChange} /> English</label>
        <label><input type="checkbox" name="language" value="Non English" checked={formData.language.includes("Non English")} onChange={handleChange} /> Non English</label>
      </div>
      {errors.language && <p className="text-red-500 text-sm">{errors.language}</p>}

      <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 mt-4 rounded">Submit</button>
    </form>
  );
};

export default RegistrationForm;
