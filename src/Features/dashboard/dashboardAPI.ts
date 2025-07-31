export const getDashboardStats = async () => {
  try {
    const response = await fetch("https://hospital-management-mdbf.onrender.com/admin/dashboard-stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    // Expecting a JSON object like:
    // { patients: number, doctors: number, appointments: number, revenue: number }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};
