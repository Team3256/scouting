// pages/analytics.js or pages/analytics.tsx
"use client";

// pages/analytics.js or pages/analytics.tsx
import React, { useEffect, useState } from "react";
import Head from "next/head";
// Assume Button and Card are components either from a UI library or your own implementations
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PieController,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PieController,
);

const AnalyticsPage = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    // Example chart data setup
    setChartData({
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          data: [12, 19, 3],
          backgroundColor: [
            "rgba(255,99,132,0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, []);

  return (
    <div className="p-8">
      <Head>
        <title>Analytics Dashboard</title>
      </Head>
      <h1 className="mb-6 text-3xl font-bold">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Pie Chart */}
        <Card className="rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold">Sales Breakdown</h2>
          <Pie data={chartData} />
        </Card>
        {/* Additional Analytics Cards */}
        <Card className="rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold">Traffic Sources</h2>
          {/* Placeholder for additional chart/content */}
        </Card>
        <Card className="rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold">New Users</h2>
          {/* Placeholder for additional chart/content */}
        </Card>
        <Card className="rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold">Revenue</h2>
          {/* Placeholder for additional chart/content */}
        </Card>
      </div>
      {/* Widget Pop-Up */}
      {showWidget && (
        <div className="fixed bottom-10 right-10 w-64 rounded-xl bg-white p-4 shadow-2xl">
          <h3 className="mb-3 text-lg font-bold">Quick Widget</h3>
          <p className="mb-4">Content or insights...</p>
          <Button onClick={() => setShowWidget(false)}>Close</Button>
        </div>
      )}
      <Button
        className="fixed bottom-10 right-10 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => setShowWidget(true)}
      >
        Open Widget
      </Button>
    </div>
  );
};

export default AnalyticsPage;
