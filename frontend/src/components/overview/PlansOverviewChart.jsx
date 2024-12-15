import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const plansData = [
  { name: "Jul", plans: 4200 },
  { name: "Aug", plans: 3800 },
  { name: "Sep", plans: 5100 },
  { name: "Oct", plans: 4600 },
  { name: "Nov", plans: 5400 },
  { name: "Dec", plans: 7200 },
  { name: "Jan", plans: 6100 },
  { name: "Feb", plans: 5900 },
  { name: "Mar", plans: 6800 },
  { name: "Apr", plans: 6300 },
  { name: "May", plans: 7100 },
  { name: "Jun", plans: 7500 },
];

const PlansOverviewChart = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Plans Overview</h2>

      <div className="h-80">

        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={plansData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey={"name"} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="plans"  
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PlansOverviewChart;
