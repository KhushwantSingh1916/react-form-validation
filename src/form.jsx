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

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true);
      setFormData({
        userId: "",
        password: "",
        name: "",
        country: "",
        zipCode: "",
        email: "",
        sex: "",
        language: []
      });
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
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <form className="max-w-xl mx-auto bg-white p-8 shadow-2xl rounded-xl space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Registration Form</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.userId && <p className="mt-1 text-red-500 text-sm">{errors.userId}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a country</option>
            <option value="USA">USA</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
          </select>
          {errors.country && <p className="mt-1 text-red-500 text-sm">{errors.country}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">ZIP Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.zipCode && <p className="mt-1 text-red-500 text-sm">{errors.zipCode}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Sex</label>
          <div className="mt-2 space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sex"
                value="Male"
                checked={formData.sex === "Male"}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sex"
                value="Female"
                checked={formData.sex === "Female"}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Female</span>
            </label>
          </div>
          {errors.sex && <p className="mt-1 text-red-500 text-sm">{errors.sex}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Language</label>
          <div className="mt-2 space-x-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="language"
                value="English"
                checked={formData.language.includes("English")}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">English</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="language"
                value="Non English"
                checked={formData.language.includes("Non English")}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Non English</span>
            </label>
          </div>
          {errors.language && <p className="mt-1 text-red-500 text-sm">{errors.language}</p>}
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      >
        Register
      </button>
    </form>
    {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Successful!</h3>
              <p className="text-sm text-gray-500 mb-6">Your account has been successfully created.</p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-150"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
