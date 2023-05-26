import Input from '../Input'
import chroma from 'chroma-js'

import { ColourOption, colourOptions } from './data'
import Select, { StylesConfig } from 'react-select'

import styles from './styles.module.scss'
import { TodoProps } from '../../types/todo'
import { useState } from 'react'

interface InfoProps {
  todoSelected: any
  setTodoSelected: (todos: any) => void
  setIsPanelOpen: (isPanelOpen: boolean) => void
  todos: TodoProps[]
  setTodos: (todos: TodoProps[]) => void
}

const Info = ({
  todoSelected,
  setTodoSelected,
  setIsPanelOpen,
  todos,
  setTodos
}: InfoProps) => {
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const setDueDate = (due_date: string) => {
    setTodoSelected({
      ...todoSelected,
      due_date
    })
  }

  const deleteTodo = async () => {
    setIsDelete(true)
    const response = await fetch(`/api/todos/deleteTodo?id=${todoSelected.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      setIsDelete(false)
      setIsPanelOpen(false)
      setTodoSelected({})
      setTodos(todos.filter((todo) => todo.id !== todoSelected.id))
    }
  }

  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  })

  const colourStyles: StylesConfig<ColourOption> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', cursor: 'pointer' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color)
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.3).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'pointer',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      }
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  }

  return (
    <div className={styles.containerinfos}>
      <div className={styles.display_infos}>
        <div className={styles.date_infos}>
        <div className={styles.title}>
          <h2>Due Date</h2>
        </div>
        <Input
          name="Due Date"
          text={todoSelected.due_date}
          setText={setDueDate}
          isTitle={true}
          isDate={true}
        />
        </div>
        <div className={styles.status}>
          <div className={styles.title}>
            <h2>Status</h2>
          </div>
          <Select
            className={styles.selects}
            defaultValue={colourOptions.find((obj) => obj.value === todoSelected.status)}
            options={colourOptions}
            styles={colourStyles}
            onChange={(e) => setTodoSelected({
              ...todoSelected,
              status: e?.value
            })}
            isSearchable={false}
          />
        </div>

        <div className={styles.other}>
          <div className={styles.delete} onClick={() =>
            deleteTodo()
          }>
            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 16 16" width="16" height="16" fill="#b35900"><path d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z"></path></svg>
            <h2>{isDelete ? 'Deleting...' : 'Delete this task'}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
