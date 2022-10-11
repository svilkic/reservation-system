import React, { useEffect, useState } from 'react';
import { getDaysInMonth } from '/helpers/date';

const currentDate = new Date();

export function useDatePicker() {
  const [currentDay, setCurrentDay] = useState(currentDate.getDate());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [prevMonthDays, setPrevMonthDays] = useState(5);
  const [days, setDays] = useState(31);
  const [date, setDate] = useState(currentDate);
  const [afterMonthDays, setAfterMonthDays] = useState(1);
  const [preMonthDays, setPreMonthDays] = useState(1);

  useEffect(() => {
    const dt = new Date(`${currentMonth + 1}-01-${currentYear}`);
    // Spots at start
    const prevMonthDays = dt.getDay();
    setPrevMonthDays(prevMonthDays);
    // Days in last month
    const priorDays = new Date(dt);
    priorDays.setMonth(priorDays.getMonth() - 1);
    const preDays = getDaysInMonth(priorDays.getFullYear(), priorDays.getMonth() + 1);
    setPreMonthDays(preDays);
    // Days in current month
    const numberOfDays = getDaysInMonth(currentYear, currentMonth + 1);
    setDays(numberOfDays);
    // Positions need for next month
    const afterMonthDays = Math.ceil((numberOfDays + prevMonthDays) / 7) * 7;
    setAfterMonthDays(afterMonthDays - (numberOfDays + prevMonthDays));

    const newDate = new Date(`${currentMonth + 1}-${currentDay}-${currentYear}`);
    setDate(newDate);

    // So we don't go from  31.may to 31.jun, which doesn't exist
    if (currentDay > numberOfDays) setCurrentDay(numberOfDays);
  }, [currentDay, currentMonth, currentYear]);

  const selectDay = (day, changeMonth = 0) => {
    setCurrentDay(day);
    if (changeMonth === 1) incMonth();
    else if (changeMonth === -1) decMonth();
  };

  const incMonth = () => {
    if (currentMonth + 1 > 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const decMonth = () => {
    if (currentMonth - 1 < 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      return setCurrentMonth((prev) => prev - 1);
    }
  };

  return {
    currentDay,
    currentMonth,
    currentYear,
    date,
    selectDay,
    incMonth,
    decMonth,
    days,
    prevMonthDays,
    afterMonthDays,
    preMonthDays,
  };
}
