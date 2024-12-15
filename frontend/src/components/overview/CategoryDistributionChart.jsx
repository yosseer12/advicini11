import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const categoryData = [
  { name: "cafe", value: 4500 },
  { name: "restaurant", value: 3200 },
  { name: "cafe-resto", value: 2800 },
  { name: "restaurant", value: 2100 },
  { name: "cafe", value: 1900 },
  { name: "other", value: 1500 },  
];

const transformedCategoryData = categoryData.reduce((acc, item) => {
  const categoryName =
    item.name === "cafe-resto" ? "restaurant" : item.name; 
  const existingCategory = acc.find((cat) => cat.name === categoryName);

  if (existingCategory) {
    existingCategory.value += item.value; 
  } else {	
    acc.push({ name: categoryName, value: item.value }); // Add new category
  }

  return acc;
}, []);

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899"];

const CategoryDistributionChart = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-100 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Category Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={transformedCategoryData}  
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {transformedCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
