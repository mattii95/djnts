import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function FooterComponent() {
    return (
        <footer className="flex flex-col items-center bg-neutral-800 text-white">
            <div className="flex items-center h-72 justify-between container py-3">
                <div className="text-6xl font-black">
                    <a href={'/'}>
                        <img src="./images/logo-white.png" className='h-16 w-full' alt="" />
                    </a>
                    <p className="text-xl text-center font-normal italic">La música nos une...</p>
                </div>
                <div className="flex gap-6 items-center">
                    <a
                        href="https://www.instagram.com/kourasmusic/"
                        target="_blank"
                        className="hover:text-indigo-600 transition-colors"
                    >
                        <FaInstagram className="size-7" />
                    </a>
                    <a
                        href="https://www.instagram.com/kourasmusic/"
                        target="_blank"
                        className="hover:text-indigo-600 transition-colors"
                    >
                        <FaFacebook className="size-7" />
                    </a>
                    <a
                        href="https://www.instagram.com/kourasmusic/"
                        target="_blank"
                        className="hover:text-indigo-600 transition-colors"
                    >
                        <BsTwitterX className="size-6" />
                    </a>
                    <a
                        href="https://www.instagram.com/kourasmusic/"
                        target="_blank"
                        className="hover:text-indigo-600 transition-colors"
                    >
                        <FaYoutube className="size-9" />
                    </a>

                </div>
            </div>
            <div className="w-full text-center bg-neutral-900 py-3">
                Todos los derechos reservados {new Date().getFullYear()}. <span className="font-bold">{import.meta.env.VITE_APP_NAME}</span>
            </div>
        </footer>
    )
}
