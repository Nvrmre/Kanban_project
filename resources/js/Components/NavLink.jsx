import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center text-sm font-medium leading-5 px-5 py-2 hover:font-bold hover:transform hover:scale-105 hover:bg-blue-600 hover:rounded-lg rounded transition duration-150 ease-in-out' +
                (active
                    ? 'border-indigo-400 bg-blue-600 text-gray-100 focus:border-indigo-500 '
                    : 'border-transparent text-gray-100 hover:border-gray-300 hover:text-gray-300 focus:border-gray-300 focus:text-gray-400 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
