"use client";

import { useState } from "react";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState<
    "General" | "Security" | "Appearance" | "Notifications"
  >("General");

  const [toggles, setToggles] = useState({
    admin2FA: false,
    faculty2FA: false,
    student2FA: true,
    requireUpper: false,
    requireNumber: false,
    requireSpecial: false,
  });

  return (
    <div className="p-8 bg-[#fdf9f6] min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">System Settings</h1>

      <div className="flex space-x-4 mb-6 border-b">
        {["General", "Security", "Appearance", "Notifications"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === tab
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "General" && (
        <div className="bg-white rounded-md shadow p-6 space-y-6">
          <section>
            <h2 className="text-lg font-medium">Institution Details</h2>
            <p className="text-sm text-gray-500 mb-4">
              Manage your institution&apos;s basic information
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <Info
                label="Institution Name"
                value="Academic Nexus University"
              />
              <Info label="Institution Domain" value="academic-nexus.edu" />
              <Info
                label="Administrator Email"
                value="admin@academic-nexus.edu"
              />
              <Info label="Time Zone" value="UTC-5 (Eastern Standard Time)" />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium">Academic Calendar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
              <DateInput label="Current Term Start Date" value="2023-09-01" />
              <DateInput label="Current Term End Date" value="2023-12-15" />
            </div>
          </section>

          <section className="flex items-center justify-between mt-6">
            <div>
              <h2 className="text-sm font-medium">System Maintenance Mode</h2>
              <p className="text-xs text-gray-500">
                When enabled, only administrators can access the system
              </p>
            </div>
            <Toggle />
          </section>

          <div className="text-right">
            <button className="bg-[#e6e4d8] px-6 py-2 rounded-md text-sm font-medium shadow">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === "Security" && (
        <div className="bg-white rounded-md shadow p-6 space-y-6">
          <p className="text-sm text-blue-700">
            Security Settings: Configure system security and authentication
            settings
          </p>

          <ToggleSetting
            label="Two-Factor Authentication"
            subtext="Require 2FA for all administrative users"
            enabled={toggles.admin2FA}
            onToggle={() =>
              setToggles({ ...toggles, admin2FA: !toggles.admin2FA })
            }
          />
          <ToggleSetting
            label="Two-Factor Authentication"
            subtext="Require 2FA for all faculty users"
            enabled={toggles.faculty2FA}
            onToggle={() =>
              setToggles({ ...toggles, faculty2FA: !toggles.faculty2FA })
            }
          />
          <ToggleSetting
            label="Two-Factor Authentication"
            subtext="Require 2FA for all student users"
            enabled={toggles.student2FA}
            onToggle={() =>
              setToggles({ ...toggles, student2FA: !toggles.student2FA })
            }
            color="blue"
          />

          <div className="mt-6">
            <h2 className="text-lg font-medium">Password Policy</h2>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Minimum Password Length
              </label>
              <input
                type="number"
                defaultValue={10}
                className="w-full bg-[#fdf9f6] border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <CheckOption
                label="Require Uppercase Letters"
                checked={toggles.requireUpper}
                onChange={() =>
                  setToggles({
                    ...toggles,
                    requireUpper: !toggles.requireUpper,
                  })
                }
              />
              <CheckOption
                label="Require Numbers"
                checked={toggles.requireNumber}
                onChange={() =>
                  setToggles({
                    ...toggles,
                    requireNumber: !toggles.requireNumber,
                  })
                }
              />
              <CheckOption
                label="Require Special Characters"
                checked={toggles.requireSpecial}
                onChange={() =>
                  setToggles({
                    ...toggles,
                    requireSpecial: !toggles.requireSpecial,
                  })
                }
              />
            </div>
          </div>

          <div className="text-right">
            <button className="bg-[#e6e4d8] hover:bg-[#dad8cc] px-6 py-2 rounded-md text-sm font-medium shadow">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === "Appearance" && (
        <div className="bg-white rounded-md shadow p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-lg font-semibold">Appearance Settings</h2>
            <p className="text-sm text-gray-500">
              Customize the look and feel of your Academic Nexus instance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Primary Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  defaultValue="#9b87f5"
                  className="w-10 h-10 border rounded-md"
                />
                <input
                  type="text"
                  defaultValue="#9b87f5"
                  className="w-full px-3 py-2 text-sm border rounded-md bg-[#fdf9f6]"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Secondary Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  defaultValue="#7e69ab"
                  className="w-10 h-10 border rounded-md"
                />
                <input
                  type="text"
                  defaultValue="#7e69ab"
                  className="w-full px-3 py-2 text-sm border rounded-md bg-[#fdf9f6]"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-1">Institution Logo</h3>
            <div className="flex items-center space-x-4">
              <div className="bg-[#f0f0df] text-gray-500 px-6 py-4 rounded-md text-sm">
                Logo
              </div>
              <button className="border px-4 py-2 rounded-md text-sm font-medium">
                Upload New Logo
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Recommended size: 200x200 pixels. Max file size: 2MB.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium">Dark Mode</h4>
              <p className="text-gray-500">
                Allow users to switch to dark mode
              </p>
            </div>

            <div>
              <h4 className="font-medium">Custom CSS</h4>
              <p className="text-gray-500">
                Allow custom CSS for advanced theming
              </p>
            </div>
          </div>

          <div className="text-right">
            <button className="bg-[#e6e4d8] hover:bg-[#dad8cc] px-6 py-2 rounded-md text-sm font-medium shadow">
              Save Changes
            </button>
          </div>
        </div>
      )}
      {activeTab === "Notifications" && (
        <div className="bg-white rounded-md shadow p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Notification Settings</h2>
            <p className="text-sm text-gray-500">
              Configure system-wide notification preferences
            </p>
          </div>

          <div className="border p-4 rounded-md space-y-4">
            <h3 className="font-semibold">Email Notifications</h3>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Course Announcements</h4>
                <p className="text-sm text-gray-500">
                  Send emails for new course announcements
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-sm bg-[#f0efd8]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Assignment Due Dates</h4>
                <p className="text-sm text-gray-500">
                  Send reminders for upcoming assignments
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-sm bg-[#f0efd8]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Grade Updates</h4>
                <p className="text-sm text-gray-500">
                  Send emails when new grades are posted
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-sm bg-[#f0efd8]"
              />
            </div>
          </div>

          <div className="bg-[#fefbf7] p-4 rounded-md flex items-center justify-between">
            <div>
              <h4 className="font-medium">System Maintenance Alerts</h4>
              <p className="text-sm text-gray-500">
                Send notifications about scheduled maintenance
              </p>
            </div>
            <input type="checkbox" className="toggle toggle-sm bg-[#f0efd8]" />
          </div>

          <div className="text-right">
            <button className="bg-[#f0efd8] hover:bg-[#e3e0c8] px-6 py-2 rounded-md text-sm font-medium shadow">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemSettings;

interface InfoProps {
  label: string;
  value: string;
}
const Info: React.FC<InfoProps> = ({ label, value }) => (
  <div>
    <div className="text-gray-500">{label}</div>
    <div className="text-blue-700">{value}</div>
  </div>
);

interface DateInputProps {
  label: string;
  value: string;
}
const DateInput: React.FC<DateInputProps> = ({ label, value }) => (
  <div>
    <label className="text-gray-500 mb-1 block">{label}</label>
    <input
      type="date"
      defaultValue={value}
      className="w-full border border-gray-200 rounded-md px-3 py-2 bg-[#fdf9f6] text-sm"
    />
  </div>
);

const Toggle: React.FC = () => (
  <div className="w-10 h-5 bg-black rounded-full relative cursor-pointer">
    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 transition-all"></div>
  </div>
);

interface ToggleProps {
  label: string;
  subtext: string;
  enabled: boolean;
  onToggle: () => void;
  color?: string;
}
const ToggleSetting: React.FC<ToggleProps> = ({
  label,
  subtext,
  enabled,
  onToggle,
  color,
}) => {
  const bgColor = enabled
    ? color === "blue"
      ? "bg-blue-400"
      : "bg-yellow-100"
    : "bg-gray-200";

  const knobTranslate = enabled ? "translate-x-5" : "translate-x-0";

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-sm text-blue-600">{subtext}</div>
      </div>
      <div
        className={`w-10 h-5 ${bgColor} rounded-full relative cursor-pointer transition-all`}
        onClick={onToggle}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${knobTranslate}`}
        ></div>
      </div>
    </div>
  );
};

const CheckOption: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, checked, onChange }) => (
  <div
    className="flex items-center justify-between cursor-pointer"
    onClick={onChange}
  >
    <span className="font-medium">{label}</span>
    <div
      className={`w-10 h-5 ${
        checked ? "bg-yellow-100" : "bg-gray-200"
      } rounded-full relative`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white absolute top-0.5 ${
          checked ? "left-5 -translate-x-full" : "left-0.5"
        } transition-all`}
      />
    </div>
  </div>
);
