import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchMeals = createAsyncThunk('meals/getMeals', async userId => {
  try {
    const { data } = await axios.get('/meals', userId); // eslint-disable-line
    return data;
  } catch (error) {
    console.log('Error in getMeals', error?.response?.data || error.message);
    throw error;
  }
});

const fetchDay = createAsyncThunk('meals/fetchDay', async (weight, thunkAPI) => {
  console.log('Fetching day...');
  try {
    const { data } = await axios.get('/user/day');
    if (data?.message === 'Day not found!') {
      console.log('creating day...');
      const { data: createdData } = await axios.post('/user/day', { weight });
      return createdData;
    } else if (Array.isArray(data)) {
      return data[0] || { water: 0, breakfast: [], lunch: [], dinner: [], snack: [] };
    } else {
      return data || { water: 0, breakfast: [], lunch: [], dinner: [], snack: [] };
    }
  } catch (error) {
    console.log('Error in fetching day', error?.response?.data || error.message);
    return thunkAPI.rejectWithValue(error?.response?.data || error.message);
  }
});

const fetchMonth = createAsyncThunk('meals/fetchMonth', async () => {
  console.log('Fetching month...');
  try {
    const { data } = await axios.get('/user/day/month');
    return data.newStatistic;
  } catch (error) {
    console.log('Error in fetching month', error?.response?.data || error.message);
    return [];
  }
});

const fetchYear = createAsyncThunk('meals/fetchYear', async () => {
  console.log('Fetching Year...');
  try {
    const { data } = await axios.get('/user/day/year');
    return data.newStatistic;
  } catch (error) {
    console.log('Error in fetching year', error?.response?.data || error.message);
    return [];
  }
});

const waterIntake = createAsyncThunk('meals/waterIntake', async waterIntake => {
  console.log('Sending water intake', waterIntake);
  try {
    const { data } = await axios.post('/user/water-intake', waterIntake);
    return data;
  } catch (error) {
    console.log('Error in water intake sending', error?.response?.data || error.message);
    throw error;
  }
});

const recordMeal = createAsyncThunk('meals/sendMeal', async meal => {
  console.log('Recording meal...', meal);
  try {
    const { data } = await axios.post('/user/food-intake', meal);
    return data;
  } catch (error) {
    console.log('Error in meal record sending', error?.response?.data || error.message);
    throw error;
  }
});

const editMeal = createAsyncThunk('meals/editMeal', async mealData => {
  console.log('Recording meal...', mealData);
  try {
    const { data } = await axios.put(
      `/user/food-intake/${mealData.id}`,
      mealData.data
    );
    return data;
  } catch (error) {
    console.log('Error in meal record sending', error?.response?.data || error.message);
    throw error;
  }
});

const getMonth = createAsyncThunk('meals/getMonth', async () => {
  try {
    const { data } = await axios.put('/user/day/year'); // eslint-disable-line
    return data;
  } catch (error) {
    console.log('Error in getMonth', error?.response?.data || error.message);
    throw error;
  }
});

const getYear = createAsyncThunk('meals/getYear', async () => {
  try {
    const { data } = await axios.get('/user/day/year'); // eslint-disable-line
    return data?.newStatistic;
  } catch (error) {
    console.log('Error in getYear', error?.response?.data || error.message);
    throw error;
  }
});

const mealsOperations = {
  fetchMeals,
  waterIntake,
  fetchDay,
  fetchMonth,
  fetchYear,
  recordMeal,
  getMonth,
  getYear,
  editMeal,
};

export default mealsOperations;
