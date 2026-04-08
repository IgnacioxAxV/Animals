function AnimalResultsMessage({ count, noResultsText, singularText, pluralText }) {
  if (count === 0) {
    return <p>{noResultsText}</p>
  }

  const label = count === 1 ? singularText : pluralText

  return (
    <p>
      {count} {label}
    </p>
  )
}

export default AnimalResultsMessage
