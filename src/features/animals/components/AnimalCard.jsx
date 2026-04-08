import styles from './AnimalCard.module.css'

/**
 * @param {{
 *  animal: { id: number, name: string, breed: string, type: string }
 * }} props
 */
function AnimalCard({ animal }) {
  return (
    <li className={styles.card}>
      <h3 className={styles.name}>{animal.name}</h3>
      <p>
        <strong>Raza:</strong> {animal.breed}
      </p>
      <p>
        <strong>Tipo:</strong> {animal.type}
      </p>
    </li>
  )
}

export default AnimalCard
