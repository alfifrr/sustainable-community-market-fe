"use client";
import React from "react";
import { SectionContainer } from "@/components/SectionContainer";

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen py-12 bg-gradient-to-b from-base-100 to-base-200">
            <SectionContainer className="!h-auto">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-8 text-center">Cookie Policy</h1>

                    <div className="prose prose-lg max-w-none">

                        <h2 className="text-2xl font-semibold mt-8 mb-4">What Are Cookies</h2>
                        <p>
                            Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                            They are widely used to make websites work more efficiently and provide information to the website owners.
                            Cookies enhance your browsing experience by allowing websites to remember your preferences and understand
                            how you use their site.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Cookies</h2>
                        <p>
                            At Sustainable Community Market, we use cookies for various purposes, including:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>
                                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly.
                                They enable core functionality such as security, network management, and account access. You cannot opt
                                out of these cookies.
                            </li>
                            <li>
                                <strong>Functionality Cookies:</strong> These cookies allow us to remember choices you make and provide
                                enhanced, personalized features. For example, they may remember your login details or language preferences.
                            </li>
                            <li>
                                <strong>Performance Cookies:</strong> These cookies collect information about how you use our website,
                                such as which pages you visit most often. They help us understand how visitors interact with our website,
                                enabling us to continually improve it.
                            </li>
                            <li>
                                <strong>Targeting/Advertising Cookies:</strong> These cookies are used to deliver advertisements more
                                relevant to you and your interests. They are also used to limit the number of times you see an advertisement
                                and help measure the effectiveness of advertising campaigns.
                            </li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Types of Cookies We Use</h2>
                        <h3 className="text-xl font-semibold mt-4 mb-2">First-Party Cookies</h3>
                        <p>
                            These are cookies that are set by our website directly. They are used to improve your experience on our site.
                        </p>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Third-Party Cookies</h3>
                        <p>
                            These are cookies set by third parties that we partner with. They may be used for analytics, advertising,
                            or social media integration. For example, we use Google Analytics to help us understand how visitors engage
                            with our site.
                        </p>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Session Cookies</h3>
                        <p>
                            These cookies are temporary and are deleted when you close your browser. They help our website recognize you
                            as you navigate between pages.
                        </p>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Persistent Cookies</h3>
                        <p>
                            These cookies remain on your device for a specified period or until you delete them manually. They help our
                            website remember your preferences for future visits.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Cookie Management</h2>
                        <p>
                            Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies,
                            or to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and
                            from version to version. You can obtain up-to-date information about blocking and deleting cookies via the
                            support pages of your browser:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Chrome: <a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.google.com/chrome/answer/95647</a></li>
                            <li>Firefox: <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop</a></li>
                            <li>Safari: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a></li>
                            <li>Edge: <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09</a></li>
                        </ul>
                        <p className="mt-4">
                            Please note that restricting cookies may impact the functionality of our website. For example, you may not
                            be able to access certain areas of our site or you may be logged out of your account.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Our Cookie Policy</h2>
                        <p>
                            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
                            Cookie Policy on this page and updating the "last updated" date at the top of this policy.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
                        <p>
                            If you have any questions about our Cookie Policy, please contact us at:
                        </p>
                        <p className="mt-2">
                            <strong>Email:</strong> privacy@sustainablecommunitymarket.com<br />
                            <strong>Phone:</strong> +62 123 4567 890<br />
                            <strong>Address:</strong> Jl. Melawai Raya No. 45, Blok M, Jakarta Selatan, Indonesia
                        </p>
                    </div>
                </div>
            </SectionContainer>
        </main>
    );
}