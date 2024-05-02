import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const inputValue = form.elements.movieName.value.trim();

    if (inputValue === '') return;

    onSubmit(inputValue);

    form.reset();
  };

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="movieName"
        placeholder="Search movie..."
        className={css.searchFormInput}
      />
      <button type="submit" className={css.searchBtn}>
        Search
      </button>
    </form>
  );
}
