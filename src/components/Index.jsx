import React, { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
    const [allListings, setAllListings] = useState([]);
    const [showTax, setShowTax] = useState(false);

    // Fetch listings data from the API
    useEffect(() => {
        axios.get("http://localhost:8080/api/listings") // Replace with your API endpoint for fetching listings
            .then(response => {
                setAllListings(response.data);
            })
            .catch(error => {
                console.error("Error fetching listings:", error);
            });
    }, []);
console.log(allListings)
    // Handle tax toggle change
    const handleTaxToggle = () => {
        setShowTax(!showTax);
    };

    return (
        <div className="container">
            <div id="filters" style={styles.filters}>
                <div className="tax-toggle" style={styles.taxToggle}>
                    <div className="form-check-reverse form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            onChange={handleTaxToggle}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                            Display total after taxes
                        </label>
                    </div>
                </div>
            </div>

            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-3">
                {allListings.map((listing) => (
                    <a key={listing._id} href={`/listings/${listing._id}`} className="listing-link">
                        <div className="card col listing-card">
                            <img
                                src={listing.image.url}
                                className="card-img-top"
                                alt="listing_image"
                                style={{ height: "20rem" }}
                            />
                            <div className="card-img-overlay"></div>
                            <div className="card-body">
                                <p className="card-text">
                                    <b>{listing.title}</b> <br />
                                    &#8377; {listing.price.toLocaleString("en-IN")} / night
                                    {showTax && <i className="tax-info"> &nbsp; &nbsp;+18% GST</i>}
                                </p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

// Inline styles for React
const styles = {
    filters: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
    },
    taxToggle: {
        border: "1px solid black",
        borderRadius: "1rem",
        height: "3.25rem",
        padding: "1rem",
        marginLeft: "3rem",
        display: "flex",
        alignItems: "center",
    },
};

export default Index;
