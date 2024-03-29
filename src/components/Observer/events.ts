enum ModelEvents {
  STATE_CHANGED = 'STATE_CHANGED',
  VALUE_CHANGED = 'VALUE_CHANGED',
}

enum ViewEvents {
  VALUE_CHANGED = 'VALUE_CHANGED',
  VALUE_FROM_CHANGED = 'VALUE_FROM_CHANGED',
  VALUE_TO_CHANGED = 'VALUE_TO_CHANGED',
  VALUE_INCREMENT = 'VALUE_INCREMENT',
  VALUE_DECREMENT = 'VALUE_DECREMENT',
  VALUE_CHANGED_FROM_LABELS = 'VALUE_CHANGED_FROM_LABELS',
}

enum ThumbEvents {
  THUMB_VALUE_INCREMENT = 'THUMB_VALUE_INCREMENT',
  THUMB_VALUE_DECREMENT = 'THUMB_VALUE_DECREMENT',
  THUMB_VALUE_FROM_CHANGED = 'THUMB_VALUE_FROM_CHANGED',
  THUMB_VALUE_TO_CHANGED = 'THUMB_VALUE_TO_CHANGED',
}

enum LabelsEvents {
  LABEL_VALUE_CHANGED = 'LABEL_VALUE_CHANGED',
}

enum ScaleEvents {
  SCALE_VALUE_CHANGED = 'SCALE_VALUE_CHANGED',
}

export { ModelEvents, ViewEvents, ThumbEvents, LabelsEvents, ScaleEvents };
