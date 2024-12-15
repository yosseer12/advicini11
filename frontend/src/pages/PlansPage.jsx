import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, User, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import BonsPlansTable from "../components/plan/BonsPlansTable";
import VisitTrendChart from "../components/plan/VisitTrendChart";

const PlansPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Plans Dashboard' />
			<div className='flex-1 overflow-auto relative z-10 bg-[#DADADA]'>
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* PLAN STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Plans' icon={Package} value={123423} color='#6366F1' />
					<StatCard name='Top Visiting' icon={TrendingUp} value={89} color='#10B981' />
					<StatCard name='Low Visiting' icon={AlertTriangle} value={23} color='#F59E0B' />
					<StatCard name='Total Visits' icon={User} value={"543210"} color='#EF4444' />
				</motion.div>

				<BonsPlansTable />

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<VisitTrendChart />
					<CategoryDistributionChart />
				</div>
			</main>
			</div>
		</div>
	);
};
export default PlansPage;
