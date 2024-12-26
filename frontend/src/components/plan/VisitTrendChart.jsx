import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Données : nombre de plans visités chaque mois
const visitData = [
	{ month: "Jan", plans_visites: 120 },
	{ month: "Feb", plans_visites: 180 },
	{ month: "Mar", plans_visites: 250 },
	{ month: "Apr", plans_visites: 300 },
	{ month: "May", plans_visites: 400 },
	{ month: "Jun", plans_visites: 350 },
];

const VisitTrendChart = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-100 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Plans Visités</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={visitData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='month' stroke='#9CA3AF' />
						<YAxis
							stroke='#9CA3AF'
							tickFormatter={(value) => `${value}`} 
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Line type='monotone' dataKey='plans_visites' stroke='#8B5CF6' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default VisitTrendChart;
