import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const eventTypes = [
  { name: "Online", color: "bg-green-500" },
  { name: "Offline", color: "bg-orange-500" },
  { name: "Online+Offline", color: "bg-blue-500" },
  { name: "Online Booked", color: "bg-blue-900" },
  { name: "Offline Booked", color: "bg-orange-950" },
  { name: "Blocked", color: "bg-red-500" },
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DateChange = ({ setSelectedDate, selectedDate }: any) => {
  const handlePrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between gap-2">
          <div
            className="border cursor-pointer rounded-full p-2"
            onClick={handlePrevWeek}
          >
            <ChevronLeft className="h-4 w-4 rounded-full" />
          </div>
          <div className="grid w-full py-2 grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={day}
                className="md:w-20 text-center p-2 rounded-md cursor-pointer hover:bg-accent"
                style={{
                  backgroundColor:
                    index === selectedDate.getDay()
                      ? "oklch(0.453 0.124 130.933)"
                      : "",
                }}
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(
                    newDate.getDate() + (index - selectedDate.getDay())
                  );
                  setSelectedDate(newDate);
                }}
              >
                <div className="text-xs text-gray-300 text-muted-foreground">
                  {day}
                </div>
                <div className="font-semibold">
                  {format(
                    new Date(
                      selectedDate.getTime() +
                        (index - selectedDate.getDay()) * 24 * 60 * 60 * 1000
                    ),
                    "d"
                  )}
                </div>
              </div>
            ))}
          </div>
          <div
            className="border cursor-pointer rounded-full p-2"
            onClick={handleNextWeek}
          >
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="flex my-2 flex-col md:flex-row justify-around ">
        <div className="w-1/2">
          <h2 className="text-md font-semibold text-gray-600 mb-2">
            Showing full schedules for {format(selectedDate, "EEE, d MMM yyyy")}
          </h2>
          <p className="text-xs text-gray-400">
            Showing all available slots for the selected date.
          </p>
        </div>
        <div className="grid grid-cols-3 w-3/4">
          {eventTypes.map((event) => (
            <div key={event.name} className="flex items-center space-x-2 w-1/3">
              <span className={`w-4 h-2 rounded-xl ${event.color}`} />
              <span className="text-gray-400 text-sm">{event.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DateChange;
