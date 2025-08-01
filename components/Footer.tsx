import Link from "next/link";

export default function Footer() {
  return(
    <footer id="footer" className="flex flex-col h-30 bg-gray-900 border-gray-600/75 border-t-1 text-white py-8 text-center w-full items-center mx-auto z-50">
      <div className="flex gap-4 text-sm mb-2">
        <Link 
          href="/terms-of-service"  
          className="text-gray-400 hover:text-white hover:text-[0.9rem] transition-all ease-in-out duration-300"
        >
          Terms of Service
        </Link>
        <span>|</span>
        <Link 
          href="/privacy-policy"
          className="text-gray-400 hover:text-white hover:text-[0.9rem] transition-all ease-in-out duration-300"
        >
          Privacy Policy
        </Link>
      </div>
      <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Arcky-Tech. All right reserved.</p>
    </footer>
  )
}