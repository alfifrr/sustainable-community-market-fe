"use client";
import React from "react";
import { SectionContainer } from "@/components/SectionContainer";

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqItems: FAQItem[] = [
    {
        question: "How do I create an account on Sustainable Community Market?",
        answer: "To create an account, click the 'Sign Up' button in the top right corner of the page. Fill out the registration form with the requested information, including name, email, and password. After registering, you will receive a confirmation email to verify your account.",
        category: "Account & Registration"
    },
    {
        question: "How can I change my profile information?",
        answer: "After logging into your account, click your username in the top right corner and select 'Profile'. On the profile page, you can edit your personal information, change your password, and manage your notification preferences.",
        category: "Account & Registration"
    },
    {
        question: "How do I search for products in the marketplace?",
        answer: "You can search for products using the search box at the top of the page. Enter keywords or product names you're looking for. You can also browse products by category using the navigation menu or filters available on the search page.",
        category: "Shopping"
    },
    {
        question: "How do I add products to my cart?",
        answer: "To add products to your cart, visit the product detail page and click the 'Add to Cart' button. You can adjust the quantity before adding it. Added products will appear in your shopping cart, which can be accessed by clicking the cart icon in the top right corner.",
        category: "Shopping"
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept various payment methods, including credit/debit cards (Visa, Mastercard), bank transfers, e-wallets (GoPay, OVO, DANA), and payments through convenience stores (Indomaret, Alfamart). All transactions are processed through secure payment gateways.",
        category: "Payment"
    },
    {
        question: "Are there shipping fees?",
        answer: "Shipping fees vary depending on the delivery location, package weight, and chosen shipping method. Shipping costs will be displayed on the checkout page before you complete your purchase. We offer free shipping for purchases over $30.",
        category: "Shipping"
    },
    {
        question: "How long does shipping take?",
        answer: "Shipping times vary depending on your location and the shipping method chosen. Local deliveries typically take 1-2 business days, while inter-city shipments may take 3-5 business days. You can track your shipment status through the 'My Orders' page in your account.",
        category: "Shipping"
    },
    {
        question: "What is your return policy?",
        answer: "We accept returns within 14 days of receipt for most products, provided they are in original condition and unused. Some products such as fresh food and perishable items may not be eligible for return. For more information, please visit our 'Return Policy' page.",
        category: "Returns & Refunds"
    },
    {
        question: "How do I process a return?",
        answer: "To process a return, log into your account and visit 'My Orders'. Select the order you wish to return and click 'Request Return'. Follow the instructions to complete the return form. After we receive and inspect the returned item, a refund will be processed within 5-7 business days.",
        category: "Returns & Refunds"
    },
    {
        question: "How do you ensure the products sold are sustainable?",
        answer: "We have a strict verification process for all producers and products on our marketplace. We evaluate farming practices, production methods, material usage, and environmental impact. Only producers who meet our sustainability standards are allowed to sell on our platform. We also conduct regular audits to ensure ongoing compliance.",
        category: "Sustainability"
    },
    {
        question: "How can I become a seller on your marketplace?",
        answer: "To become a seller, click 'Become a Seller' in our website footer and fill out the application form. We will review your application and conduct verification to ensure your practices align with our sustainability standards. This process typically takes 5-7 business days. Once approved, you will receive guidance on how to set up your store and upload your products.",
        category: "Sellers"
    },
    {
        question: "How can I contact customer service?",
        answer: "You can contact our customer service team via email at support@sustainablecommunitymarket.com, through the contact form on our 'Contact Us' page, or via live chat available on our website during business hours (Monday-Friday, 9:00 AM-5:00 PM). We strive to respond to all inquiries within 24 hours.",
        category: "Customer Service"
    }
];

export default function FAQPage() {
    const categories = [
        "Account & Registration",
        "Shopping",
        "Payment",
        "Shipping",
        "Returns & Refunds",
        "Sustainability",
        "Sellers",
        "Customer Service"
    ];

    return (
        <main className="min-h-screen py-12 bg-gradient-to-b from-base-100 to-base-200">
            <SectionContainer className="!h-auto">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

                    <div className="mb-12">
                        <p className="text-lg text-center max-w-3xl mx-auto mb-8">
                            Find answers to common questions about Sustainable Community Market,
                            our products, purchasing process, shipping, and return policies.
                        </p>
                    </div>

                    {/* FAQ Categories */}
                    <div className="mb-12">
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {categories.map((category, index) => (
                                <a
                                    key={index}
                                    href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="btn btn-outline btn-sm"
                                >
                                    {category}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Items by Category */}
                    {categories.map((category, categoryIndex) => (
                        <div
                            key={categoryIndex}
                            id={category.toLowerCase().replace(/\s+/g, '-')}
                            className="mb-12"
                        >
                            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-base-300">{category}</h2>
                            <div className="space-y-6">
                                {faqItems
                                    .filter(item => item.category === category)
                                    .map((item, itemIndex) => (
                                        <div key={itemIndex} className="collapse collapse-plus bg-base-100 shadow-md">
                                            <input type="checkbox" />
                                            <div className="collapse-title text-xl font-medium">
                                                {item.question}
                                            </div>
                                            <div className="collapse-content">
                                                <p>{item.answer}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}

                    {/* Contact Section */}
                    <div className="bg-base-100 p-8 rounded-xl shadow-lg text-center">
                        <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
                        <p className="mb-6">
                            If you couldn't find the answer you're looking for, don't hesitate to contact our support team.
                            We're ready to help you with any questions or issues.
                        </p>
                        <a href="/contact" className="btn btn-primary">
                            Contact Us
                        </a>
                    </div>
                </div>
            </SectionContainer>
        </main>
    );
}