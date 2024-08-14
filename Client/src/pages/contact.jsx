import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/img/5.png'; // Import your image

const ContactForm = () => {
  const [formData, setFormData] = useState({
    national_id: '',
    message: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/contact', {
        national_id: "100782462747",
        message: formData.message,
      });
      setResponseMessage(response.data.message);
      setErrorMessage('');
     
      setFormData({ national_id: '100782462747', message: 'kkkkk' });
    } catch (error) {
      setErrorMessage('Failed to send the message. Please try again later.');
      setResponseMessage('');
    }
  };

  return (
    <div
      className="min-h-screen py-6 flex flex-col justify-center sm:py-12"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-[#A3C7C1] to-[#7B9F99] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="text-white relative px-4 py-10 bg-[#CDF0EA] bg-opacity-80 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="text-center pb-6">
            <h1 className="text-3xl">تواصل معنا</h1>
            <p className="text-[#556F6A]">الرجاء ادخال رسالتك هنا</p>
          </div>

          <form onSubmit={handleSubmit}>
           
            <textarea
              className="shadow mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 text-[#556F6A] leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ادخل النص هنا.."
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{ height: '121px' }}
            ></textarea>

            <div className="flex justify-between">
              <input
                className="shadow bg-[#0E7490] hover:bg-[#A3C7C1] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                value="ارسل ➤"
              />
            </div>
          </form>

          {/* Display response or error messages */}
          {responseMessage && <p className="text-green-500 mt-4">{responseMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

          <a
            href="https://veilmail.io/e/FkKh7o"
            className="font-medium text-[#556F6A] dark:text-[#7B9F99] hover:underline"
          >
            Or click here to send for email address
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
