import styles from './AnimalFilters.module.css'

/**
 * @param {{
 *  breedValue: string,
 *  typeValue: string,
 *  typeOptions: Array<{ value: string, label: string }>,
 *  onBreedChange: (value: string) => void,
 *  onTypeChange: (value: string) => void,
 *  breedLabel: string,
 *  breedPlaceholder: string,
 *  typeLabel: string
 * }} props
 */
function AnimalFilters({
  breedValue,
  typeValue,
  typeOptions,
  onBreedChange,
  onTypeChange,
  breedLabel,
  breedPlaceholder,
  typeLabel,
}) {
  return (
    <section className={styles.filters} aria-label="Filtros de animales">
      <label className={styles.field}>
        <span>{breedLabel}</span>
        <input
          type="text"
          value={breedValue}
          onChange={(event) => onBreedChange(event.target.value)}
          placeholder={breedPlaceholder}
        />
      </label>

      <label className={styles.field}>
        <span>{typeLabel}</span>
        <select
          value={typeValue}
          onChange={(event) => onTypeChange(event.target.value)}
        >
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </section>
  )
}

export default AnimalFilters
