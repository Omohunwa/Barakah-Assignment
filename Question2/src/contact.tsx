import React from "react";

type ContactFormProps = {
  formData: {
    name: string;
    phone: string;
    persons: number;
    date: string;
    time: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirm: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ formData, handleChange, handleConfirm }) => (
  <div>
    <form onSubmit={(e) => {
      e.preventDefault();
      handleConfirm();
    }
    }
      className="contact-form">
      <h2>Contact details</h2>
      <div className="summary">
        You are making a reservation for{" "}
        <strong>{formData.persons} persons</strong>, on{" "}
        <strong>{formData.date}</strong> at <strong>{formData.time}</strong>
      </div>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <button

      >
        Confirm reservation
      </button>
    </form>

  </div>
);

export default ContactForm;
