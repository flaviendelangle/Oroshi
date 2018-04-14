export default {
  defaultOrder: {
    grid: {
      field: 'title',
      direction: 'asc',
    },
    stream: {
      field: 'directors',
      direction: 'desc',
    },
  },
  content: {
    stream: [
      { label: 'Group by directors', arguments: ['directors'] },
      { label: 'Group by genres', arguments: ['genres'] },
      { label: 'Group by year of release', arguments: ['release_year'] },
    ],
    grid: [
      { label: 'Order by title', arguments: ['title', 'asc'] },
      { label: 'Order by note', arguments: ['note', 'desc'] },
      { label: 'Order by release date', arguments: ['release', 'desc'] },
    ],
  },
}
