export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function shuffleQuestion<T extends { options: any[]; correctOption?: number; correctIndex?: number }>(q: T): T {
  const oldIndex = q.correctOption !== undefined ? q.correctOption : (q.correctIndex !== undefined ? q.correctIndex : 0);
  const correctValue = q.options[oldIndex];
  const shuffledOptions = shuffleArray(q.options);
  const newIndex = shuffledOptions.indexOf(correctValue);

  return {
    ...q,
    options: shuffledOptions,
    ...(q.correctOption !== undefined ? { correctOption: newIndex } : {}),
    ...(q.correctIndex !== undefined ? { correctIndex: newIndex } : {}),
  };
}
