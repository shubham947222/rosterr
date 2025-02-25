import { format, parse } from "date-fns";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Provider } from "@/types/provider";
import { House, Video } from "lucide-react";

interface ProviderScheduleProps {
  filteredProviders?: Provider[];
}

const ProviderSchedule = ({
  filteredProviders = [],
}: ProviderScheduleProps) => {
  const navigate = useNavigate();
  const [currentSlides, setCurrentSlides] = useState<Record<number, number>>(
    {}
  );

  const getSlotType = (
    time: string,
    availability: Provider["availabilities"][0]
  ) => {
    const timeStr = format(parse(time, "HH:mm", new Date()), "HH:mm");
    if (availability.blocked_slots.includes(timeStr)) return "blocked";
    if (availability.both_slots.includes(timeStr)) return "mixed";
    if (availability.online_slots.includes(timeStr)) return "online";
    if (availability.offline_slots.includes(timeStr)) return "offline";
    return "available";
  };

  const getAllTimeSlots = (provider: Provider) => {
    const availability = provider.availabilities[0];
    const allSlots = new Set([
      ...availability.online_slots,
      ...availability.offline_slots,
      ...availability.both_slots,
      ...availability.blocked_slots,
    ]);
    return Array.from(allSlots).sort();
  };

  const handlePrevSlide = (providerId: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [providerId]: Math.max(0, (prev[providerId] || 0) - 1),
    }));
  };

  const handleNextSlide = (providerId: number, maxSlides: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [providerId]: Math.min(maxSlides - 1, (prev[providerId] || 0) + 1),
    }));
  };

  return (
    <div className="space-y-6 p-4">
      {filteredProviders.map((provider) => {
        const slots = getAllTimeSlots(provider);
        const slotsPerView = 16;
        const currentSlide = currentSlides[provider.id] || 0;
        const startIdx = currentSlide * slotsPerView;
        const visibleSlots = slots.slice(startIdx, startIdx + slotsPerView);
        const maxSlides = Math.ceil(slots.length / slotsPerView);
        console.log(visibleSlots, "visibleSlots");

        return (
          <div
            key={provider.id}
            className="flex flex-col md:flex-row items-center  p-4 gap-4"
          >
            <div className="flex flex-col items-center md:items-start w-full md:w-1/4">
              <img
                src={provider.image}
                alt={provider.name}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shadow-sm"
              />
              <h3 className="font-semibold text-emerald-600 text-sm md:text-md underline mt-2">
                {provider.name}
              </h3>
              <div className="flex gap-2 my-1">
                <div className="flex items-center border bg-gray-100 border-gray-200 rounded-lg px-1">
                  <House className="p-[0.3rem]" />5
                </div>
                <div className="flex border bg-gray-100 border-gray-200 rounded-md px-1">
                  <Video className="p-[0.3rem]" />5
                </div>
              </div>
              <button
                onClick={() => navigate(`/provider/${provider.id}`)}
                className="underline text-orange-600 text-xs md:text-sm mt-2"
              >
                View Calendar
              </button>
            </div>

            <div className="flex w-full shadow-sm border rounded-md  overflow-x-auto">
              <button
                className="p-2 mr-1 bg-gray-200 disabled:opacity-50"
                onClick={() => handlePrevSlide(provider.id)}
                disabled={currentSlide === 0}
              >
                <LeftOutlined />
              </button>
              <div className=" py-2 grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-4 gap-4 w-full">
                {visibleSlots.map((time) => {
                  const type = getSlotType(time, provider.availabilities[0]);
                  const typeClasses = {
                    online: "bg-green-500 text-white hover:bg-blue-200",
                    offline: "bg-blue-600 text-white hover:bg-purple-200",
                    mixed: "bg-green-500 text-white hover:bg-green-200",
                    blocked: "bg-red-500 text-white hover:bg-gray-200",
                    available:
                      "bg-white border border-gray-200 text-white hover:bg-gray-50",
                  };
                  return (
                    <div
                      key={time}
                      className={`flex items-center justify-center p-2 rounded-sm text-xs  md:text-sm ${typeClasses[type]}`}
                    >
                      {time}
                    </div>
                  );
                })}
              </div>
              <button
                className="p-2 -ml-2 bg-gray-200  disabled:opacity-50"
                onClick={() => handleNextSlide(provider.id, maxSlides)}
                disabled={currentSlide >= maxSlides - 1}
              >
                <RightOutlined />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProviderSchedule;
