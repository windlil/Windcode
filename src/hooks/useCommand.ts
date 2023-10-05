import { toRaw } from 'vue'
import { eventsBus } from '@/utils/emit'

interface Command {
  name: string
  keyboard?: string
  execute?: any
  inStack?: boolean
  init?: any
  before?: any
}

export function useCommand(data: any, setData: any) {
  const state: any = {
    stack: [],
    commands: {},
    commandArray: [],
  }

  function registry(command: Command) {
    state.commandArray.push(command)
    state.commands[command.name] = command.execute && command.execute()
    command.init && command.init()
  }

  registry({
    name: 'back',
    keyboard: 'ctrl+z',
    execute() {
      return {
        back() {
          if (state.stack.length >= 0) {
            setData({ ...data.value, block: state.stack[state.stack.length - 1] ?? [] })
            state.stack.splice(state.stack.length - 1, 1)
          }
        }
      }
    }
  })

  registry({
    name: 'reset',
    keyboard: 'ctrl+r',
    execute() {
      return {
        reset() {
          state.stack = []
          data.value = { ...data.value, block: [] }
        }
      }
    }
  })

  registry({
    name: 'menudrag',
    inStack: true,
    init() {
      let before: any = null
      const start = () => {
        before = structuredClone(toRaw(data.value.block))
      }
      const end = () => {
        state.stack.push(before)
      }
      eventsBus.on('drag:start', start)
      eventsBus.on('drag:end', end)
    },
  })

  registry({
    name: 'import',
    keyboard: 'crtl+d',
    execute() {
      return {
        import() {
          console.log('import')
        }
      }
    }
  })

  registry({
    name: 'export',
    keyboard: 'ctrl+s',
    execute() {
      return {
        export() {
          return data.value
        }
      }
    }
  })
  return {
    state
  }
}
