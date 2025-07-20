"use client"
import Script from "next/script";

export default function AdBanner() {
  return (
    <>
      {/* Adsense script, only loads after Cookiebot permission */}
      <Script
        id="adsense-init"
        type="text/plain"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6167645965076639"
        async 
        crossOrigin="anonymous"
      />

      {/* Ad slot container */}
      <div className="w-full flex justify-center py-4">
        <ins
          className="adsbygoogle"
          style={{display: "inline-block", width: "728px", height: "90px"}}
          data-ad-client="ca-pub-6167645965076639"
          data-ad-slot="9354971564"
        ></ins>
      </div>

      {/* Trigger adsbygoogle render */}
      <Script id="adsense-load" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  )
}