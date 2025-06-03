import React from "react";
import './App.css'

type BookingFormProps = {
  formData: {
    persons: number | string;
    date: string;
    time: string;
  };
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleNext: React.FormEventHandler<HTMLFormElement>;
}

const BookingForm: React.FC<BookingFormProps> = ({ formData, handleChange, handleNext }) => (
  <div className="booking-form">
    <h2>Book a table</h2>
    <p>This is where you'll add the details of your booking</p>

    <form  onSubmit={handleNext}>
      <div className="book">
        <label className="booking-label">People</label>
        <input
          type="number"
          name="persons"
          value={formData.persons}
          onChange={handleChange}
          placeholder=" 2 persons"
          className="booking-input"
          min="1"
          required
        />
      </div>

      <div className="book">
        <label className="booking-label">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="booking-input"
          required
        />
      </div>

      <div className="book">
        <label className="booking-label">Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="booking-input"
          required
        />
      </div>
      <button type="submit">Book now</button>
    </form>

    {/* Optionally, move the button inside the form to trigger onSubmit */}
    
  </div>
);

export default BookingForm;
