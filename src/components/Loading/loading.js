import styles from './loading.css'
import loading from '../../assets/loading.svg'

function Loading(){
    return(
        
        <div className={styles.loading_container}>
            <img src={loading} alt="loading" className={styles.loader}></img>
        </div>
        
        
        
        )
}

export default Loading