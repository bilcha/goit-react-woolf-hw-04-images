import styles from './LoadMore.module.css';

export const LoadMore = ({ loadMoreHandler }) => {
  return (
    <button className={styles.button} onClick={loadMoreHandler}>
      Load more
    </button>
  );
};
