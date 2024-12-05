import { Head } from "@inertiajs/react";

export default function Index({ users }) {
    return (
        <div className="container mx-auto p-4">
            <Head title="User List" />
            <h1 className="text-2xl font-bold mb-4">Daftar Pengguna</h1>
            <table className="table-auto w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Nama</th>
                        <th className="border px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
