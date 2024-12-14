export const apiService = {
    getBonsPlans: async () => {
      const response = await fetch('http://localhost:8080/api/bonplans');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des bons plans');
      }
      return response.json();
    },
  };
  