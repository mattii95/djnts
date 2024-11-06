

export default function RadioView() {
    return (
        <>
            <div className="flex relative items-center text-center max-h-[550px]">
                <img
                    className="object-cover w-full max-h-[550px]"
                    src="../images/bg-radio.jpg"
                    alt="img"
                />
                <div className="w-full absolute text-center">
                    <h2 className="text-6xl font-bold text-white text-center">
                        <span className="font-black text-white">RADIO</span>
                    </h2>
                </div>
            </div>

            <main className='py-16 container m-auto '>
                <h2 className='text-center text-3xl'>All episodes DJNTS Radio</h2>
                <section className='grid grid-cols-4 gap-4 mt-5'>
                    <div className='bg-white h-96'></div>
                </section>
            </main>

        </>
    )
}
