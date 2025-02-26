import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button, Select } from "antd";
import { useEffect, useRef, useState } from "react";

import Calendar from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import { addDays, startOfWeek, format } from "date-fns";
import { nextWeek, prevWeek } from "@/store/providerSlice";

const { Option } = Select;
const ProviderCalendar = () => {
  const calendarRef = useRef(null);
  const [view, setView] = useState("week");
  const [calendar, setCalendar] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: RootState) => state.providers.selectedDate
  );

  // Get start and end of the selected week
  const startDate = new Date(selectedDate);
  const { id } = useParams();
  const { providers } = useSelector((state: RootState) => state.providers);
  const provider = providers?.find((p) => p.id === Number(id));
  console.log(providers, "providersproviders");
  if (!provider) {
    return <div>Provider not found</div>;
  }

  const startOfThisWeek = startOfWeek(new Date(selectedDate), {
    weekStartsOn: 1,
  });

  const eventTypes = [
    {
      key: "online_slots",
      name: "Online",
      color: "lightgreen",
    },
    { key: "offline_slots", name: "Offline", color: "orange" },
    { key: "both_slots", name: "Online+Offline", color: "blue" },
    { key: "online_booked", name: "Online Booked", color: "blue" },
    {
      key: "offline_booked_slots",
      name: "Offline Booked",
      color: "brown",
    },
    { key: "blocked_slots", name: "Blocked", color: "red" },
  ];
  useEffect(() => {
    if (!calendarRef.current) return;

    if (!calendar) {
      const newCalendar = new Calendar(calendarRef.current, {
        defaultView: view,
        taskView: true,
        scheduleView: ["time"],
        template: {
          time: (schedule) => `<strong>${schedule.title}</strong>`,
        },
      });

      const generateSchedulesForWeek = () => {
        if (!provider || !provider.availabilities.length) return [];

        const availabilities = provider.availabilities[0];
        const scheduleData = [];

        Object.keys(availabilities).forEach((key) => {
          const eventType = eventTypes.find((type) => type.key === key);
          if (!eventType) return;

          availabilities[key].forEach((time) => {
            const [hour, minute] = time.split(":").map(Number);
            const start = new Date(startOfThisWeek);
            start.setHours(hour, minute, 0);

            const end = new Date(start);
            end.setMinutes(end.getMinutes() + 30); // Assuming 30-min slots

            scheduleData.push({
              id: `${key}-${time}`,
              calendarId: "1",
              title: eventType.name,
              category: "time",
              start: format(start, "yyyy-MM-dd'T'HH:mm:ss"),
              end: format(end, "yyyy-MM-dd'T'HH:mm:ss"),
              bgColor: eventType.color,
            });
          });
        });

        return scheduleData;
      };

      newCalendar.createSchedules(generateSchedulesForWeek());
      setCalendar(newCalendar);
      updateCurrentDate(newCalendar);
    } else {
      calendar.changeView(view);
      updateCurrentDate(calendar);
    }
  }, [view]);

  // Function to update current displayed date
  const updateCurrentDate = (calendarInstance) => {
    const date = calendarInstance.getDate(); // Get current date
    setCurrentDate(
      date.toDate().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
  };

  const handlePrevClick = () => {
    if (calendar) {
      calendar.prev();
      updateCurrentDate(calendar);
      dispatch(prevWeek());
    }
  };

  const handleNextClick = () => {
    if (calendar) {
      calendar.next();
      updateCurrentDate(calendar);
      dispatch(nextWeek());
    }
  };

  const handleViewChange = (value) => {
    setView(value === "weekly" ? "week" : "month");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="md:w-1/5 w-full bg-white p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">Providers</h2>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-md bg-blue-100"
            >
              <span>{provider?.name}</span>
              <button className="text-red-500">×</button>
            </div>
          ))}
        </div>
        <Button className="mt-4 w-1/2 bg-red-300 text-white">Clear All</Button>
      </div>

      {/* Main Calendar View */}
      <div className="flex-1 w-full p-4">
        <div className="flex justify-between items-center mb-4">
          {/* Date Navigation */}
          <div className="flex items-center space-x-2">
            <Button onClick={handlePrevClick}>←</Button>
            <Button onClick={handleNextClick}>→</Button>
            <span className="text-lg font-semibold">{currentDate}</span>
          </div>
          <div className="md:flex hidden items-center gap-2 p-2 border rounded-lmd bg-white shadow-md">
            {eventTypes.map((event) => (
              <div key={event.name} className="flex items-center space-x-2">
                <span
                  className={`w-4 h-4 rounded-full`}
                  style={{
                    background: event.color,
                  }}
                />
                <span className="text-gray-700 text-sm">{event.name}</span>
              </div>
            ))}
          </div>

          {/* View Selection */}
          <Select defaultValue="weekly" onChange={handleViewChange}>
            <Option value="weekly">Weekly</Option>
            <Option value="monthly">Monthly</Option>
          </Select>
        </div>

        <div ref={calendarRef} className="h-full" />
      </div>
    </div>
  );
};

export default ProviderCalendar;
