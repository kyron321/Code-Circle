import styles from '../css/loaderButton.module.css'
export default function Loader() {
  return (
    <div className={styles.container}>
        <div className={lds-ring}><div>Hello</div><div></div><div></div><div></div></div>
    </div>
    )
}