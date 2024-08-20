import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import Slider from 'react-slick';
import styles from './MediaGalery.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from './Modal';
import { FaPlay } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { PiHighDefinition } from "react-icons/pi"

const Search = ({ query }) => {
  const settings = {
    slidesToShow: 6.5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5.7,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        }
      }
    ]
  };

  const [series, setSeries] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series2, setSeries2] = useState([]);
  const [movies2, setMovies2] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const toggleModal = (media) => {
    setSelectedMedia(media)
     if(!media)
      setSelectedMedia(null)
      setShowModal(!showModal)
  };

  useEffect(() => {
    const searchSeries = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=66454b59bba5c852cc6095ba5746725e&language=pt-BR&query=${query}&page=1`);
        setSeries(response.data.results);
      } catch (error) {
        alert(error);
      }

      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=66454b59bba5c852cc6095ba5746725e&language=pt-BR&query=${query}&page=2`);
        setSeries2(response.data.results);
      } catch (error) {
        alert(error);
      }
    };

    const searchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=66454b59bba5c852cc6095ba5746725e&language=pt-BR&query=${query}&page=1`);
        setMovies(response.data.results);
      } catch (error) {
        alert(error);
      }
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=66454b59bba5c852cc6095ba5746725e&language=pt-BR&query=${query}&page=2`);
        setMovies2(response.data.results);
      } catch (error) {
        alert(error);
      }
    };
      searchSeries();
      searchMovies();
  }, [query]);

  return (
    <div className={styles.mediassearch}>
        <h1>Resultados de Pesquisa de {query}</h1>

     <Slider {...settings} className={styles.medias}>
        {movies.map((media) => (
          <div key={media.id}>
       <NavLink to='' onClick={() => toggleModal(media)}>
              <img src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}`} alt={`Media ${media.name}`} className={styles.cover} />
            </NavLink>
          </div>
        ))}
      </Slider>
        <br/>
      <Slider {...settings} className={styles.medias}>
        {series.map((media) => (
          <div key={media.id}>
      <a href='#' onClick={() => toggleModal(media)}>
              <img src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}`} alt={`Media ${media.name}`} className={styles.cover} />
            </a>
          </div>
        ))}
      </Slider>
      <br/>
      <Slider {...settings} className={styles.medias}>
        {series2.map((media) => (
          <div key={media.id}>
       <NavLink to='' onClick={() => toggleModal(media)}>
              <img src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}`} alt={`Media ${media.name}`} className={styles.cover} />
            </NavLink >
          </div>
        ))}
      </Slider>
      <br/>
      <Slider {...settings} className={styles.medias}>
        {movies2.map((media) => (
          <div key={media.id}>
              <NavLink to='' onClick={() => toggleModal(media)}>
              <img src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}`} alt={`Media ${media.name}`} className={styles.cover} />
            </NavLink >
          </div>
        ))}
      </Slider>

      <Modal show={showModal} onClose={toggleModal}>
        {selectedMedia && 
            <div className={styles.detalhesmedia}>
             <img 
                  src={`https://image.tmdb.org/t/p/original${selectedMedia.backdrop_path}`} 
                  alt={selectedMedia.title || selectedMedia.name} />
                  <div className={styles.modalbtns}>
                     <button><FaPlay size={20} />Assistir</button> 
                     <a href='#'>+</a><a  a href='#'><BiLike size={22}/></a>
                  </div>
                  <div className={styles.modalinfos}>
                    <section>
                      <h1>{selectedMedia.title && selectedMedia.title}</h1>
                      <p><strong>Relevancia {selectedMedia.vote_average && (selectedMedia.vote_average).toFixed(1)}  </strong> 
                      {selectedMedia.release_date && (selectedMedia.release_date).slice(0,4)} 1h 49min <PiHighDefinition size={30}/></p>
                      <p>{selectedMedia.adult ? '18+' : '16+'}</p>
                      <p>{selectedMedia.overview && selectedMedia.overview}</p>
                    </section>
                  </div>
            </div>
        }
    </Modal>
    </div>
  );
}

export default Search;
