import ColorButton from "@/components/ColorButton";
import InfoCards from "@/components/InfoCards";

const INVITE_BASE = "https://discord.com/oauth2/authorize";
const CLIENT_ID = "1270100901067100230";
const REDIRECT_URI = encodeURIComponent("https://www.arcky-tech.be/api/auth/server");
const PERMISSIONS = "10191898143990";

export default function DoggoBot() {

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
      <InfoCards title="Features" page="doggo-bot"/>
    </article>
  );
}
