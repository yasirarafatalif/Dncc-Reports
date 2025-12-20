import React from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
   
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <title>Contact</title>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Have a question, suggestion, or need help with reporting a public issue?
            Reach out to us — we are here to help improve municipal services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Get in Touch</h2>

            <div className="space-y-4 text-gray-600">
              <div>
                <p className="font-medium text-gray-700">Address</p>
                <p>Faidabad Dakshinkhan, Uttara , Dhaka-1230</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Email</p>
                <p>yasirarafataif1@gmail.com</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Phone</p>
                <p>+880 1851973300</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Working Hours</p>
                <p>Sunday – Thursday, 9:00 AM – 5:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Send Us a Message</h2>

            <form
            onClick={()=> toast.success("You Massage Has benn set")}
            className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Contact;