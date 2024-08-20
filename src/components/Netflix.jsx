import styles from './Netflix.module.css'
import netflix from '../assets/logo.png'
import nseries from '../assets/nseries.svg'
import video from '../assets/destaque.mp4'
import MediaGalery from './sections/MediaGalery'
import avatar from '../assets/avatar.png'
import Search from './sections/Search'

import { IoIosSearch } from "react-icons/io";
import { MdNotificationsNone } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { BsVolumeMute } from "react-icons/bs";
import { GoUnmute } from "react-icons/go";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

import {NavLink} from 'react-router-dom'
import { useAuth } from '../components/contetx/AuthContext';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'


const Netflix = () => {
    const [series, setSeries] = useState();
    const [series2, setSeries2] = useState();
    const [movies, setMovies] = useState();
    const [movies2, setMovies2] = useState();
    const [allmovies, setAllMovies] = useState();
    const [allseries, setAllSeries] = useState();
    const { logout } = useAuth();

    const [showAll, setShowAll] = useState(false);
    const [querysearch, setQuerySearch] = useState();
    const [stateSearch, setStateSearch] = useState(false);
    const [swithContent, setSwithContent] = useState(true);
    const [muted, setMute] = useState(false);


    const [screen, setScreen] = useState({ width: 0, height: 0 });
    useEffect(() => {setScreen({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }, [window.innerWidth]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = muted;
        }
    }, [muted]);

    const clearSearch = ()=>{
        setSwithContent(true)
        setQuerySearch(null)
        if(querysearch=='')
            clearSearch
    }
    if(querysearch=='')
        clearSearch();

    const handleSearch = (e)=>{
        setQuerySearch(e.target.value)
        setSwithContent(false)
    }

    const openSearch = ()=>{
            if(stateSearch==false)
                setStateSearch(true)
            else
            setStateSearch(false)
    }

    const videoRef = useRef(null);
    useEffect(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, []);


      useEffect(() => {
      const All = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=66454b59bba5c852cc6095ba5746725e&language=pt-BR&`)
            setAllMovies(response.data.results)
        } catch (error) {
            alert(error)
            return
        }
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=66454b59bba5c852cc6095ba5746725e&language=pt-BR`)
            setAllSeries(response.data.results)
        } catch (error) {
            alert(error)
            return
        }
    }
    All();
    }, []);

    useEffect(() => {
        const search = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=66454b59bba5c852cc6095ba5746725e&language=pt-BR&page=1`)
                setSeries(response.data.results)
            } catch (error) {
                alert(error)
                return
            }
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=66454b59bba5c852cc6095ba5746725e&language=pt-BR&page=2`)
                setMovies2(response.data.results)
            } catch (error) {
                alert(error)
                return
            }
        }

            const movies = async () => {
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=66454b59bba5c852cc6095ba5746725e&language=pt-BR&page=1`)
                    setMovies(response.data.results)
                } catch (error) {
                    alert(error)
                    return
                }
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=66454b59bba5c852cc6095ba5746725e&language=pt-BR&page=1`)
                    setSeries2(response.data.results)
                } catch (error) {
                    alert(error)
                    return
                }
        }
        search();
        movies();
    }, []);
  return (
    <div >
    <header>
        <nav >
        { screen.width > 700 ? ( <><div className={styles.navNetflix}>
            <a href='/browser'><img src={netflix} className={styles.netflix}></img></a>
                <NavLink to='/browser' onClick={()=>setShowAll(false)}>Inicio</NavLink>
                <NavLink to='#' onClick={()=>setShowAll(!showAll)}>Series</NavLink>
                <NavLink to='#' onClick={()=>setShowAll(!showAll)}>Filmes</NavLink>
                <NavLink to='#'>Bombando</NavLink>
                <NavLink to='#'>Minha Lista</NavLink>
                <NavLink to='https://github.com/EmersonCosttata'>By Emerson Costa</NavLink>
           </div>
            <div className={styles.subnav}>
                <NavLink to='#'><IoIosSearch size={25} onClick={openSearch}/></NavLink>
                    {stateSearch && <a onMouseLeave={openSearch}><input type='text' placeholder='Fimes, Series e mais' 
                    onChange={handleSearch} value={querysearch}></input> <a onClick={clearSearch}><GiCancel  size={16}/></a></a>}
                <NavLink to='#'><MdNotificationsNone  size={25} /></NavLink>
                <NavLink to='#' onClick={()=>logout()}><img src={avatar}/></NavLink>
            </div> </> 
                 ) : (
            <>
            <a href='/browser'><img src={netflix} className={styles.netflix}></img></a>
            <div className={styles.subnavResponsive}>
                <NavLink to='#'><IoIosSearch size={25} onClick={openSearch}/></NavLink>
                    {stateSearch && <a onMouseLeave={openSearch}><input type='text' placeholder='Fimes, Series e mais' 
                    onChange={handleSearch} value={querysearch}></input> <a onClick={clearSearch}><GiCancel  size={16}/></a></a>}
                <NavLink to='#'><MdNotificationsNone  size={25} /></NavLink>
                <NavLink to='#' onClick={()=>logout()}><img src={avatar}/></NavLink>
            </div>
                <div className={styles.navNetflixResponsive}>
                    <NavLink to='#' onClick={()=>setShowAll(false)}>Inicio</NavLink>
                    <NavLink to='#' onClick={()=>setShowAll(true)}>Series</NavLink>
                    <NavLink to='#' onClick={()=>setShowAll(true)}>Filmes</NavLink>
                    <NavLink to='https://github.com/EmersonCosttata'>By Emerson Costa</NavLink>
            </div>
           </>)}
        </nav>
    </header>
{swithContent && <div className='TodoApp'>
    <div className={styles.destaque}>
        {screen.width > 600 ? (
            <video
                width={screen.width} height={screen.height + screen.height * 0.081} 
                autoPlay ref={videoRef}>
                <source src={video} type="video/mp4" />
            </video>
        ) : (
        <img src="https://image.tmdb.org/t/p/original/xq4v7JE8niZ75OYYPDGNn6Gzpyt.jpg" className={styles.destaqueRsposivo} alt="fallback image" />
        )}
    </div>
        <article className={styles.destaqueinfo}>
            <img src={nseries} className={styles.nseries}></img>
            <img src=' https://image.tmdb.org/t/p/original/iELasLmGIX5JyjqrmL19ZoG8ITG.png' className={styles.titleimg}></img>
                <div className={styles.destaquebtns}>
                    <button className={styles.destaquebtnsWatch}>Assistir</button>    
                    <button className={styles.destaquebtnsMoreInfo}>+ Informações</button>
                    {screen.width > 700 ? (<>{muted && (<a href='#' className={styles.muted} 
                    onClick={() => setMute(!muted)}><BsVolumeMute size={38} /></a>
                    )}{!muted && (
                    <a href='#' className={styles.muted} 
                    onClick={() => setMute(!muted)}><GoUnmute size={38} /></a>
                    )}
                    </>
                 ) : (
                    <></>
            )}

                
                </div>
        </article>
        
        <div className={styles.content}>
            {!showAll ? (
            <>
            {series && <MediaGalery title='Series Epicas' medias={series} />}
            {movies && <MediaGalery title='Filmes Epicos' medias={movies} />}
            {series2 && <MediaGalery title='Series Romanticas' medias={series2} />}
            {movies2 && <MediaGalery title='Originais Netflix' medias={movies2} />}
            </>
            ) : (
            <>
                <MediaGalery title='Series' medias={allseries.slice(0,9)} />
                <MediaGalery title='' medias={allseries.slice(10,19)} />
                <MediaGalery title='Filmes' medias={allmovies.slice(0,9)} />
                <MediaGalery title='' medias={allmovies.slice(10,19)} />
            </>
            )}

        </div>
</div>}
{!swithContent && 
    <div> 
        <Search query={querysearch} /> 
    </div>} 
    <footer>
            <div><FaFacebookF size={25} /><IoLogoInstagram size={25} /> <FaXTwitter size={25} /><FaYoutube size={25} /></div>
           <div> 
            <a href=''>Audiodestrição</a> <a href=''>Central de Ajuda</a> <a href=''>Cartão pré-pago</a> <a href=''>Imprensa</a>
            </div>
            <div> 
            <a href=''>Clone</a> <a href=''>by</a> <a href='https://github.com/EmersonCosttata'>Emerson </a> <a href='https://github.com/EmersonCosttata'>Costa</a>
            </div>
            <div> 
            <a href=''>Curso +prati</a> <a href=''>DevFullstack</a> <a href=''>Obrigado Jaques</a> <a href=''>Tamo Junto</a>
            </div>
            <button>Codigo de Serviço</button>
            <p>2024-2028 FakeNetflixApp</p>
        </footer>           
    </div>
  )
}

export default Netflix
