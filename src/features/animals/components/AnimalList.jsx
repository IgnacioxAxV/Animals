import AnimalCard from './AnimalCard'
import styles from './AnimalList.module.css'

/**
 * @param {{ animals: Array<{ id: number, name: string, breed: string, type: string }> }} props
 */
function AnimalList({ animals }) {
  return (
    <ul className={styles.list}>
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </ul>
  )
}

export default AnimalList
