import styles from './Searchbar.module.css';
export const Searchbar = ({ searchQueryHandler }) => {
  const onSubmitHandler = e => {
    e.preventDefault();
    const inputVal = e.target.elements['searchInput'].value.trim();
    searchQueryHandler(inputVal);
  };
  return (
    <header className={styles.searchBar}>
      <form className={styles.searchForm} onSubmit={onSubmitHandler}>
        <button type="submit" className={styles.button}>
          <span className={styles.buttonLabel}>Search </span>
        </button>

        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchInput"
        />
      </form>
    </header>
  );
};
