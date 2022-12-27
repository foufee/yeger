import { jsonToModel, yamlToJson } from '~~/util/yamlToModel'

const modelInput = `domain: [1, 2, 3]

constants:
  a: 1
  b: 2

functions:
  f:
    - 1,1
    - 2,1
    - 3,2

relations:
  R: [3]
  W:
    - 1,1
    - 2,3
`

export function useDemoData() {
  return {
    modelInput,
    createDemoModel: () => yamlToJson(modelInput).andThen(jsonToModel).get(),
  }
}
