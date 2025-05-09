"use client";

import React from "react";
import { SectionContainer } from "@/components/SectionContainer";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <SectionContainer className="!h-auto">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <div className="bg-base-100 p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input input-bordered w-full"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input input-bordered w-full"
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="input input-bordered w-full"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="textarea textarea-bordered w-full"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-base-100 p-6 rounded-xl shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-sm">
                        Jl. Melawai Raya No. 45, Blok M, Jakarta Selatan,
                        Indonesia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm">
                        info@sustainablecommunitymarket.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-sm">+62 21 1234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Business Hours</h3>
                      <p className="text-sm">
                        Monday - Friday: 9:00 AM - 5:00 PM
                      </p>
                      <p className="text-sm">Saturday: 10:00 AM - 2:00 PM</p>
                      <p className="text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-base-100 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
                <div className="flex space-x-4">
                  <a href="#" className="btn btn-circle btn-outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a href="#" className="btn btn-circle btn-outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="btn btn-circle btn-outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <div className="rounded-xl overflow-hidden h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4702133886!2d106.7995555!3d-6.2457777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTQnNDQuOCJTIDEwNsKwNDgnMDYuNCJF!5e0!3m2!1sen!2sid!4v1623456789012!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="collapse collapse-plus bg-base-100 shadow-md">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  How quickly will I receive a response to my inquiry?
                </div>
                <div className="collapse-content">
                  <p>
                    We strive to respond to all inquiries within 24 hours during
                    business days. For urgent matters, please contact us by
                    phone.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100 shadow-md">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  Can I visit your physical store or office?
                </div>
                <div className="collapse-content">
                  <p>
                    Yes, you are welcome to visit our office during business
                    hours. We recommend scheduling an appointment in advance to
                    ensure we can provide you with the best assistance.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100 shadow-md">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  How can I become a partner or supplier?
                </div>
                <div className="collapse-content">
                  <p>
                    We&apos;re always looking for sustainable partners and
                    suppliers. Please contact us through the form on this page
                    with details about your business and products, and our
                    partnership team will get back to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
