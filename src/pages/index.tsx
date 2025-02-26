import { useEffect, useState } from "react";
import {
  UnorderedListOutlined,
  CalendarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Select, Button, Space, Card, Empty, Spin } from "antd";
import ProviderSchedule from "@/components/ProviderSchedule";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  fetchProviders,
  setSearchQuery,
  setSelectedService,
  setSelectedType,
  setSelectedCenter,
  setView,
  // setSelectedDate,
} from "@/store/providerSlice";
import type { AppDispatch } from "@/store/store";
import DateChange from "@/components/DateChange";

const { Option } = Select;

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    providers,
    loading,
    filters,
    view,
    selectedDate: abc,
  } = useSelector((state: RootState) => state.providers);
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    dispatch(fetchProviders());
    console.log("object");
  }, [dispatch]);

  const clinics = [
    ...new Set(providers?.map((p) => p.clinic_details.name) || []),
  ];
  const types = [...new Set(providers?.map((p) => p.provider_usertype) || [])];

  const filteredProviders = providers?.filter((provider) => {
    const matchesSearch = provider.name
      .toLowerCase()
      .includes(filters.searchQuery.toLowerCase());
    const matchesType =
      filters.selectedType === "all" ||
      provider.provider_usertype === filters.selectedType;
    const matchesCenter =
      filters.selectedCenter === "all" ||
      provider.clinic_details.name === filters.selectedCenter;
    return matchesSearch && matchesType && matchesCenter;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Provider Calendar</h1>
            <Space>
              <Button
                type={view === "list" ? "primary" : "default"}
                icon={<UnorderedListOutlined />}
                onClick={() => dispatch(setView("list"))}
              />
              <Button
                type={view === "calendar" ? "primary" : "default"}
                icon={<CalendarOutlined />}
                onClick={() => dispatch(setView("calendar"))}
              />
            </Space>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-3 space-y-4">
            <Select
              className="w-full mb-4"
              value={filters.selectedService}
              onChange={(value) => dispatch(setSelectedService(value))}
            >
              <Option value="all">All services</Option>
              <Option value="consultation">Consultation</Option>
              <Option value="therapy">Therapy</Option>
            </Select>

            <Select
              className="w-full mb-4"
              value={filters.selectedType}
              onChange={(value) => dispatch(setSelectedType(value))}
            >
              <Option value="all">All types</Option>
              {types.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>

            <Select
              className="w-full mb-4"
              value={filters.selectedCenter}
              onChange={(value) => dispatch(setSelectedCenter(value))}
            >
              <Option value="all">All centres</Option>
              {clinics.map((clinic) => (
                <Option key={clinic} value={clinic}>
                  {clinic}
                </Option>
              ))}
            </Select>

            <Input
              prefix={<SearchOutlined className="text-gray-400" />}
              placeholder="Search provider"
              value={filters.searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-2">
              You can search up to 5 providers to view their availability
              specifically.
            </p>
          </Card>
          <div className="lg:col-span-9">
            <div className="my-6">
              <DateChange
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
              />
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Spin size="large" />
              </div>
            ) : filteredProviders && filteredProviders.length > 0 ? (
                <ProviderSchedule filteredProviders={filteredProviders} />
            ) : (
              <Empty description="No providers found" />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
