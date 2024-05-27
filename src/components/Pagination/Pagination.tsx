import styles from './Pagination.module.scss';

interface Props {
  page: number;
  pageSize: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>
}
export function Pagination({ page, pageSize, totalPages, setPage }: Props) {
  const numberOfPages = Math.ceil(totalPages / pageSize);
  const setPrevPage = (page: number) => {
    if (page < 1) {
      return;
    }

    setPage(page);
  }

  const setNextPage = (page: number) => {
    if (page > numberOfPages) {
      return;
    }
    setPage(page);
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.changePage} onClick={() => setPage(1)}>First</div>
      <div className={styles.changePage} onClick={() =>  setPrevPage(page - 1)}>Prev</div>
      <div>Page {page} of {numberOfPages}</div>
      <div className={styles.changePage} onClick={() => setNextPage(page + 1)}>Next</div>
      <div className={styles.changePage} onClick={() => setPage(numberOfPages)}>Last</div>
    </div>
  )
}