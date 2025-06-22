"use client"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChannelDropdown from "@/components/ChannelDropdown";
import info from "@/data/dashboard/logging/info.json";
import CheckboxGroup from "@/components/CheckboxGroup";
import { fetchTableData } from "@/utils/fetchTableData";
import { fetchDiscordChannels } from "@/utils/fetchDiscordChannels";
import { handleChange, handleReset, handleSave } from "@/utils/handleTableData";
import DashboardCards from "@/components/DashboardCards";
import DashboardButtons from "@/components/DashboardButtons";

export default function Logging() {
  const [initialTableData, setInitialTableData] = useState<any>(null);
  const [tableData, setTableData] = useState<any>(null);
  const [changedData, setChangedData] = useState<Record<string, any>>({});
  const [channels, setChannels] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const guildId = pathSegments[3] || "";
  const tableName = "GuildSettings";

  useEffect(() => {
    if (!guildId) return;
    
    const fetchData = async () => {
      try {
        const tableData = await fetchTableData(tableName, guildId);
        setTableData(tableData[0]);
        setInitialTableData(tableData[0]);

        const channelsData = await fetchDiscordChannels(guildId);
        setChannels(channelsData);
      } catch (error: any) {
        console.error(`Error fetching data for guild "${guildId}":`, guildId);
        setError(error.message);
      }
    };

    fetchData();
  }, [guildId]);

  const callHandleChange = (key: string, value: string | string[] | number | boolean | null, type?: string) => {
    handleChange(setTableData, initialTableData, setChangedData, key, value, type);
  }
  
  return (
    <article className="flex flex-col px-8 mt-20 pb-30 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard Logging</h1>
      <p>Guild ID: <span className="font-mono text-blue-400">{guildId || "N/A"}</span></p>
      {error && <p className="text-red-500">Error: {error}</p>}
      {tableData && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 auto-cols-fr mt-6">
          <DashboardCards id="message" title="Message Logging">
            <ChannelDropdown
              label="Log Channel Selection"
              value={tableData.messageLogging}
              onChange={(value) => callHandleChange( "messageLogging", value)}
              channels={channels}
            />
            <CheckboxGroup
              label="Log Event Options"
              configKey="message"
              value={tableData.messageConfig}
              onChange={(newVal) => callHandleChange("messageConfig", newVal)}
              configData={info}
            />
          </DashboardCards>
          <DashboardCards id="member" title="Member Logging" extraClass="lg:row-span-2">
            <ChannelDropdown
              label="Log Channel Selection"
              value={tableData.memberLogging}
              onChange={(value) => callHandleChange("memberLogging", value)}
              channels={channels}
            />
            <CheckboxGroup
              label="Log Event Options"
              configKey="member"
              value={tableData.memberConfig}
              onChange={(newVal) => callHandleChange("memberConfig", newVal)}
              configData={info}
            />
          </DashboardCards>
          <DashboardCards id="server" title="Server Logging" extraClass="lg:row-span-2">
            <ChannelDropdown
              label="Log Channel Selection"
              value={tableData.serverLogging}
              onChange={(value) => callHandleChange("serverLogging", value)}
              channels={channels}
            />
            <CheckboxGroup
              label="Log Event Options"
              configKey="server"
              value={tableData.serverConfig}
              onChange={(newVal) => callHandleChange("serverConfig", newVal)}
              configData={info}
            />
          </DashboardCards>
          <DashboardCards id="voice" title="Voice Logging">
            <ChannelDropdown
                label="Log Channel Selection"
                value={tableData.voiceLogging}
                onChange={(value) => callHandleChange("voiceLogging", value)}
                channels={channels}
              />  
              <CheckboxGroup
                label="Log Event Options"
                configKey="voice"
                value={tableData.voiceConfig}
                onChange={(newVal) => callHandleChange("voiceConfig", newVal)}
                configData={info}
              />
          </DashboardCards>
          <DashboardCards id="join-leave" title="Join/Leave Logging">
            <ChannelDropdown
                label="Log Channel Selection"
                value={tableData.joinLeaveLogging}
                onChange={(value) => callHandleChange("joinLeaveLogging", value)}
                channels={channels}
              />
              <CheckboxGroup
                label="Log Event Options"
                configKey="joinLeave"
                value={tableData.joinLeaveConfig}
                onChange={(newVal) => callHandleChange("joinLeaveConfig", newVal)}
                configData={info}
              />
          </DashboardCards>
          <DashboardCards id="report-ignore" title="" extraClass="2xl:col-span-2">
            <div id="report">
              <h2 className="text-xl font-bold mb-2">Report Logging</h2>
              <ChannelDropdown
                label="Log Channel Selection"
                value={tableData.reportLogging}
                onChange={(value) => callHandleChange("reportLogging", value)}
                channels={channels}
              />
            </div>
            <div id="ignore">
              <h2 className="text-xl font-bold mb-2">Ignore Logging</h2>
              <ChannelDropdown
                label="Channel Selection"
                value={JSON.parse(tableData.ignoreLogging).map((item: any) => item.channelId) || []}
                onChange={(value) => callHandleChange("ignoreLogging", value, "channel")}
                channels={channels}
                multiSelect={true}
              />
            </div>
          </DashboardCards>
          {/* Action buttons */}
          <div className="col-span-full flex justify-center">
            <DashboardButtons
              hasChanges={Object.keys(changedData).length > 0}
              onSave={() => handleSave(changedData, setInitialTableData, tableName, guildId)}
              onReset={() => handleReset(setTableData, initialTableData, setChangedData)}
            />
          </div>
        </div>
      )}
    </article>
  );
}