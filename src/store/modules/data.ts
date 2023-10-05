import { defineStore } from 'pinia'

export const useDataStore = defineStore('dataStore', {
  state: (): any => ({
    data: null
  }),
  actions: {
    setData(_data: any) {
      this.data = _data
    }
  }
})
