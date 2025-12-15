import React from 'react';
const steps = [
    { id: 1, title: "Report an Issue" },
    { id: 2, title: "Admin Verification" },
    { id: 3, title: "Staff Assignment" },
    { id: 4, title: "Progress Tracking" },
    { id: 5, title: "Issue Resolution" },
];

const HowItWork = () => {
    return (
        <section
       data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom"
        className="bg-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
                    How the System Works
                </h2>


                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center"
                        >
                            <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                                {step.id}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {step.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWork;