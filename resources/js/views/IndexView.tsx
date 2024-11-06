import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { useQuery } from 'react-query';
import { getPostsByPosted } from '../services/PostService';
import CardPostVerticalComponent from '../components/CardPostVerticalComponent';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Post } from '../types/post.type';


export default function IndexView() {
    const [lastestPosts, setLastestPosts] = useState<Post[]>([])

    const videoUrl = 'https://youtu.be/AAcaC2QAFVI?si=ADb5HGsdD6lw0qAo';
    const { data, isLoading } = useQuery({
        queryKey: ['blog'],
        queryFn: getPostsByPosted
    });

    useEffect(() => {
        if (data) {
            const lastFourPosts = data.slice(0, 4)
            setLastestPosts(lastFourPosts)
        }
    }, [data])

    return (
        <>
            <div className="flex relative items-center text-center max-h-[550px]">
                <img
                    className="object-cover w-full max-h-[550px]"
                    src="../images/bg-home-2.jpg"
                    alt="img"
                />
                <div className="w-full absolute text-center">
                    <h2 className="text-6xl font-bold text-white text-center">
                        <span className="font-black text-indigo-500">DJNTS</span> Radio & Blog
                    </h2>
                </div>
            </div>
            <main>
                <section className="container m-auto py-16">
                    <h2 className="text-4xl font-bold italic text-indigo-600">About</h2>
                    <p className="text-justify indent-4 mt-5">
                        DJNTS <span className="italic">"abreviatura de Deejaynatos"</span> nacio una noche mientras producia mi primer tema soñando en tener mi label como los
                        grandes dj/productores tales como DeadMau5, Skrillex y Armin Van Buuren que fueron mi inspiracion desde joven en la musica. Actualmente los que
                        me dieron el salto a meterme en la produccion y el dj son Yotto, Miss Monique. Los cuales me hicieron encontrar
                        ese genero que me enamoraria, el Melodic Techno.
                    </p>
                    <p className="text-justify indent-4">
                        Yo soy KØURAS <span className="italic">"una mezcla de mi nombre y apellido"</span> y sueño un dia que este hobby que amo tanto llegue a ser parte de mi profesion,
                        compartir con las personas esos mensajes que se transmiten en la musica.
                    </p>
                </section>
                <section className="bg-neutral-800 py-16">
                    <div className="container m-auto">
                        <h2 className="text-4xl font-bold italic text-white">Lastest Posts</h2>
                        {isLoading
                            ? <div>Loading...</div>
                            : lastestPosts && (
                                (
                                    <div className="grid grid-cols-4 gap-5 mt-5">
                                        {lastestPosts.map(post => (
                                            <CardPostVerticalComponent post={post} />
                                        ))}
                                    </div>
                                )
                            )
                        }
                        <div className='flex justify-center w-full mt-16'>
                            <Link
                                to={'/blog'}
                                className='bg-indigo-600 hover:bg-indigo-700 text-white font-black py-2 px-3 transition-colors'
                            >All Posts</Link>
                        </div>
                    </div>
                </section>
                <section className="container m-auto py-16">
                    <h2 className="text-4xl font-bold italic text-indigo-600">Last Episode DJNTS Radio</h2>
                    <div className='w-full mt-5'>
                        <ReactPlayer
                            url={videoUrl}
                            playing={false}
                            width={''}
                        />
                    </div>
                    <div className='flex justify-center w-full mt-16'>
                        <Link
                            to={'/radio'}
                            className='bg-indigo-600 hover:bg-indigo-700 text-white font-black py-2 px-3 transition-colors'
                        >All Episodes</Link>
                    </div>
                </section>
                <section className='py-16 bg-indigo-700'>
                    <div className='container flex m-auto text-white justify-between items-center'>
                        <div>
                            <h3 className='text-4xl font-bold italic'>Subscribe to newsletter</h3>
                            <p>
                                Get updates and other wonderful information.
                            </p>
                        </div>
                        <div className='flex h-14'>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder='Your email'
                                className='w-72 text-2xl font-light text-black outline-none	px-2'
                            />
                            <button type="button" className='bg-neutral-800 w-14 border border-neutral-800 hover:bg-neutral-700 flex items-center justify-center'><ArrowRightIcon className='size-7' /> </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}