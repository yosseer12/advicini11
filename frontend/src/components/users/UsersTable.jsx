import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash2, PlusCircle } from "lucide-react";

const userData = [
	{ id: 1, name: " xx", email: "xx@example.com", role: "Customer", status: "Active" },
	{ id: 2, name: "YY", email: "YY@example.com", role: "Admin", status: "Active" },
	{ id: 3, name: "ZZ", email: "ZZ@example.com", role: "Customer", status: "Inactive" },
	{ id: 4, name: "XY", email: "XY@example.com", role: "Customer", status: "Active" },
	{ id: 5, name: "YZ", email: "YZ@example.com", role: "Moderator", status: "Active" },
];

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(userData);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [editValues, setEditValues] = useState({ name: "", email: "", role: "", status: "Active" });

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = userData.filter(
			(user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
		);
		setFilteredUsers(filtered);
	};

	const handleEdit = (user) => {
		setSelectedUser(user);
		setEditValues(user);
		setIsModalOpen(true);
	};

	const handleAdd = () => {
		setSelectedUser(null);
		setEditValues({ name: "", email: "", role: "", status: "Active" });
		setIsModalOpen(true);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const handleSave = () => {
		if (selectedUser) {
			setFilteredUsers((prevUsers) =>
				prevUsers.map((user) => (user.id === selectedUser.id ? { ...user, ...editValues } : user))
			);
		} else {
			const newUser = { id: filteredUsers.length + 1, ...editValues };
			setFilteredUsers((prevUsers) => [...prevUsers, newUser]);
		}
		setIsModalOpen(false);
		setSelectedUser(null);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedUser(null);
	};

	const handleDelete = (userId) => {
		const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
		if (confirmDelete) {
			setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
		}
	};

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-100 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold text-gray-100">Liste des Utilisateurs</h2>
				<div className="flex items-center space-x-4">
					<button
						className="text-green-400 hover:text-green-300 mr-4"
						onClick={handleAdd}
					>
						<PlusCircle size={24} />
					</button>

					<div className="relative">
						<input
							type="text"
							placeholder="Search users..."
							className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={searchTerm}
							onChange={handleSearch}
						/>
						<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
					</div>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-700">
					<thead>
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-700">
						{filteredUsers.map((user) => (
							<motion.tr
								key={user.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
								<td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
								<td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
								<td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
									<button
										className="text-indigo-400 hover:text-indigo-300 mr-2"
										onClick={() => handleEdit(user)}
									>
										<Edit size={18} />
									</button>
									<button
										className="text-red-400 hover:text-red-300"
										onClick={() => handleDelete(user.id)}
									>
										<Trash2 size={18} />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
					<motion.div
						className="bg-gray-800 rounded-lg p-8 w-96 border border-gray-700 shadow-lg relative"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<span
							className="absolute top-2 right-2 text-2xl text-gray-400 cursor-pointer"
							onClick={handleCloseModal}
						>
							×
						</span>

						<h3 className="text-xl font-semibold text-gray-100 mb-4">
							{selectedUser ? "Edit User" : "Add User"}
						</h3>

						<div className="mb-4">
							<label htmlFor="name" className="block text-sm text-gray-400 mb-2">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg"
								value={editValues.name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg"
								value={editValues.email}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="role" className="block text-sm text-gray-400 mb-2">Role</label>
							<input
								type="text"
								id="role"
								name="role"
								className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg"
								value={editValues.role}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="status" className="block text-sm text-gray-400 mb-2">Status</label>
							<select
								id="status"
								name="status"
								className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg"
								value={editValues.status}
								onChange={handleInputChange}
							>
								<option value="Active">Active</option>
								<option value="Inactive">Inactive</option>
							</select>
						</div>

						<div className="flex justify-end">
							<button
								className="text-blue-400 hover:text-blue-300 mr-4"
								onClick={handleSave}
							>
								Ajouter
							</button>
							<button
								className="text-gray-400 hover:text-gray-300"
								onClick={handleCloseModal}
							>
								Annuler
							</button>
						</div>
					</motion.div>
				</div>
			)}
		</motion.div>
	);
};

export default UsersTable;
