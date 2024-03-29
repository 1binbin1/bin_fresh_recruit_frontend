type IFormType = 'input' | 'password' | 'select' | 'dataPicker' | 'textarea'

export interface IOptionsType {
  label: string
  value: string
}

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: string
  options?: IOptionsType[]
  others?: any
  isHidden?: boolean
}

export interface IFormConfig {
  formItems: IFormItem[]
  labelWidth?: string
  styleLayout?: any
  itemLayout?: any
  title?: string
  labelSize?: string
}
