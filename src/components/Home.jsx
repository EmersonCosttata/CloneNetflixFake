import styles from './Home.module.css'
import avatar from '../assets/avatar.png'
const Home = () => {
  return (
    <div>
        <div className={styles.whoWatch}>
            <h1>Quem está Assistindo?</h1>
            <div className={styles.person}>
                <article>
                    <a href='/browser'>
                    <img src={avatar} alt='Person 1'></img>
                    <h5>Emerson</h5>
                    </a>
                </article>
                <article>
                    <a href='/browser'>
                    <img src={avatar} alt='Person 1'></img>
                    <h5>Hércolis</h5>
                    </a>
                </article>

                <article>
                    <a href='/browser'>
                    <img src={avatar} alt='Person 2'></img>
                    <h5>Felipe</h5>
                    </a>
                </article>

                <article>
                <a href='/browser'>
                    <img src={avatar} alt='Person 3'></img>
                    <h5>Juliane</h5>
                </a>
                </article>
            </div>
            <button>GERENCIAR </button>
        </div>
    </div>
  )
}

export default Home
