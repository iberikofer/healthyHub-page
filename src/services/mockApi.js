import axios from 'axios';

// Initial demo mock data
// Dynamic generator for attractive, realistic mock chart curves
const generateMonthData = (baseWeight = 72) => {
  const list = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const days = new Date(year, date.getMonth() + 1, 0).getDate();
  const today = date.getDate();

  for (let i = 1; i <= days; i++) {
    const dayStr = String(i).padStart(2, '0');
    // Smooth natural wave fluctuations
    const calWave = Math.sin(i * 0.7) * 220 + Math.cos(i * 0.3) * 110;
    const waterWave = Math.cos(i * 0.6) * 350 + Math.sin(i * 0.4) * 150;
    const weightTrend = baseWeight - (i * 0.05) + Math.sin(i * 0.5) * 0.3;

    const caloriesTotal = Math.max(1200, Math.round(1850 + calWave));
    const waterTotal = Math.max(1000, Math.round(1800 + waterWave));
    const weightVal = Number(Math.max(50, weightTrend).toFixed(1));

    // Distribute calories across 4 meals
    const bCal = Math.round(caloriesTotal * 0.25);
    const lCal = Math.round(caloriesTotal * 0.40);
    const dCal = Math.round(caloriesTotal * 0.25);
    const sCal = Math.max(50, caloriesTotal - bCal - lCal - dCal);

    list.push({
      date: `${year}-${month}-${dayStr}`,
      water: waterTotal,
      weight: weightVal,
      breakfast: [{ _id: `b-${i}`, name: 'Breakfast', calories: bCal, carbonohidrates: 45, protein: 22, fat: 12 }],
      lunch: [{ _id: `l-${i}`, name: 'Lunch', calories: lCal, carbonohidrates: 70, protein: 50, fat: 20 }],
      dinner: [{ _id: `d-${i}`, name: 'Dinner', calories: dCal, carbonohidrates: 35, protein: 38, fat: 14 }],
      snack: [{ _id: `s-${i}`, name: 'Snack', calories: sCal, carbonohidrates: 18, protein: 12, fat: 6 }],
    });
  }
  return list;
};

const generateYearData = (baseWeight = 73) => {
  const list = [];
  const date = new Date();
  const year = date.getFullYear();
  for (let m = 1; m <= 12; m++) {
    const monthStr = String(m).padStart(2, '0');
    const calWave = Math.sin(m * 0.8) * 180;
    const waterWave = Math.cos(m * 0.7) * 250;
    const weightTrend = baseWeight - (m * 0.15) + Math.sin(m * 0.5) * 0.2;

    const caloriesTotal = Math.max(1200, Math.round(1800 + calWave));
    const waterTotal = Math.max(1000, Math.round(1850 + waterWave));
    const weightVal = Number(Math.max(50, weightTrend).toFixed(1));

    const bCal = Math.round(caloriesTotal * 0.25);
    const lCal = Math.round(caloriesTotal * 0.40);
    const dCal = Math.round(caloriesTotal * 0.25);
    const sCal = Math.max(50, caloriesTotal - bCal - lCal - dCal);

    list.push({
      date: `${year}-${monthStr}-15`,
      water: waterTotal,
      weight: weightVal,
      breakfast: [{ calories: bCal }],
      lunch: [{ calories: lCal }],
      dinner: [{ calories: dCal }],
      snack: [{ calories: sCal }],
    });
  }
  return list;
};

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
      const parsed = JSON.parse(stored);
      let changed = false;
      if (parsed.user?.email === 'demo@example.com') {
        if (!parsed.month || !Array.isArray(parsed.month) || parsed.month.length === 0) {
          parsed.month = generateMonthData(Number(parsed.user?.weight) || 72);
          changed = true;
        }
        if (!parsed.year || !Array.isArray(parsed.year) || parsed.year.length === 0) {
          parsed.year = generateYearData(Number(parsed.user?.weight) || 72);
          changed = true;
        }
      }
      if (changed) {
        saveMockData(parsed);
      }
      return parsed;
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
      const syncDayToStats = () => {
        if (!store.month || !Array.isArray(store.month)) store.month = [];
        if (!store.year || !Array.isArray(store.year)) store.year = [];
        const today = store.day.date;
        const mIdx = store.month.findIndex(item => item.date === today);
        if (mIdx >= 0) {
          store.month[mIdx] = JSON.parse(JSON.stringify(store.day));
        } else {
          store.month.push(JSON.parse(JSON.stringify(store.day)));
        }
        const yIdx = store.year.findIndex(item => item.date && item.date.slice(0, 7) === today.slice(0, 7));
        if (yIdx >= 0) {
          store.year[yIdx] = JSON.parse(JSON.stringify(store.day));
        } else {
          store.year.push(JSON.parse(JSON.stringify(store.day)));
        }
      };

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
          name: body.name || 'Demo User',
          email: body.email || 'demo.new@example.com',
          goal: body.goal || 'Lose Fat',
          gender: body.gender || 'Male',
          age: String(body.age || '25'),
          height: String(body.height || '175'),
          weight: String(body.weight || '70'),
          activity: String(body.activity || '1.2'),
          token: 'mock-jwt-token-' + Date.now(),
          avatarURL: '',
        };

        const todayStr = new Date().toISOString().split('T')[0];
        const userWeight = Number(body.weight) || 70;

        // Clean day for newly registered user
        store.day = {
          date: todayStr,
          water: 0,
          weight: userWeight,
          breakfast: [],
          lunch: [],
          dinner: [],
          snack: [],
        };
        // For registered users, start with clean chart data (only today's initial metrics, no fictitious waves)
        store.month = [JSON.parse(JSON.stringify(store.day))];
        store.year = [JSON.parse(JSON.stringify(store.day))];
        saveMockData(store);
        return Promise.resolve({
          status: 201,
          data: store.user,
        });
      }

      // 3. Login
      if (url.includes('/user/login')) {
        let body = {};
        try {
          body = typeof error.config.data === 'string' ? JSON.parse(error.config.data) : (error.config.data || {});
        } catch (_) {}

        // If logging in as existing demo user, restore populated mock stats
        if (body.email === 'demo@example.com') {
          const freshDemo = getInitialMockData();
          store.user = freshDemo.user;
          store.day = freshDemo.day;
          store.month = freshDemo.month;
          store.year = freshDemo.year;
          saveMockData(store);
        }

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
        if (!store.month || !Array.isArray(store.month)) {
          store.month = [JSON.parse(JSON.stringify(store.day))];
        }
        return Promise.resolve({
          status: 200,
          data: { newStatistic: store.month },
        });
      }

      if (url.includes('/user/day/year')) {
        if (!store.year || !Array.isArray(store.year)) {
          store.year = [JSON.parse(JSON.stringify(store.day))];
        }
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
          syncDayToStats();
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
        syncDayToStats();
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
        syncDayToStats();
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
