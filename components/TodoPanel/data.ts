export interface ColourOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

export const colourOptions: readonly ColourOption[] = [
  { value: 'no_started', label: 'No Started', color: '#9e9e9e' },
  { value: 'todo', label: 'Todo', color: '#1f883d' },
  { value: 'in_progress', label: 'In Progress', color: '#9a6700' },
  { value: 'done', label: 'Done', color: '#8250df' },
]

export function formateDate(date: string) {
  const [year, month, day] = date.split('-')
  return `${day[
    day[0] === '0' ? 1 : 0
  ]}${day[day[0] === '0' ? 2 : 1]} ${[
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'novembre',
    'décembre',
  ][+month - 1
  ]} ${year}`
}
