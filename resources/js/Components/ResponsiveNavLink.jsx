import { Link } from "@inertiajs/react";

export default function ResponsiveNavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-center rounded-lg py-3 justify-center ${
                active
                    ? "border-indigo-400 bg-gray-100 text-blue-700 font-semibold text-md focus:border-gray-100 focus:bg-blue-500 focus:text-gray-100 "
                    : "border-transparent text-gray-100 hover:border-gray-300 hover:bg-gray-50 hover:text-blue-300 focus:border-gray-300 focus:bg-gray-50 focus:text-blue-800 "
            } text-base font-medium transition duration-300 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
