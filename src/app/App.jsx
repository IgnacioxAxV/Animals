import { useMemo, useState } from 'react'
import styles from './App.module.css'
import { APP_TEXTS } from './app.constants'
import AnimalFilters from '../features/animals/components/AnimalFilters'
import AnimalList from '../features/animals/components/AnimalList'
import AnimalResultsMessage from '../features/animals/components/AnimalResultsMessage'
import { ANIMAL_TYPE_OPTIONS, ANIMAL_TYPES } from '../features/animals/constants/animals.constants'
import { ANIMALS_MOCK } from '../features/animals/mocks/animals.mock'

function App() {
  const [breedFilter, setBreedFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState(ANIMAL_TYPES.all)

  const filteredAnimals = useMemo(() => {
    const breedFilterValue = breedFilter.trim().toLowerCase()

    return ANIMALS_MOCK.filter((animal) => {
      const matchesBreed = animal.breed.toLowerCase().includes(breedFilterValue)
      const matchesType =
        typeFilter === ANIMAL_TYPES.all || animal.type === typeFilter

      return matchesBreed && matchesType
    })
  }, [breedFilter, typeFilter])

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{APP_TEXTS.title}</h1>

      <AnimalFilters
        breedValue={breedFilter}
        typeValue={typeFilter}
        typeOptions={ANIMAL_TYPE_OPTIONS}
        onBreedChange={setBreedFilter}
        onTypeChange={setTypeFilter}
        breedLabel={APP_TEXTS.breedLabel}
        breedPlaceholder={APP_TEXTS.breedPlaceholder}
        typeLabel={APP_TEXTS.typeLabel}
      />

      <AnimalResultsMessage
        count={filteredAnimals.length}
        noResultsText={APP_TEXTS.noResults}
        singularText={APP_TEXTS.resultsSingular}
        pluralText={APP_TEXTS.resultsPlural}
      />

      {filteredAnimals.length > 0 && <AnimalList animals={filteredAnimals} />}
    </main>
  )
}

export default App
