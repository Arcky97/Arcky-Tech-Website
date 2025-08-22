"use client";

import ColorButton from "@/components/ColorButton";

const INVITE_BASE = "https://discord.com/oauth2/authorize";
const CLIENT_ID = "1270100901067100230";
const REDIRECT_URI = encodeURIComponent("https://www.arcky-tech.be/api/auth/server");
const PERMISSIONS = "10191898143990";

export default function DoggoBot() {
  const divClass = "bg-gray-800 p-6 rounded-lg shadow-lg w-[100%] md:w-[45%] 2xl:w-[31%] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50 hover:ring-2 hover:ring-blue-500"
  const ulClass = "text-base font-normal text-left marker:text-white mt-2"
  const liClass = "ml-6 text-gray-300 leading-relaxed text-md mb-2 break-words"

  return (
    <article className="flex flex-col items-center min-h-[calc(100vh-189px)] bg-gray-900 text-white">
      <section className="text-center p-8 w-7/8 lg:w-6/8">
        <h1 className="head1">Doggo Bot</h1>
        <p className="text-base mb-6">Doggo Bot is a Discord Bot made with node.js and the Discord API.</p>
        <ColorButton
          href={`${INVITE_BASE}?client_id=${CLIENT_ID}&scope=bot+applications.commands&permissions=${PERMISSIONS}&redirect_uri=${REDIRECT_URI}&response_type=code`}
          text="Invite Doggo Bot"
          color="green-500"
        />
        <p className="text-base my-6">Invite Doggo Bot to your Discord Server to get started and enjoy the rich Features of Doggo Bot.</p>
        <hr className="border-gray-600/75"/>
      </section>
      <section className="text-center pb-8 w-7/8 lg:6/8">
        <h1 className="head1">Features</h1>
        <div className="flex flex-wrap justify-center gap-8 p-4">
          <div className={divClass}>
            <h2 className="head2">Level System</h2>
            <p className="text-left">The Level System of Doggo Bot includes a lot of features and customization options.</p>
            <ul className={ulClass} style={{ listStyleType: "revert"}}>
              <li className={liClass}>Level Reward Roles</li>
              <li className={liClass}>Customizable Level Up Messages</li>
              <li className={liClass}>Multiplier System, global, roles, channels and category</li>
              <li className={liClass}>Customizable XP Gain</li>
            </ul>
          </div>
          <div className={divClass}>
            <h2 className="head2">Logging System</h2>
            <p className="text-left">The Logging System includes keeping track of:</p>
            <ul className={ulClass} style={{ listStyleType: "revert"}}>
              <li className={liClass}>Message edits, deletes and bulk deletes</li>
              <li className={liClass}>Member updates like roles, avatar, nickname, bans, mutes, etc...</li>
              <li className={liClass}>Server Updates like channels, roles, name, permissions, etc...</li>
              <li className={liClass}>Member Joins and Leaves</li>
              <li className={liClass}>Voice updates like voice channel joins, mutes, deafens, leaves, etc...</li>
            </ul>
          </div>
          <div className={divClass}>
            <h2 className="head2">Moderation Commands</h2>
            <p className="text-left">Commands that should be used my moderators of the server only:</p>
            <ul className={ulClass} style={{ listStyle: "revert"}}>
              <li className={liClass}>Mute and unmute members</li>
              <li className={liClass}>Kick and ban members</li>
              <li className={liClass}>Log Moderation Command usages</li>
            </ul>
          </div>
          <div className={divClass}>
            <h2 className="head2">Embed Builder</h2>
          </div>
          <div className={divClass}>
            <h2 className="head2">Chatting System</h2>
          </div>
          <div className={divClass}>
            <h2 className="head2">Fun Commands</h2>
          </div>
        </div>
      </section>
    </article>
  );
}
