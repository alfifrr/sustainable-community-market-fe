"use client";
import React from "react";
import { SectionContainer } from "@/components/SectionContainer";

export default function ReturnsPage() {
    return (
        <main className="min-h-screen py-12 bg-gradient-to-b from-base-100 to-base-200">
            <SectionContainer className="!h-auto">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-8 text-center">Return Policy</h1>

                    <div className="mb-12">
                        <p className="text-lg text-center max-w-3xl mx-auto mb-8">
                            At Sustainable Community Market, we are committed to ensuring your satisfaction with every purchase.
                            Our return policy is designed to provide a fair and transparent process if you need to return a product.
                        </p>
                    </div>

                    {/* General Return Policy */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">General Policy</h2>
                        <div className="bg-base-100 p-6 rounded-xl shadow-md">
                            <p className="mb-4">
                                We accept returns within <strong>14 calendar days</strong> from the date of receipt for most products, with the following conditions:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Products must be in original condition, unused, and with all original labels and packaging</li>
                                <li>Proof of purchase (invoice or order number) must be included</li>
                                <li>Products must not be damaged or in a different condition from when received</li>
                                <li>For health and hygiene reasons, some products cannot be returned after the seal is broken</li>
                            </ul>
                            <p>
                                Please note that shipping costs for returns are borne by the buyer, unless the return is due to our error (defective product, wrong shipment, etc.).
                            </p>
                        </div>
                    </div>

                    {/* Product-Specific Policies */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Product-Specific Policies</h2>
                        <div className="space-y-6">
                            <div className="bg-base-100 p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-medium mb-3">Fresh Products & Food</h3>
                                <p className="mb-3">
                                    Due to their perishable nature, fresh products and food generally cannot be returned. However, if you receive products in unsatisfactory condition, please contact us within 24 hours of receipt with photos of the products to receive a refund or replacement.
                                </p>
                                <div className="bg-base-200 p-4 rounded-lg">
                                    <p className="text-sm italic">
                                        Examples: Wilted vegetables, spoiled fruit, or products damaged during shipping.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-base-100 p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-medium mb-3">Crafts & Household Products</h3>
                                <p className="mb-3">
                                    Craft and household products can be returned within 14 days if in original condition and unused. Custom products or those made specifically to order cannot be returned unless there is a manufacturing defect.
                                </p>
                                <div className="bg-base-200 p-4 rounded-lg">
                                    <p className="text-sm italic">
                                        Examples: Woven baskets, kitchen utensils made from natural materials, or sustainable home decor.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-base-100 p-6 rounded-xl shadow-md">
                                <h3 className="text-xl font-medium mb-3">Care Products & Cosmetics</h3>
                                <p className="mb-3">
                                    Care products and cosmetics can be returned only if the seal has not been opened and the product has not been used. After the seal is opened, products cannot be returned for health and hygiene reasons.
                                </p>
                                <div className="bg-base-200 p-4 rounded-lg">
                                    <p className="text-sm italic">
                                        Examples: Natural soaps, organic skin care products, or plant-based cosmetics.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Return Process */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
                        <div className="bg-base-100 p-6 rounded-xl shadow-md">
                            <ol className="list-decimal pl-6 space-y-4">
                                <li>
                                    <strong>Submit Return Request</strong>
                                    <p className="mt-1">Log into your account, visit "My Orders", select the order you want to return, and click "Request Return". Fill out the form with the reason for return and upload photos if necessary.</p>
                                </li>
                                <li>
                                    <strong>Wait for Approval</strong>
                                    <p className="mt-1">Our team will review your request within 1-2 business days and send return instructions if approved.</p>
                                </li>
                                <li>
                                    <strong>Ship the Product Back</strong>
                                    <p className="mt-1">Package the product securely in its original packaging or similar and ship it to the address provided in the instructions. We recommend using a trackable shipping service.</p>
                                </li>
                                <li>
                                    <strong>Product Inspection</strong>
                                    <p className="mt-1">After we receive the returned product, we will inspect it to ensure it meets the return requirements.</p>
                                </li>
                                <li>
                                    <strong>Refund Process</strong>
                                    <p className="mt-1">If the return is approved, the refund will be processed to your original payment method within 5-7 business days.</p>
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* Refund Options */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Refund Options</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h3 className="card-title">Refund to Original Payment Method</h3>
                                    <p>The refund amount will be credited back to the original payment method you used when making the purchase.</p>
                                    <p className="text-sm mt-2">Processing time: 5-7 business days</p>
                                </div>
                            </div>
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h3 className="card-title">Store Credit</h3>
                                    <p>Receive store credit to use on future purchases. This option provides a 5% bonus on the return value.</p>
                                    <p className="text-sm mt-2">Processing time: 1-2 business days</p>
                                </div>
                            </div>
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h3 className="card-title">Product Replacement</h3>
                                    <p>Request a replacement for the same or similar product if available. We will ship the replacement product after receiving your return.</p>
                                    <p className="text-sm mt-2">Processing time: 1-3 business days after product is received</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Non-Returnable Items */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
                        <div className="bg-base-100 p-6 rounded-xl shadow-md">
                            <p className="mb-4">Some products are not eligible for return or refund, including:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Fresh food products that are perishable after 24 hours of receipt</li>
                                <li>Products with security seals that have been opened or damaged</li>
                                <li>Custom products or those ordered according to your specifications</li>
                                <li>Gift cards or vouchers</li>
                                <li>Products that have been used or damaged due to user error</li>
                                <li>Products purchased with large discounts (more than 50%) unless defective</li>
                                <li>Digital products or downloads</li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-base-100 p-8 rounded-xl shadow-lg text-center">
                        <h2 className="text-2xl font-semibold mb-4">Need Help with Returns?</h2>
                        <p className="mb-6">
                            If you have questions about our return policy or need assistance with the return process,
                            our customer service team is ready to help you.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href="/contact" className="btn btn-primary">
                                Contact Us
                            </a>
                            <a href="/faq" className="btn btn-outline">
                                View FAQ
                            </a>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </main>
    );
}