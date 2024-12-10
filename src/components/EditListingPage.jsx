import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditListingPage = () => {
  const { id } = useParams(); // Extract listing ID from URL
  const [listing, setListing] = useState({
    title: '',
    description: '',
    price: '',
    country: '',
    location: '',
    image: null
  });
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [formData, setFormData] = useState(new FormData());
  const navigate = useNavigate();

  // Fetch the listing data on component mount
  useEffect(() => {
    axios.get(`http://localhost:8080/api/listings/${id}`)
      .then(response => {
        setListing(response.data);
        setOriginalImageUrl(response.data.imageUrl);  // Assuming response contains imageUrl
      })
      .catch(error => {
        console.error('Error fetching listing data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prevFormData => {
        const updatedFormData = new FormData(prevFormData);
        updatedFormData.set('listing[image]', files[0]);
        return updatedFormData;
      });
    } else {
      setListing(prevListing => ({
        ...prevListing,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedListing = { ...listing };

    // Add fields to formData
    Object.keys(updatedListing).forEach(key => {
      formData.set(`listing[${key}]`, updatedListing[key]);
    });

    axios.put(`http://localhost:8080/api/listings/${id}`, formData)
      .then(response => {
        alert('Listing updated successfully');
        navigate(`/listings/${id}`); // Redirect to the individual listing page
      })
      .catch(error => {
        console.error('Error updating listing:', error);
      });
  };

  return (
    <div className="row mt-3">
      <div className="col-8 offset-2">
        <h3 className="my-3">Edit Your Listing</h3>
        <form onSubmit={handleSubmit} className="needs-validation" encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              name="title"
              value={listing.title}
              onChange={handleChange}
              type="text"
              className="form-control"
              required
            />
            <div className="valid-feedback">Title looks good!</div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={listing.description}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please enter a short description</div>
          </div>

          <div className="mb-3">
            Original Listing Image: <br />
            <img src={originalImageUrl} alt="Original Listing" />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">Upload New Image</label>
            <input
              name="image"
              type="file"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                name="price"
                value={listing.price}
                onChange={handleChange}
                type="number"
                className="form-control"
                required
              />
              <div className="invalid-feedback">Price should be valid</div>
            </div>

            <div className="mb-3 col-md-8">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                name="country"
                value={listing.country}
                onChange={handleChange}
                type="text"
                className="form-control"
                required
              />
              <div className="invalid-feedback">Country name should be valid</div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              name="location"
              value={listing.location}
              onChange={handleChange}
              type="text"
              className="form-control"
              required
            />
            <div className="invalid-feedback">Location should be valid</div>
          </div>

          <button type="submit" className="btn btn-dark edit-btn mt-3">Edit</button>
        </form>
      </div>
    </div>
  );
};

export default EditListingPage;
