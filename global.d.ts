import { createPinia, setMapStoreSuffix } from 'pinia'

setMapStoreSuffix('') // completely remove the suffix
export const pinia = createPinia()

declare module 'pinia' {
  export interface MapStoresCustomization {
    // set it to the same value as above
    suffix: 'pinia'
  }
}

declare module 'vue-csv-import' {
  import { VueCsvImport } from 'vue-csv-import'
  export { VueCsvImport }
}

declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}