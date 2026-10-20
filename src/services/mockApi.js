import axios from 'axios';

// Initial demo mock data
const getInitialMockData = () => {
  const defaultUser = {
    name: 'Yaroslav',
    email: 'demo@example.com',
    goal: 'Maintain',
    gender: 'Male',
    age: '25',
    height: '180',
    weight: '75',
    activity: '1.375',
    token: 'mock-jwt-token-demo-user',
    avatarURL: '',
  };

  const defaultDay = {
    date: new Date().toISOString().split('T')[0],
    water: 1200,
    weight: 75,
    breakfast: [
      {
        _id: 'meal-b-1',
        name: 'Oatmeal with berries',
        calories: 320,
        carbonohidrates: 48,
        protein: 10,
        fat: 5,
      },
      {
        _id: 'meal-b-2',
        name: 'Boiled Egg',
        calories: 78,
        carbonohidrates: 0.6,
        protein: 6.3,
        fat: 5.3,
      },
    ],
    lunch: [
      {
        _id: 'meal-l-1',
        name: 'Grilled Chicken Breast',
        calories: 280,
        carbonohidrates: 0,
        protein: 52,
        fat: 6,
      },
      {
        _id: 'meal-l-2',
        name: 'Brown Rice with Greens',
        calories: 215,
        carbonohidrates: 45,
        protein: 5,
        fat: 1.8,
      },
    ],
    dinner: [
      {
        _id: 'meal-d-1',
        name: 'Salmon Fillet',
        calories: 340,
        carbonohidrates: 0,
        protein: 34,
        fat: 20,
      },
      {
        _id: 'meal-d-2',
        name: 'Avocado & Tomato Salad',
        calories: 160,
        carbonohidrates: 9,
        protein: 2,
        fat: 14,
      },
    ],
    snack: [
      {
        _id: 'meal-s-1',
        name: 'Greek Yogurt',
        calories: 120,
        carbonohidrates: 6,
        protein: 15,
        fat: 3,
      },
    ],
  };

  const generateMonthData = () => {
    const list = [];
    const date = new Date();
    const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= days; i++) {
      list.push({
        date: i,
        calories: i <= date.getDate() ? 1400 + Math.floor(Math.random() * 400) : 0,
        water: i <= date.getDate() ? 1200 + Math.floor(Math.random() * 800) : 0,
        weight: i <= date.getDate() ? 75 : 0,
      });
    }
    return list;
  };

  const generateYearData = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.map((m, idx) => ({
      month: m,
      calories: idx <= new Date().getMonth() ? 1500 + Math.floor(Math.random() * 300) : 0,
      water: idx <= new Date().getMonth() ? 1600 + Math.floor(Math.random() * 400) : 0,
      weight: idx <= new Date().getMonth() ? 74 + (idx % 2) : 0,
    }));
  };

  return {
    user: defaultUser,
    day: defaultDay,
    month: generateMonthData(),
    year: generateYearData(),
  };
};

const getStoredMockData = () => {
  try {
    const stored = localStorage.getItem('healthy_hub_mock_store');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse mock store', e);
  }
  const initial = getInitialMockData();
  localStorage.setItem('healthy_hub_mock_store', JSON.stringify(initial));
  return initial;
};

const saveMockData = data => {
  try {
    localStorage.setItem('healthy_hub_mock_store', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save mock store', e);
  }
};

export const initMockApi = () => {
  // Axios response interceptor: if a network error/timeout occurs, fall back to mock data
  axios.interceptors.response.use(
    response => response,
    error => {
      const url = error.config?.url || '';
      const method = error.config?.method?.toLowerCase() || 'get';
      const isNetworkError =
        error.code === 'ECONNABORTED' ||
        !error.response ||
        error.message?.includes('Network Error') ||
        error.message?.includes('timeout') ||
        error.response?.status >= 500 ||
        error.response?.status === 404;

      if (!isNetworkError) {
        return Promise.reject(error);
      }

      console.warn(`[MockApi] Backend unavailable (${url}). Using offline mock response.`);
      const store = getStoredMockData();

      // 1. Check email
      if (url.includes('/user/check-email')) {
        return Promise.resolve({
          status: 200,
          data: { message: 'Email is available' },
        });
      }

      // 2. Register
      if (url.includes('/user/register')) {
        let body = {};
        try {
          body = typeof error.config.data === 'string' ? JSON.parse(error.config.data) : (error.config.data || {});
        } catch (_) {}

        store.user = {
          ...store.user,
          ...body,
          token: 'mock-jwt-token-' + Date.now(),
        };
        saveMockData(store);
        return Promise.resolve({
          status: 201,
          data: store.user,
        });
      }

      // 3. Login
      if (url.includes('/user/login')) {
        return Promise.resolve({
          status: 200,
          data: store.user,
        });
      }

      // 4. Logout
      if (url.includes('/user/logout')) {
        return Promise.resolve({
          status: 200,
          data: { message: 'Logged out' },
        });
      }

      // 5. Current user
      if (url.includes('/user/current')) {
        return Promise.resolve({
          status: 200,
          data: store.user,
        });
      }

      // 6. Day data (get/post)
      if (url.includes('/user/day/month')) {
        return Promise.resolve({
          status: 200,
          data: { newStatistic: store.month },
        });
      }

      if (url.includes('/user/day/year')) {
        return Promise.resolve({
          status: 200,
          data: { newStatistic: store.year },
        });
      }

      if (url.includes('/user/day')) {
        if (method === 'post') {
          let body = {};
          try {
            body = typeof error.config.data === 'string' ? JSON.parse(error.config.data) : (error.config.data || {});
          } catch (_) {}
          store.day.weight = Number(body.weight) || store.day.weight;
          saveMockData(store);
          return Promise.resolve({
            status: 201,
            data: store.day,
          });
        }
        return Promise.resolve({
          status: 200,
          data: [store.day],
        });
      }

      // 7. Water intake
      if (url.includes('/user/water-intake')) {
        let body = {};
        try {
          body = typeof error.config.data === 'string' ? JSON.parse(error.config.data) : (error.config.data || {});
        } catch (_) {}
        const addedWater = Number(body.water) || 0;
        store.day.water = Math.max(0, (store.day.water || 0) + addedWater);
        saveMockData(store);
        return Promise.resolve({
          status: 200,
          data: store.day,
        });
      }

      // 8. Food intake (record meal)
      if (url.includes('/user/food-intake')) {
        let body = {};
        try {
          body = typeof error.config.data === 'string' ? JSON.parse(error.config.data) : (error.config.data || {});
        } catch (_) {}
        const mealType = body.type || 'breakfast';
        if (store.day[mealType]) {
          store.day[mealType].push({
            _id: 'meal-' + Date.now(),
            name: body.name || 'New Meal',
            calories: Number(body.calories) || 0,
            carbonohidrates: Number(body.carbonohidrates) || 0,
            protein: Number(body.protein) || 0,
            fat: Number(body.fat) || 0,
          });
        }
        saveMockData(store);
        return Promise.resolve({
          status: 200,
          data: store.day,
        });
      }

      // 9. Change settings / goal
      if (url.includes('/user/change-settings')) {
        let body = {};
        try {
          body = typeof error.config.data === 'string' ? JSON.parse(error.config.data) : (error.config.data || {});
        } catch (_) {}
        store.user = { ...store.user, ...body };
        saveMockData(store);
        return Promise.resolve({
          status: 200,
          data: store.user,
        });
      }

      if (url.includes('/user/change-goal')) {
        let body = {};
        try {
          body = typeof error.config.data === 'string' ? JSON.parse(error.config.data) : (error.config.data || {});
        } catch (_) {}
        store.user.goal = body.goal || store.user.goal;
        saveMockData(store);
        return Promise.resolve({
          status: 200,
          data: { goal: store.user.goal },
        });
      }

      return Promise.reject(error);
    }
  );
};
