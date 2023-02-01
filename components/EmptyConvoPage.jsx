import styles from '../css/conversations.module.css';
import { BiSad } from 'react-icons/bi';

export default function EmptyConvoPage() {
  return (
    <div className={styles.emptyConvoContainer}>
      <h1 className={styles.heading}>Conversations</h1>
      <h2>
        <em>No conversations yet</em>
      </h2>
      <BiSad size={30} />
    </div>
  );
}
