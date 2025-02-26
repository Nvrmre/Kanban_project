import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaUser ,FaRegUser, FaHome } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoSettingsSharp, IoLogOutSharp  } from "react-icons/io5";


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-blue-500 dark:border-gray-700 dark:bg-gray-800">
                <div className="text-gray-100 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex shrink-0 ">
                            <NavLink
                                // href={route("kanban.index")}
                                active={route().current("kanban.index")}
                                className={
                                    route().current("kanban.index")
                                        ? "active-class rounded-lg ring-2 ring-offset-2 "
                                        : "cursor-default"
                                }
                            >
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-100" />
                                    <h1 className="flex text-2xl font-bold">KANBAN</h1>  {/* logo */}
                            </NavLink>       
                        </div>

                        <div className="flex ">
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    <FaHome className="text-lg me-2"/>
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    href={route("laporan.index")}
                                    active={route().current("laporan.index")}
                                >
                                    <HiDocumentReport className="text-lg me-2" />
                                    Laporan
                                </NavLink>
                                <NavLink
                                    href={route("setting.index")}
                                    active={route().current("setting.index")}
                                >
                                    <IoSettingsSharp className="text-lg me-2"/>
                                    Setting
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-blue-600 hover:font-bold focus:outline-none"
                                            >
                                                <FaUser className="me-2"/>
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-white transition duration-150 ease-in-out hover:bg-gray-100 hover:text-blue-500 focus:bg-gray-100 focus:text-blue-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2 ">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            <FaHome className="me-2"/>
                            Dashboard
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("laporan.index")}
                            active={route().current("laporan.index")}
                        >
                            <HiDocumentReport className="text-lg me-2" />
                            Laporan
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("setting.index")}
                            active={route().current("setting.index")}
                        >
                            <IoSettingsSharp className="text-lg me-2"/>
                            Setting
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="grid grid-rows-2 items-center justify-center px-4">
                            <div className="flex items-center justify-center text-base text-gray-50 font-semibold">
                                {user.name}
                            </div>
                            <div className="text-sm font-small text-white">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                <FaUser className="me-2"/>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                <IoLogOutSharp className="me-2 text-xl"/>
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
