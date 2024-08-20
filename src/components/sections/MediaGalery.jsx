import styles from './MediaGalery.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Modal from './Modal';
import { useState } from 'react';
import {NavLink} from 'react-router-dom'
import { FaPlay } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { PiHighDefinition } from "react-icons/pi"
const MediaGalery = ({ title, medias }) => {
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
              slidesToShow: 4.5,
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
              slidesToShow: 2.3,
              slidesToScroll: 2
            }
          }
        ]
      };

    const [showModal, setShowModal] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);

    const toggleModal = (media) => {
      setSelectedMedia(media)
      console.log(media)
       if(!media)
        setSelectedMedia(null)
        setShowModal(!showModal)
    };
    return (
      <div className={styles.media}>
        <h1>{title}</h1>
        <Slider {...settings} className={styles.medias}>
          {medias.map((media, index) => ( 
            <div key={index}>
              <NavLink to='' onClickCapture={() => toggleModal(media)}>
                <img 
                  src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}`} 
                  alt={`Media ${index}`} 
                  className={styles.cover} 
                />
              </NavLink>
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

export default MediaGalery;
