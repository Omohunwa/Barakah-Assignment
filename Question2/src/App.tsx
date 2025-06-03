import { useState } from "react";
import BookingForm from "./booking";
import ContactForm from "./contact";


const RestaurantBookingForm = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    persons: 1,
    date: "",
    time: "",
    name: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "persons" ? Number(value) : value
    }));
  };

  const handleNext = () => {
    setPage(2);
  };

  const handleConfirm = () => {
    console.log("Booking Details:", formData);
  };

  return (
    <div>
      {page === 1 ? (
        <BookingForm
          formData={formData}
          handleChange={handleChange}
          handleNext={handleNext}
        />
      ) : (
        <ContactForm
          formData={formData}
          handleChange={handleChange}
          handleConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default RestaurantBookingForm;