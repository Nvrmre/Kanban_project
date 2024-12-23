"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Welcome() {
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            title: "Visual Boards",
            description: "Create and customize boards to fit your workflow.",
            icon: "📊",
        },
        {
            title: "Team Collaboration",
            description: "Work together seamlessly with real-time updates.",
            icon: "👥",
        },
        {
            title: "Progress Tracking",
            description:
                "Monitor project progress with intuitive visualizations.",
            icon: "📈",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
            <header className="py-4 px-6 flex justify-end items-center mb-5 ">
                <nav>
                    <Link
                        href="/login"
                        className="text-blue-600 font-semibold hover:text-blue-800 px-4 py-2 rounded-md mr-2"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Register
                    </Link>
                </nav>
            </header>

            <main className="flex-grow">
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            className="text-5xl font-bold text-gray-900 mb-6"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Streamline Your Workflow with{" "}
                            <span className="text-blue-600">Kanban</span>
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-600 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Boost productivity and visualize your project
                            progress with our intuitive Kanban board solution.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Link
                                href="/register"
                                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center"
                            >
                                Get Started for Free
                                <FaArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                <section className="py-16 bg-blue-50">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Key Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className={`bg-white p-6 rounded-lg shadow-lg ${
                                        index === activeFeature
                                            ? "ring-2 ring-blue-500"
                                            : ""
                                    }`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <div className="text-4xl mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 px-6 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Experience the Kanban Difference
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {[
                                {
                                    title: "Streamlined Workflow",
                                    description:
                                        "Visualize your project progress at a glance. Drag and drop tasks effortlessly between columns, ensuring everyone knows what's next.",
                                },
                                {
                                    title: "Enhanced Collaboration",
                                    description:
                                        "Comment on tasks, mention team members, and share files - all in one place. Stay connected and aligned with your team, no matter where you are.",
                                },
                                {
                                    title: "Real-time Updates",
                                    description:
                                        "See changes as they happen. Kanban ensures everyone is always working with the most up-to-date information, reducing miscommunication.",
                                },
                                {
                                    title: "Customizable Boards",
                                    description:
                                        "Tailor your boards to fit your unique workflow. Add custom fields, set up automation, and create the perfect setup for your team's needs.",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-blue-50 p-6 rounded-lg shadow-md"
                                    initial={{
                                        opacity: 0,
                                        x: index % 2 === 0 ? -20 : 20,
                                    }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <h3 className="text-xl font-semibold text-blue-600 mb-3 flex items-center">
                                        <FaCheckCircle className="mr-2 h-6 w-6" />
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
