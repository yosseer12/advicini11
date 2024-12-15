import { motion } from "framer-motion";
import { Edit, Search, Trash2, PlusCircle } from "lucide-react";
import { useState } from "react";

const BON_PLAN_DATA = [
	{ id: 1, name: "kayo", category: "Café", address: "Ariana Soghra ", visits: 150 },
	{ id: 2, name: "ACE London", category: "cafe", address: "Ariana Soghra", visits: 300 },
	{ id: 3, name: "Diese", category: "Restaurant", address: "Ariana Soghra", visits: 120 },
	{ id: 4, name: "TheX_Level", category: "Café-Resto", address: "Ariana Soghra", visits: 250 },
	{ id: 5, name: "Comme Chez Toi", category: "Café-Resto", address: "Ariana Soghra", visits: 500 },
];

const BonsPlansTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredPlans, setFilteredPlans] = useState(BON_PLAN_DATA);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);
	const [editValues, setEditValues] = useState({ name: "", category: "", address: "", visits: 0 });

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = BON_PLAN_DATA.filter(
			(plan) =>
				plan.name.toLowerCase().includes(term) ||
				plan.category.toLowerCase().includes(term) ||
				plan.address.toLowerCase().includes(term)
		);
		setFilteredPlans(filtered);
	};

	const handleEdit = (plan) => {
		setSelectedPlan(plan);
		setEditValues(plan);
		setIsModalOpen(true);
	};

	const handleAdd = () => {
		setSelectedPlan(null); 
		setEditValues({ name: "", category: "", address: "", visits: 0 });
		setIsModalOpen(true);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const handleSave = () => {
		if (selectedPlan) {
			
			setFilteredPlans((prevPlans) =>
				prevPlans.map((plan) =>
					plan.id === selectedPlan.id ? { ...plan, ...editValues } : plan
				)
			);
		} else {
			
			const newPlan = {
				id: filteredPlans.length + 1,
				...editValues,
			};
			setFilteredPlans((prevPlans) => [...prevPlans, newPlan]);
		}
		setIsModalOpen(false);
		setSelectedPlan(null);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedPlan(null);
	};
	const handleDelete = (planId) => {
		const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce bon plan ?");
		if (confirmDelete) {
		  setFilteredPlans((prevPlans) =>
			prevPlans.filter((plan) => plan.id !== planId)
		  );
		}
	  };
	  

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-100 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold text-gray-100">Liste des bons plans locaux</h2>
				<div className="flex items-center space-x-4">
				<button
					className="text-green-400 hover:text-green-300 mr-4"
					onClick={() => setIsModalOpen(true)}>
					<PlusCircle size={24} />
				</button>

					<div className="relative">
						<input
							type="text"
							placeholder="Rechercher des bons plans..."
							className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							onChange={handleSearch}
							value={searchTerm}
						/>
						<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
					</div>
				</div>
			</div>

			{/* tableau */}
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-700">
					<thead>
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
								Nom
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
								Catégorie
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
								Adresse
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
								Visites
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-700">
						{filteredPlans.map((plan) => (
							<motion.tr
								key={plan.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
									{plan.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
									{plan.category}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
									{plan.address}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
									{plan.visits}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
									<button
										className="text-indigo-400 hover:text-indigo-300 mr-2"
										onClick={() => handleEdit(plan)}
									>
										<Edit size={18} />
									</button>
									<button 
									className="text-red-400 hover:text-red-300"
  									onClick={() => handleDelete(plan.id)}>
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
				<div className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-50">
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
						{selectedPlan ? "Éditer le bon plan" : "Ajouter un bon plan"}
					</h3>

					{/* Formulaire */}

					<div className="mb-4">
						<label htmlFor="name" className="block text-sm text-gray-400 mb-2">Nom</label>
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
						<label htmlFor="category" className="block text-sm text-gray-400 mb-2">Catégorie</label>
						<input
						type="text"
						id="category"
						name="category"
						className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg"
						value={editValues.category}
						onChange={handleInputChange}
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="address" className="block text-sm text-gray-400 mb-2">Adresse</label>
						<input
						type="text"
						id="address"
						name="address"
						className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg"
						value={editValues.address}
						onChange={handleInputChange}
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="visits" className="block text-sm text-gray-400 mb-2">Visites</label>
						<input
						type="number"
						id="visits"
						name="visits"
						className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg"
						value={editValues.visits}
						onChange={handleInputChange}
						/>
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

export default BonsPlansTable;
