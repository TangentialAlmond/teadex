/**
 * Facade Components: Routes to either the Editor or Viewer.
 * This keeps the EntryForm logic clean and separates concerns.
 */

import NumericFieldEditor from "./NumericFieldEditor"
import NumericFieldViewer  from "../../../../shared/components/NumericFieldViewer"
import TextFieldEditor from "./TextFieldEditor"
import TextFieldViewer from "../../../../shared/components/TextFieldViewer"
import SelectEditor from "./SelectEditor"
import SelectViewer from "../../../../shared/components/SelectViewer"
import ProductionStepsEditor from "./ProductionStepsEditor"
import ProductionStepsViewer from "../../../../shared/components/ProductionStepsViewer"

// Numeric fields
export const NumericFieldRenderer = (props) => {
  const { isEditing } = props
  return isEditing ? (
    <NumericFieldEditor {...props} />
  ) : (
    <NumericFieldViewer {...props} />
  )
}

// Text fields
export const TextFieldRenderer = (props) => {
  const { isEditing } = props
  return isEditing ? (
    <TextFieldEditor {...props} />
  ) : (
    <TextFieldViewer {...props} />
  )
}

// Select i.e. dropdown fields
export const SelectRenderer = (props) => {
  const { isEditing } = props
  return isEditing ? (
    <SelectEditor {...props} />
  ) : (
    <SelectViewer {...props} />
  )
}

// Production steps renderer
export const ProductionStepsRenderer = (props) => {
  const { isEditing } = props
  return isEditing ? (
    <ProductionStepsEditor {...props} />
  ) : (
    <ProductionStepsViewer {...props} />
  )
}