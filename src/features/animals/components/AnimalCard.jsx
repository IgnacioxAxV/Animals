import { useEffect, useState } from 'react'
import styles from './AnimalCard.module.css'
import { FALLBACK_IMAGE_URL, getAnimalImage } from '../../../services/pexelsService'

const IMAGE_LOADING_TEXT = 'Cargando imagen...'

/**
 * @param {{
 *  animal: { id: number, name: string, breed: string, type: string }
 * }} props
 */
function AnimalCard({ animal }) {
  const [imageState, setImageState] = useState(() => ({
    name: '',
    url: FALLBACK_IMAGE_URL,
  }))

  const isImageLoading = imageState.name !== animal.name
  const imageUrl = imageState.name === animal.name ? imageState.url : FALLBACK_IMAGE_URL

  useEffect(() => {
    let isMounted = true

    getAnimalImage(animal.name)
      .then((url) => {
        if (isMounted) {
          setImageState({
            name: animal.name,
            url,
          })
        }
      })

    return () => {
      isMounted = false
    }
  }, [animal.name])

  return (
    <li className={styles.card}>
      <div className={styles.imageContainer}>
        {isImageLoading && <span className={styles.loading}>{IMAGE_LOADING_TEXT}</span>}
        <img
          className={styles.image}
          src={imageUrl}
          alt={animal.name}
          loading="lazy"
          onError={(event) => {
            if (event.currentTarget.src !== FALLBACK_IMAGE_URL) {
              event.currentTarget.src = FALLBACK_IMAGE_URL
            }
          }}
        />
      </div>
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
