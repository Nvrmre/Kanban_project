import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function index({auth, projects}) {
    return (
        <AuthenticatedLayout
        user={auth.user}
            header={
                <><h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Projects
                </h2><Link href={route('project.create')}>Create</Link></>
            }
        >
            <Head title="Project" />
        </AuthenticatedLayout>
    );
}
