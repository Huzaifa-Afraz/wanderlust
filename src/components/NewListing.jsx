// import React, { useState } from "react";
// import axios from "axios";

// const NewListing = () => {
//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         image: null,
//         price: "",
//         country: "",
//         location: "",
//     });

//     const handleChange = (e) => {
//         const { name, value, type, files } = e.target;
//         setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const form = new FormData();
//         form.append("title", formData.title);
//         form.append("description", formData.description);
//         form.append("image", formData.image);
//         form.append("price", formData.price);
//         form.append("country", formData.country);
//         form.append("location", formData.location);

//         try {
//             await axios.post("http://localhost:8080/listings", form, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             alert("Listing added successfully!");
//             setFormData({
//                 title: "",
//                 description: "",
//                 image: null,
//                 price: "",
//                 country: "",
//                 location: "",
//             }); // Reset form
//         } catch (error) {
//             console.error("Error creating listing:", error);
//             alert("An error occurred while creating the listing.");
//         }
//     };

//     return (
//         <div className="row mt-3">
//             <div className="col-8 offset-2">
//                 <h3 className="mt-3 mb-2">Create a New Listing</h3>
//                 <form
//                     onSubmit={handleSubmit}
//                     className="needs-validation"
//                     noValidate
//                     encType="multipart/form-data"
//                 >
//                     <div className="mb-3">
//                         <label htmlFor="title" className="form-label">Title</label>
//                         <input
//                             id="title"
//                             name="title"
//                             type="text"
//                             className="form-control"
//                             placeholder="Add a catchy title"
//                             value={formData.title}
//                             onChange={handleChange}
//                             required
//                         />
//                         <div className="valid-feedback">Title looks good!</div>
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="description" className="form-label">Description</label>
//                         <textarea
//                             id="description"
//                             name="description"
//                             className="form-control"
//                             value={formData.description}
//                             onChange={handleChange}
//                             required
//                         />
//                         <div className="invalid-feedback">Please enter a short description</div>
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="image" className="form-label">Upload Listing Image</label>
//                         <input
//                             id="image"
//                             name="image"
//                             type="file"
//                             className="form-control"
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className="row">
//                         <div className="mb-3 col-md-4">
//                             <label htmlFor="price" className="form-label">Price</label>
//                             <input
//                                 id="price"
//                                 name="price"
//                                 placeholder="1200"
//                                 type="text"
//                                 className="form-control"
//                                 value={formData.price}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             <div className="invalid-feedback">Price should be valid</div>
//                         </div>

//                         <div className="mb-3 col-md-8">
//                             <label htmlFor="country" className="form-label">Country</label>
//                             <input
//                                 id="country"
//                                 name="country"
//                                 placeholder="India"
//                                 type="text"
//                                 className="form-control"
//                                 value={formData.country}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             <div className="invalid-feedback">Country name should be valid</div>
//                         </div>
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="location" className="form-label">Location</label>
//                         <input
//                             id="location"
//                             name="location"
//                             placeholder="Jaipur, Rajasthan"
//                             type="text"
//                             className="form-control"
//                             value={formData.location}
//                             onChange={handleChange}
//                             required
//                         />
//                         <div className="invalid-feedback">Location should be valid</div>
//                     </div>

//                     <button className="btn btn-dark my-3 add-btn" type="submit">Add</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default NewListing;




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const NewListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    country: '',
    image: null, // File input for image
  });
const navigate=useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Store the image file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userToken = localStorage.getItem('token'); // Get the token from localStorage
    if (!userToken) {
      alert('You must be logged in to create a listing.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:8080/api/listings', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
          Authorization: `Bearer ${userToken}`, // Send the token in the Authorization header
        },
      });
      setSuccessMessage('Listing created successfully!');
      navigate('/listings')
      console.log('Listing created:', response.data);
    } catch (error) {
      console.error('Error creating listing:', error);
      console.log(error)
      setErrorMessage('Failed to create the listing. Please try again.');
    }
  };

  return (
    <div className="row mt-3">
      <div className="col-8 offset-2">
        <h3 className="mt-3 mb-2">Create a New Listing</h3>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              placeholder="Add a catchy title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Title looks good!</div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please enter a short description</div>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Listing Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                id="price"
                name="price"
                placeholder="1200"
                type="text"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Price should be valid</div>
            </div>

            <div className="mb-3 col-md-8">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                id="country"
                name="country"
                placeholder="India"
                type="text"
                className="form-control"
                value={formData.country}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Country name should be valid</div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              id="location"
              name="location"
              placeholder="Jaipur, Rajasthan"
              type="text"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Location should be valid</div>
          </div>

          <button className="btn btn-dark my-3 add-btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewListing;
