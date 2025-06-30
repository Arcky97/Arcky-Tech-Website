"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ChannelDropdown from "@/components/ChannelDropdown";
import { fetchTableData } from "@/utils/fetchTableData";
import { fetchDiscordRoles } from "@/utils/fetchDiscordRoles";
import { fetchDiscordChannels } from "@/utils/fetchDiscordChannels";
import DashboardCards from "@/components/DashboardCards";
import { handleChange, handleReset, handleSave, handleSaveMember } from "@/utils/handleTableData";
import ToggleSwitch from "@/components/ToggleSwitch";
import DashboardButtons from "@/components/DashboardButtons";
import EmbedPreview from "@/components/EmbedPreview";
import EmbedBuilder from "@/components/EmbedBuilder";
import ColorButton from "@/components/ColorButton";
import DashboardTable from "@/components/DashboardTable";
import InputNumber from "@/components/InputNumber";
import RoleDropdown from "@/components/RoleDropdown";
import ItemDropdown from "@/components/ItemDropdown";
import { fetchDiscordMembers } from "@/utils/fetchDiscordMembers";
import UserLevelModifier from "@/components/UserLevelModifier";

export default function Levels() {
  const [initialTableData, setInitialTableData] = useState<any>(null);
  const [tableData, setTableData] = useState<any>(null);
  const [changedData, setChangedData] = useState<Record<string, any>>({});;
  const [roles, setRoles] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [membersData, setMembersData] = useState<any[]>([]);
  const [levelSystem, setLevelSystem] = useState<any>([]);
  const [userModify, setUserModify] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [embedBuilderMode, setEmbedBuilderMode] = useState<"default" | "level" | "new" | null>(null);
  const [tableItem, setTableItem] = useState<{ [key: string]: any}>({});
  const [itemExist, setItemExist] = useState<{ [key: string]: string | null}>({});

  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const guildId = pathSegments[3] || "";
  const tableName = "LevelSettings";

  useEffect(() => {
    if (!guildId) return;

    const fetchData = async () => {
      try {
        const tableData = await fetchTableData(tableName, guildId);
        setTableData(tableData[0]);
        setInitialTableData(tableData[0]);

        const rolesData = await fetchDiscordRoles(guildId);
        setRoles(rolesData);

        const channelsData = await fetchDiscordChannels(guildId);
        setChannels(channelsData);

        const premiumData = await fetchTableData('PremiumUsersAndGuilds');
        setIsPremium(premiumData.some((data: any) => data.id === guildId));

        const membersData = await fetchDiscordMembers(guildId);
        setMembersData(membersData);

        const levelSystemData = await fetchTableData('LevelSystem', guildId);
        setLevelSystem(levelSystemData);

      } catch (error: any) {
        console.error(`Error fetching data for guild "${guildId}":`, error);
        setError(error.message);
      }
    };
    fetchData();
  }, [guildId]);

  const callHandleChange = (key: string, value: string | string[] | number | boolean | null, type?: string) => {
    handleChange(setTableData, initialTableData, setChangedData, key, value, type);
  }

  const handleEmbedAdd = (level: string) => {
    if (!level) { setItemExist((prev: any) => ({...prev, embed: "That's not a Number, please enter a valid Level!"})); return; }
    if (Number(level) < 0) { setItemExist((prev: any) => ({...prev, embed: "How dare you try to put a negative number! Shame on you!"})); return; }

    const embeds = JSON.parse(tableData.announceLevelMessages || "[]");
    if (level && !embeds.some((entry: any) => entry.lv === Number(level))) {
      embeds.push({
        lv: Number(level), 
        options: {
          title: null,
          description: null,
          imageUrl: null,
          thumbnailUrl: null,
          color: null,
          footer: {
            text: null,
            iconUrl: null
          },
          timeStamp: false
        }
      })
      setTableData((prev: any) => ({
        ...prev,
        announceLevelMessages: JSON.stringify(embeds)
      }))
      setTableItem((prev: any) => ({ ...prev, embed: {}}));
      setItemExist((prev: any) => ({...prev, embed: null}));
    } else {
      setItemExist((prev: any) => ({...prev, embed: `Level ${level} has already been added!`}));
    }
  };

  const handleEmbedUpdate = (updatedEmbed: Record<string, any>, level?: string) => {
    if (level) {
      const exisitingEmbeds = JSON.parse(tableData.announceLevelMessages || "[]");
      const updatedEmbeds = exisitingEmbeds.map((entry: any) => 
        entry.lv === level ? { ...entry, options: updatedEmbed } : entry
      );

      setTableData((prev: any) => ({
        ...prev,
        announceLevelMessages: JSON.stringify(updatedEmbeds)
      }));
    } else {
      const newEmbedString = JSON.stringify(updatedEmbed);
      setTableData((prev: any) => ({
        ...prev, 
        announceDefaultMessage: newEmbedString
      }));
    }
  };

  const handleEmbedDelete = (entryToDelete: any) => {
    const existingEmbeds = JSON.parse(tableData.announceLevelMessages || "[]");
    const filteredEmbeds = existingEmbeds.filter((entry: any) => entry.lv !== entryToDelete.lv);

    setTableData((prev: any) => ({
      ...prev, 
      announceLevelMessages: JSON.stringify(filteredEmbeds)
    }));
  };

  const handleRewardAdd = (reward: any) => {
    if (!reward.level) { 
      setItemExist((prev: any) => ({ 
        ...prev, 
        reward: "That's not a Number, please enter a valid Reward Level"
      }));
      return;
    }
    if (Number(reward.level) < 0) {
      setItemExist((prev: any) => ({
        ...prev,
        reward: "That's brave! Try that again I dare you!"
      }));
      return;
    }
    const rewardRoles = JSON.parse(tableData.levelRoles || "[]");
    if (reward.level && reward.roleId && !rewardRoles.some((entry: any) => entry.level === reward.level)) {
      rewardRoles.push(reward);
      setTableData((prev: any) => ({
        ...prev,
        levelRoles: JSON.stringify(rewardRoles)
      }))
      setTableItem((prev: any) => ({ ...prev, reward: {}}))
      setItemExist((prev: any) => ({ ...prev, reward: null}))
    }
  }

  const handleRewardDelete = (entryToDelete: any) => {
    const existingRewards = JSON.parse(tableData.levelRoles || "[]");
    const filteredRewards = existingRewards.filter((entry: any) => entry.level !== entryToDelete.level);

    setTableData((prev: any) => ({
      ...prev,
      levelRoles: JSON.stringify(filteredRewards)
    }));
  }

  const handlemultiplierAdd = (type: string, mult: any) => {
    const shortItem = type === "category" ? "cat" : type === "channel" ? "chan" : "role";
    if (!mult.value) {
      setItemExist((prev: any) => ({
        ...prev,
        [`${shortItem}Mults`]: "Nice try but it won't work (for now)."
      }));
      return;
    }
    if (Number(mult.value) < 0) {
      setItemExist((prev: any) => ({
        ...prev,
        [`${shortItem}Mults`]: "Keep on dreaming, like this will ever be allowed..."
      }));
      return;
    }

    if (Number(mult.value) > 500) {
      setItemExist((prev: any) => ({
        ...prev,
        [`${shortItem}Mults`]: "That's too high, we can't make it to easy!"
      }));
      return;
    }

    const multiplier = JSON.parse(tableData[`${type}Multipliers`] || "[]");
    if (mult.value && mult[`${type}Id`] && !multiplier.some((entry: any) => entry[`${type}Id`] === mult[`${type}Id`])) {
      multiplier.push(mult);
      setTableData((prev: any) => ({
        ...prev,
        [`${type}Multipliers`]: JSON.stringify(multiplier)
      }))
      setTableItem((prev: any) => ({ ...prev, [`${shortItem}Mults`]: {}}));
      setItemExist((prev: any) => ({ ...prev, [`${shortItem}Mults`]: null}));
    }
  }

  const handleMultiplierChange = (type: string, entry: any, newValue: boolean) => {
    const multipliers = JSON.parse(tableData[`${type}Multipliers`] || "[]");
    const updated = multipliers.map((mult: any) =>
      mult[`${type}Id`] === entry[`${type}Id`] ? { ...mult, replace: newValue } : mult 
    );

    setTableData((prev: any) => ({
      ...prev,
      [`${type}Multipliers`]: JSON.stringify(updated)
    }));
  }

  const handleMultiplierDelete = (type: string, entryToDelete: any) => {
    const existingMultipliers = JSON.parse(tableData[`${type}Multipliers`] ||"[]");
    const filteredMultipliers = existingMultipliers.filter((entry: any) => entry[`${type}Id`] !== entryToDelete[`${type}Id`]);
    
    setTableData((prev: any) => ({
      ...prev,
      [`${type}Multipliers`]: JSON.stringify(filteredMultipliers)
    }));
    const shortItem = type === "category" ? "cat" : type === "channel" ? "chan" : "role";
    setItemExist((prev: any) => ({ ...prev, [`${shortItem}Mults`]: null}));
  }

  const handleUserName = (id: string) => {
    const findUser = membersData.find((member: any) => member.id === id);
    return findUser?.nickname || findUser?.globalName
  }

  const handleUserUpdate = (updatedUserData: Record<string, any>) => {
    const index = levelSystem.findIndex((user: any) => user.memberId === updatedUserData.memberId);
    if (index !== -1) {
      levelSystem[index] = { ...levelSystem[index], ...updatedUserData };
    }
    handleSaveMember(updatedUserData, "LevelSystem", guildId, updatedUserData.memberId);
  }

  console.log(changedData);
  return (
    <>
      <article className="flex flex-col px-8 mt-20 pb-30 min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-4">Dashboard Level Settings</h1>
        <p>Guild ID: <span className="font-mono text-blue-400">{guildId || "N/A"}</span></p>
        {error && <p className="text-red-500">Error: {error}</p>}
        {tableData && (
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 auto-cols-fr mt-6">
            <DashboardCards id="lvsys-announce" title="Level Announcement Settings" extraClass="lg:row-span-3 lg:col-span-2 2xl:col-span-1">
              <ChannelDropdown
                label="Announce Channel"
                value={tableData.announceChannel}
                onChange={(value) => callHandleChange("announceChannel", value)}
                channels={channels}
              />
              <ToggleSwitch 
                label="Announce Ping" 
                enabled={tableData.announcePing} 
                onChange={(value) => callHandleChange("announcePing", value)}
                className="mb-4"
              />
              <EmbedPreview label="Default Announce Message" embed={JSON.parse(tableData.announceDefaultMessage)}/>
              <ColorButton
                color="blue"
                text="Edit Embed"
                action={() => { setEmbedBuilderMode("default")}}
                className="mb-4 px-7 w-full xl:w-1/2 xl:mx-auto 2xl:w-full"
              />
              <DashboardTable
                label={"Level Announce Messages"}
                headers={["Level", "Actions"]}
                rows={JSON.parse(tableData.announceLevelMessages)
                  .sort((a: any, b: any) => a.lv - b.lv)
                  .map((entry: any) => [
                    <span key={`level-${entry.lv}`} className="font-mono">{entry.lv}</span>,
                    <div key={`actions-${entry.lv}`} className="justify-center space-x-4">
                      <ColorButton
                        color="blue"
                        text="Edit Embed"
                        action={() => {
                          setTableItem((prev) => ({
                            ...prev,
                            embed: entry
                          }))
                          setEmbedBuilderMode("level");
                        }}
                      />
                      <ColorButton
                        color="red"
                        text="Delete Embed"
                        action={() => handleEmbedDelete(entry)}
                      />
                    </div>
                  ])}
              />
              <div className="flex flex-wrap mt-4">
                <InputNumber
                  min={1}
                  step={1}
                  value={tableItem.embed?.lv || ""}
                  placeholder="Enter a level"
                  onChange={(val) => {
                    setItemExist((prev: any) => ({...prev, embed: null}));
                    setTableItem((prev) => ({ 
                      ...prev, 
                      embed: {
                        ...prev.embed,
                        lv: val
                      } 
                    }));
                  }}
                  className="w-full mb-4 xl:w-1/2 xl:pr-2"
                />
                <ColorButton
                  color="blue"
                  text="Add new Embed"
                  action={() => handleEmbedAdd(tableItem.embed?.lv)}
                  className="w-full xl:w-1/2 mb-4"
                />
              </div>
              {itemExist.embed && <p className="mb-2 text-red-500">{itemExist.embed}</p>}
            </DashboardCards>
            <DashboardCards id="lvsys-multipliers" title="Level Multipliers" extraClass="lg:row-span-4 lg:col-span-2"> 
              <InputNumber
                label="Global Multiplier"
                min={1}
                max={500}
                step={1}
                value={tableData.globalMultiplier || ""}
                placeholder="Enter percentage value"
                onChange={(val) => {
                  //setItemExist((prev: any) => ({...prev, globMults: null}));
                  callHandleChange("globalMultiplier", Number(val))
                }}
                className="w-full mb-4 xl:w-1/2 xl:pr-2"
                extraText="%"
              />
              <div className="flex mb-4">
                <ToggleSwitch
                  label="Channel Replace"
                  enabled={JSON.parse(tableData.multiplierReplace).channel}
                  onChange={(value) => 
                    callHandleChange( 
                      "multiplierReplace", 
                      JSON.stringify({ 
                        ...JSON.parse(tableData.multiplierReplace), 
                          channel: value
                      })
                    )
                  }
                />
                <ToggleSwitch
                  label="Category Replace"
                  enabled={JSON.parse(tableData.multiplierReplace).category}
                  onChange={(value) => 
                    callHandleChange(
                      "multiplierReplace", 
                      JSON.stringify({ 
                        ...JSON.parse(tableData.multiplierReplace), 
                        category: value
                      })
                    )
                  }
                />
              </div>
              <DashboardTable
                label="Category Multipliers"
                headers={["Multiplier", "Category", "Replace", "Action"]}
                rows={JSON.parse(tableData.categoryMultipliers)
                  .map((entry: any) => [
                    <span key={`mult-${entry.categoryId}`} className="font-mono">{entry.value}%</span>,
                    <span key={`cat-${entry.categoryId}`} className="font-mono">{channels.find(category => category.id === entry.categoryId)?.name}</span>,
                    <div key={`toggle-${entry.categoryId}`} className="flex justify-center">
                      <ToggleSwitch
                        label=""
                        enabled={entry.replace}
                        onChange={(value) => handleMultiplierChange('category', entry, value)}
                        className="mb-2"
                      />
                    </div>,
                    <div key={`action-${entry.categoryId}`} className="flex justify-center">
                      <ColorButton
                        color="red"
                        text="remove"
                        action={() => handleMultiplierDelete('category', entry)}
                      />
                    </div>
                  ])
                }
              />
              <div className="flex flex-wrap mt-4 items-center">
                <InputNumber
                  min={1}
                  step={1}
                  value={tableItem.catMults?.value || ""}
                  placeholder="Enter Percentage Value"
                  onChange={(val) => {
                    setItemExist((prev: any) => ({...prev, catMults: null}));
                    setTableItem((prev) => ({ 
                      ...prev, 
                      catMults: { 
                        ...prev.catMults, 
                        value: Number(val)
                      }
                    }));
                  }}
                  className="w-full mb-4 xl:w-1/2 xl:pr-2"
                  extraText="%"
                />
                <ChannelDropdown
                  label=""
                  value={tableItem.catMults?.categoryId || ""}
                  onChange={(val) => setTableItem((prev) => ({ ...prev, catMults: { ...prev.catMults, categoryId: val}}))}
                  channels={channels}
                  onlyCategories={true}
                  disItems={JSON.parse(tableData.categoryMultipliers).map((mult: any) => mult.categoryId)}
                  className="w-full xl:w-1/2 xl:pl-2"
                />
                <ColorButton
                  color="blue"
                  text="Add Category Multiplier"
                  action={() => handlemultiplierAdd("category", tableItem.catMults)}
                  className="mb-4 px-7 w-full xl:w-1/2 xl:mx-auto"
                />
              </div>
              {itemExist.catMults && <p className="mb-2 text-red-500">{itemExist.catMults}</p>}
              <DashboardTable
                label="Channel Multipliers"
                headers={["Multiplier", "Channel", "Replace", "Action"]}
                rows={JSON.parse(tableData.channelMultipliers)
                  .map((entry: any) => [
                    <span key={`mult-${entry.channelId}`} className="font-mono">{entry.value}%</span>,
                    <span key={`chan-${entry.channelId}`} className="font-mono">{channels.find(channel => channel.id === entry.channelId)?.name}</span>,
                    <div key={`toggle-${entry.channelId}`} className="flex justify-center">
                      <ToggleSwitch
                        label=""
                        enabled={entry.replace}
                        onChange={(value) => handleMultiplierChange('channel', entry, value)}
                        className="mb-2"
                      />
                    </div>,
                    <div key={`action-${entry.channelId}`} className="flex justify-center">
                      <ColorButton
                        color="red"
                        text="remove"
                        action={() => handleMultiplierDelete('channel', entry)}
                      />
                    </div>
                  ])
                }
              />
              <div className="flex flex-wrap mt-4 items-center">
                <InputNumber
                  min={1}
                  step={1} 
                  value={tableItem.chanMults?.value || ""}
                  placeholder="Enter Percentage Value"
                  onChange={(val) => {
                    setItemExist((prev: any) => ({...prev, chanMults: null}));
                    setTableItem((prev) => ({ 
                      ...prev, 
                      chanMults: { 
                        ...prev.chanMults, 
                        value: Number(val)
                      }
                    }));
                  }}
                  className="w-full mb-4 xl:w-1/2 xl:pr-2"
                  extraText="%"
                />
                <ChannelDropdown
                  label=""
                  value={tableItem.chanMults?.channelId || ""}
                  onChange={(val) => setTableItem((prev) => ({ ...prev, chanMults: { ...prev.chanMults, channelId: val}}))}
                  channels={channels}
                  disItems={JSON.parse(tableData.channelMultipliers).map((mult: any) => mult.channelId)}
                  className="w-full xl:w-1/2 xl:pl-2"
                />
                <ColorButton
                  color="blue"
                  text="Add Channel Multiplier"
                  action={() => handlemultiplierAdd("channel", tableItem.chanMults)}
                  className="mb-4 px-7 w-full xl:w-1/2 xl:mx-auto"
                />
              </div>
              {itemExist.chanMults && <p className="mb-2 text-red-500">{itemExist.chanMults}</p>}
              <DashboardTable
                label="Role Multipliers"
                headers={["Multiplier", "Role", "Action"]}
                rows={JSON.parse(tableData.roleMultipliers)
                  .map((entry: any) => [
                    <span key={`mult-${entry.roleId}`} className="font-mono">{entry.value}%</span>,
                    <span key={`role-${entry.roleId}`} className="font-mono">{roles.find(role => role.id === entry.roleId)?.name}</span>,
                    <div key={`action-${entry.roleId}`} className="flex justify-center">
                      <ColorButton
                        color="red"
                        text="Remove"
                        action={() => handleMultiplierDelete('role', entry)}
                      />
                    </div>
                  ])
                }
              />
              <div className="flex flex-wrap mt-4 items-center">
                <InputNumber
                  min={1}
                  step={1}
                  value={tableItem.roleMults?.value || ""}
                  placeholder="Enter Percentage Value"
                  onChange={(val) => {
                    setItemExist((prev: any) => ({...prev, roleMults: null}));
                    setTableItem((prev) => ({ 
                      ...prev, 
                      roleMults: { 
                        ...prev.roleMults, 
                        value: Number(val)
                      }
                    }));
                  }}
                  className="w-full mb-4 xl:w-1/2 xl:pr-2"
                  extraText="%"
                />
                <RoleDropdown
                  label=""
                  value={tableItem.roleMults?.roleId || ""}
                  onChange={(val) => setTableItem((prev) => ({ ...prev, roleMults: { ...prev.roleMults, roleId: val}}))}
                  roles={roles}
                  disItems={JSON.parse(tableData.roleMultipliers).map((mult: any) => mult.roleId)}
                  className="w-full xl:w-1/2 xl:pl-2"
                />
                <ColorButton
                  color="blue"
                  text="Add Role Multiplier"
                  action={() => handlemultiplierAdd("role", tableItem.roleMults)}
                  className="mb-4 px-7 w-full xl:w-1/2 xl:mx-auto"
                />
              </div>
              {itemExist && <p className="mb-2 text-red-500">{itemExist.roleMults}</p>}
            </DashboardCards>          
            <DashboardCards id="lvsys-blacklist" title="Level Black List Settings">
              <ChannelDropdown
                label="Blacklist Categories"
                value={JSON.parse(tableData.blackListCategories).map((item: any) => item.categoryId) || []}
                onChange={(value) => callHandleChange("blackListCategories", value, "category")}
                channels={channels}
                multiSelect={true}
                onlyCategories={true}
              />
              <ChannelDropdown
                label="Blacklist Channels"
                value={JSON.parse(tableData.blackListChannels).map((item: any) => item.channelId) || []}
                onChange={(value) => callHandleChange("blackListChannels", value, "channel")}
                channels={channels}
                multiSelect={true}
              />
              <RoleDropdown
                label="Blacklist Roles"
                value={JSON.parse(tableData.blackListRoles).map((item: any) => item.roleId) || []}
                onChange={(value) => callHandleChange("blackListRoles", value, "role")}
                roles={roles}
                multiSelect={true}
              />
            </DashboardCards>
            <DashboardCards id="lvsys-roles" title="Level Reward Roles Settings" extraClass="lg:row-span-2">
              <DashboardTable
                label={"Reward Roles"}
                headers={["Level", "Role", "Action"]}
                rows={JSON.parse(tableData.levelRoles)
                  .sort((a: any, b: any) => a.level - b.level)
                  .map((entry: any) => [
                    <span key={`level-${entry.level}`} className="font-mono">{entry.level}</span>,
                    <span key={`role-${entry.level}`} className={`font-mono`}>{roles.find(role => role.id === entry.roleId)?.name}</span>,
                    <div key={`actions-${entry.level}`} className="justify-center space-x-4">
                      <ColorButton
                        color="red"
                        text="Remove"
                        action={() => {
                          handleRewardDelete(entry)
                        }}
                        className=""
                      />
                    </div>
                  ])
                }
              />
              <div className="flex flex-wrap mt-4 items-center">
                <InputNumber
                  min={1}
                  step={1}
                  value={tableItem.reward?.level || ""}
                  placeholder="Enter a level"
                  onChange={(val) => {
                    setTableItem((prev) => ({ 
                      ...prev, 
                      reward: { 
                        ...prev.reward, 
                        level: Number(val)
                      }
                    }));
                  }}
                  className="w-full mb-4 xl:w-1/2 xl:pr-2"
                />
                <RoleDropdown
                  label=""
                  value={tableItem.reward?.roleId || ""}
                  onChange={(val) => setTableItem((prev) => ({ ...prev, reward: { ...prev.reward, roleId: val}}))}
                  roles={roles}
                  disItems={JSON.parse(tableData.levelRoles).map((reward: any) => reward.roleId)}
                  className="w-full xl:w-1/2 xl:pl-2"
                />
                <ColorButton
                  color="blue"
                  text="Add Level Reward"
                  action={() => handleRewardAdd(tableItem.reward)}
                  className="mb-4 px-7 w-full "
                />
              </div>
              {itemExist.reward && <p className="mb-2 text-red-500">{itemExist.reward}</p>}
              <ToggleSwitch 
                label="Role Replace" 
                enabled={tableData.roleReplace} 
                onChange={(value) => callHandleChange("roleReplace", value)}
              />
            </DashboardCards>
            <DashboardCards id="lvsys-voice" title="Level Voice Settings">
              <ToggleSwitch
                label="Enable Voice XP"
                enabled={JSON.parse(tableData.voiceEnable)}
                onChange={(value) => callHandleChange("voiceEnable", value)}
                className="mb-4"
              />
              <div className="flex flex-wrap">
                <InputNumber
                  label="Voice Cooldown"
                  min={10} 
                  max={300}
                  step={1}
                  value={tableData.voiceCooldown}
                  placeholder="Enter Cooldown value"
                  onChange={(val) => callHandleChange("voiceCooldown", Number(val))}
                  className="w-full mb-4 xl:w-1/2 xl:pr-2"
                  extraText="Seconds"
                />
                <InputNumber
                  label="Voice Multiplier"
                  min={1}
                  max={500}
                  step={1}
                  value={tableData.voiceMultiplier}
                  placeholder="Enter Percentage value"
                  onChange={(val) => callHandleChange("voiceMultiplier", Number(val))} 
                  className="w-full mb-4 xl:w-1/2 xl:pl-2"
                  extraText="%"
                />
              </div>
            </DashboardCards>
            <DashboardCards id="lvsys-xp" title="Level XP Settings" extraClass="lg:col-span-2 2xl:col-span-1">
              <InputNumber
                label="XP Cooldown"
                min={1}
                max={60}
                step={1}
                value={tableData.xpCooldown}
                placeholder="Enter Cooldown value"
                onChange={(val) => callHandleChange("xpCooldown", Number(val))}
                className="w-full mb-4"
                extraText="Seconds"
              />
              <div className="flex flex-wrap">
                <InputNumber
                  label="XP Step"
                  min={10}
                  max={200}
                  step={1}
                  value={JSON.parse(tableData.xpSettings).step} 
                  placeholder="Enter Step Value"
                  onChange={(val) => 
                    callHandleChange(
                      "xpSettings",
                      JSON.stringify({
                        ...JSON.parse(tableData.xpSettings),
                        step: Number(val)
                      })
                    )
                  }
                  className="w-full mb-4 xl:w-1/3 xl:pr-2"
                />
                <InputNumber
                  label="Minimum XP"
                  min={1} 
                  max={100}
                  step={1} 
                  value={JSON.parse(tableData.xpSettings).min}
                  placeholder="Enter Min XP Value" 
                  onChange={(val) => 
                    callHandleChange(
                      "xpSettings",
                      JSON.stringify({
                        ...JSON.parse(tableData.xpSettings),
                        min: Number(val)
                      })
                    )
                  }
                  className="w-full mb-4 xl:w-1/3 xl:px-2"
                />
                <InputNumber
                  label="Maximum XP" 
                  min={1} 
                  max={100}
                  step={1} 
                  value={JSON.parse(tableData.xpSettings).max} 
                  placeholder="Enter Max XP value"
                  onChange={(val) => 
                    callHandleChange(
                      "xpSettings",
                      JSON.stringify({
                        ...JSON.parse(tableData.xpSettings),
                        max: Number(val)
                      })
                    )
                  }
                  className="w-full mb-4 xl:w-1/3 xl:pl-2"
                />
              </div>
              {isPremium && 
                <div className="flex flex-wrap">
                  <InputNumber
                    label="Minimum Length"
                    min={1} 
                    max={150} 
                    step={1} 
                    disabled={tableData.xpType !== 'length'}
                    value={JSON.parse(tableData.xpSettings).minLength}
                    placeholder="Enter Min Message Length"
                    onChange={(val) => 
                      callHandleChange(
                        "xpSettings",
                        JSON.stringify({
                          ...JSON.parse(tableData.xpSettings),
                          minLength: Number(val)
                        })
                      )
                    }
                    className="w-full mb-4 xl:w-1/2 xl:pr-2"
                  />
                  <InputNumber
                    label="Maximum Length"
                    min={1} 
                    max={150}
                    step={1} 
                    disabled={tableData.xpType !== 'length'}
                    value={JSON.parse(tableData.xpSettings).maxLength}
                    placeholder="Enter Max Message Length" 
                    onChange={(val) =>
                      callHandleChange(
                        "xpSettings", 
                        JSON.stringify({
                          ...JSON.parse(tableData.xpSettings),
                          maxLength: Number(val) 
                        })
                      )
                    }
                    className="w-full mb-4 xl:w-1/2 xl:pl-2"
                  />
                </div>
                }
                <ItemDropdown
                  label="XP Type"
                  value={tableData.xpType}
                  disabled={!isPremium}
                  onChange={(val) => {callHandleChange("xpType", val)}}
                  items={["random", "length"]}
                />
                <ToggleSwitch
                  label="Clear XP on leave"
                  enabled={JSON.parse(tableData.clearOnLeave)}
                  onChange={(value) => callHandleChange("clearOnLeave", value)}
                  className="mb-4"
                />
            </DashboardCards>
            <DashboardCards id="modify-xp" title="Modify XP and Level" extraClass="lg:col-span-2">
              <DashboardTable
                label={""}
                headers={["Rank", "User", "Level", "XP", "Action"]}
                rows={levelSystem
                  .sort((a: any, b:any) => b.xp - a.xp)
                  .map((user: any, index: any) => [
                    <span>{index + 1}</span>,
                    <span>{handleUserName(user.memberId)}</span>,
                    <span>{user.level}</span>,
                    <span>{user.xp}</span>,
                    <div key={`user-${user.memberId}`} className="justify-center space-x-4">
                      <ColorButton
                        color="blue"
                        text="Modify"
                        action={() => {
                          setTableItem((prev) => ({
                            ...prev,
                            userLevel: user
                          }))
                          setUserModify(true);
                        }}
                      />
                    </div>
                  ]) 
                }
              />
            </DashboardCards>
            {/* Action Buttons */}
            <div className="col-span-full flex justify-center">
              <DashboardButtons
                hasChanges={Object.keys(changedData).length > 0}
                onSave={() => handleSave(changedData, setInitialTableData, tableName, guildId)}
                onReset={() => handleReset(setTableData, initialTableData, setChangedData, setItemExist, setTableItem)}
              />
            </div>
          </div>
        )}
      </article>
      {/* Embed Builder */}
      {embedBuilderMode && (
        <EmbedBuilder
          embed={
            embedBuilderMode === "default"
              ? JSON.parse(tableData.announceDefaultMessage)
              : embedBuilderMode === "level"
              ? tableItem.embed.options 
              : { title: "", description: "", color: "", footer: { text: "", iconUrl: ""} }
          }
          level = {embedBuilderMode === "level" ? tableItem.embed.lv : null}
          onClose={() => {
            setEmbedBuilderMode(null);  
            setTableItem((prev: any) => ({
              ...prev, 
              embed: {}
            })
          )}}
          onSave={handleEmbedUpdate}
        />
      )}
      {/* User Level System Modifier */}
      {userModify && (
        <UserLevelModifier
          user={tableItem.userLevel}
          name={handleUserName(tableItem.userLevel.memberId)}
          settings={JSON.parse(tableData.xpSettings)}
          onClose={() => {setUserModify(false);
            setTableItem((prev: any) => ({
              ...prev, 
              userLevel: {}
            }))
          }}
          onSave={handleUserUpdate}
        />
      )}
    </>
  );
}