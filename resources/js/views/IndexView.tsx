

export default function IndexView() {
    return (
        <div>
            <div className="flex relative items-center text-center max-h-[550px]">
                <img
                    className="object-cover w-full max-h-[550px]"
                    src="../images/bg-home-2.jpg"
                    alt="img"
                />
                <div className="w-full absolute text-center">
                    <h2 className="text-4xl font-bold text-white text-center">
                        <span className="font-black text-indigo-500">DJNTS</span> Radio & Blog
                    </h2>
                </div>
            </div>
        </div>
    )
}