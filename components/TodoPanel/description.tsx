import Input from '../Input'

import styles from './styles.module.scss'

interface DescriptionPanelProps {
  todoSelected: any
  setTodoSelected: (todos: any) => void
}

const DescriptionPanel = ({
  todoSelected,
  setTodoSelected
}: DescriptionPanelProps) => {

  const setDescription = (description: string) => {
    setTodoSelected({
      ...todoSelected,
      description
    })
  }

  return (
    <div className={styles.description}>
      <Input
        name="Description"
        text={todoSelected.description}
        setText={setDescription}
        isTextArea={true}
      />
    </div>
  )
}

export default DescriptionPanel
