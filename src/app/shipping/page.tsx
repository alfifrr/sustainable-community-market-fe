"use client";

import React from "react";
import { SectionContainer } from "@/components/SectionContainer";

export default function ShippingPage() {
  return (
    <main className="min-h-screen">
      <SectionContainer className="!h-auto">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Shipping Information
          </h1>

          {/* General Shipping Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              General Shipping Information
            </h2>
            <p className="mb-4">
              At Sustainable Community Market, we strive to deliver your
              products efficiently while minimizing our environmental impact. We
              partner with eco-conscious shipping providers and optimize our
              packaging to reduce waste.
            </p>
            <p className="mb-4">
              All orders are processed within 1-2 business days. Once shipped,
              you will receive a confirmation email with tracking information.
            </p>
          </section>

          {/* Shipping Methods */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Shipping Methods</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Shipping Method</th>
                    <th>Estimated Delivery Time</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Standard Shipping</td>
                    <td>3-5 business days</td>
                    <td>Rp75.000 (Free for orders over Rp450.000)</td>
                  </tr>
                  <tr>
                    <td>Express Shipping</td>
                    <td>1-2 business days</td>
                    <td>Rp150.000</td>
                  </tr>
                  <tr>
                    <td>Same-Day Delivery</td>
                    <td>Same day (order before 11 AM)</td>
                    <td>Rp225.000 (Available only in select cities)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* International Shipping */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              International Shipping
            </h2>
            <p className="mb-4">
              We currently offer international shipping to select countries.
              International orders typically take 7-14 business days to arrive,
              depending on the destination and customs processing times.
            </p>
            <p className="mb-4">
              Please note that international orders may be subject to import
              duties and taxes, which are the responsibility of the recipient.
            </p>
          </section>

          {/* Tracking Your Order */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Tracking Your Order</h2>
            <p className="mb-4">
              Once your order ships, you will receive a tracking number via
              email. You can also track your order by logging into your account
              and visiting the &quot;My Orders&quot; section.
            </p>
            <p className="mb-4">
              If you have any questions about your shipment, please contact our
              customer service team.
            </p>
          </section>

          {/* Sustainable Packaging */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Sustainable Packaging
            </h2>
            <p className="mb-4">
              We are committed to reducing our environmental footprint. All our
              packaging materials are either recyclable, biodegradable, or made
              from recycled content. We avoid plastic whenever possible and use
              minimal packaging to reduce waste.
            </p>
            <p className="mb-4">
              We encourage our customers to reuse or recycle packaging materials
              whenever possible.
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-base-100 p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="mb-6">
              If you have any questions about shipping or need assistance with
              your order, our customer service team is here to help.
            </p>
            <a href="/contact" className="btn btn-primary">
              Contact Us
            </a>
          </section>
        </div>
      </SectionContainer>
    </main>
  );
}
